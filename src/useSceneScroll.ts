import { useEffect } from "react";
// Native scrolling; one paint per scroll event, only for visible project scenes.
export function useSceneScroll(enabled: boolean) {
  useEffect(() => {
    const scenes = [
      ...document.querySelectorAll<HTMLElement>(".project-visual"),
    ];
    if (!enabled) {
      scenes.forEach((el) => el.style.removeProperty("--scene-y"));
      return;
    }
    const visible = new Set<HTMLElement>();
    let frame = 0;
    const paint = () => {
      frame = 0;
      visible.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const offset =
          ((rect.top + rect.height / 2) / innerHeight - 0.5) *
          (innerWidth < 768 ? 16 : 40);
        el.style.setProperty(
          "--scene-y",
          `${Math.max(-25, Math.min(25, offset))}px`,
        );
      });
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) visible.add(e.target as HTMLElement);
        else visible.delete(e.target as HTMLElement);
      });
      schedule();
    });
    scenes.forEach((s) => observer.observe(s));
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      scenes.forEach((el) => el.style.removeProperty("--scene-y"));
    };
  }, [enabled]);
}
