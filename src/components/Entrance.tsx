import { useEffect, useRef, useState } from "react";

export default function Entrance({
  onComplete,
  onReveal,
}: {
  onComplete: () => void;
  onReveal: () => void;
}) {
  const [act, setAct] = useState(0);
  const close = useRef(onComplete);
  close.current = onComplete;
  const reveal = useRef(onReveal);
  reveal.current = onReveal;
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const timers = [
      setTimeout(() => setAct(1), 850),
      setTimeout(() => setAct(2), 1900),
      setTimeout(() => {
        setAct(3);
        reveal.current();
      }, 3200),
      setTimeout(() => close.current(), 4300),
    ];
    const escape = (e: KeyboardEvent) => {
      if (e.key === "Escape") close.current();
    };
    window.addEventListener("keydown", escape);
    return () => {
      timers.forEach(clearTimeout);
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", escape);
    };
  }, []);
  return (
    <div
      className={`entrance act-${act}`}
      role="dialog"
      aria-modal="true"
      aria-label="Welcome to my universe"
    >
      <div className="entrance-shutter shutter-left" />
      <div className="entrance-shutter shutter-right" />
      <div className="entrance-meta">
        <span>SHIVANSH THAKRAL.</span>
        <span>A PERSONAL INTRODUCTION</span>
      </div>
      <div className="entrance-grid" aria-hidden="true" />
      <div className="entrance-film" aria-hidden="true">
        <img src="/photos/suit-intro.webp" alt="" />
        <img src="/photos/adventure-intro.webp" alt="" />
        <img src="/photos/off-duty-intro.webp" alt="" />
        <img src="/photos/yellow-shirt-intro.webp" alt="" />
      </div>
      <div className="entrance-copy" aria-hidden="true">
        <span className="welcome-word">WELCOME</span>
        <span className="to-word">to my</span>
        <span className="universe-word">UNIVERSE.</span>
      </div>
      <img
        className="entrance-character"
        src="/images/shivansh-character.webp"
        alt=""
      />
      <span className="entrance-signature" aria-hidden="true">
        Meet the human
        <br />
        <em>behind the ideas.</em>
      </span>
      <div className="entrance-footer">
        <span>ENGINEER. BUILDER. ALWAYS CURIOUS.</span>
        <button autoFocus onClick={onComplete}>
          Skip intro ↗
        </button>
      </div>
      <div className="entrance-track" aria-hidden="true">
        <i />
      </div>
    </div>
  );
}
