import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function Orbit({
  motion,
  mode,
}: {
  motion: boolean;
  mode: number;
}) {
  const host = useRef<HTMLDivElement>(null);
  const live = useRef({ motion, mode });
  live.current = { motion, mode };
  const [fallback, setFallback] = useState(false);
  useEffect(() => {
    const element = host.current!;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "low-power",
      });
    } catch {
      setFallback(true);
      return;
    }
    const mobile = matchMedia("(max-width: 700px)").matches;
    renderer.setPixelRatio(Math.min(devicePixelRatio, mobile ? 0.9 : 1.75));
    renderer.setClearColor(0x10110f, 0);
    element.appendChild(renderer.domElement);
    renderer.domElement.setAttribute("aria-hidden", "true");
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
    camera.position.set(0, 0, 9.5);
    const group = new THREE.Group();
    scene.add(group);
    group.rotation.z = -0.25;
    const uniforms = { uTime: { value: 0 }, uMode: { value: 0 } };
    const coreGeometry = new THREE.SphereGeometry(
      1.47,
      mobile ? 72 : 128,
      mobile ? 48 : 96,
    );
    const coreMaterial = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: `varying vec3 vNormal; varying vec3 vPosition; uniform float uTime; uniform float uMode;
  void main(){vNormal=normalize(normalMatrix*normal);vPosition=position;float wave=sin(position.y*9.+uTime*.45)*cos(position.x*7.+uTime*.2)*.025;vec3 p=position+normal*wave*(1.+uMode*.45);gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);}`,
      fragmentShader: `varying vec3 vNormal;varying vec3 vPosition;uniform float uTime;uniform float uMode;
  void main(){vec3 n=normalize(vNormal);float light=max(0.,dot(n,normalize(vec3(-.6,.75,1.))));float rim=pow(1.-max(0.,n.z),2.8);float line=pow(.5+.5*sin(vPosition.y*150.+sin(vPosition.x*8.+uTime*.2)*3.),16.);float grain=fract(sin(dot(gl_FragCoord.xy,vec2(12.9898,78.233)))*43758.5453);vec3 copper=mix(vec3(.13,.052,.025),vec3(.87,.47,.27),pow(light,2.));vec3 green=mix(vec3(.025,.08,.06),vec3(.56,.74,.49),pow(light,2.));vec3 tint=mix(copper,green,clamp(uMode,0.,1.));vec3 color=tint*(.30+line*.70)+rim*vec3(.83,.56,.34)*.6+grain*.027;gl_FragColor=vec4(color,1.);}`,
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    group.add(core);
    const rings: THREE.LineLoop[] = [];
    for (let j = 0; j < 7; j++) {
      const pts = [];
      for (let i = 0; i < 256; i++) {
        const a = (i / 256) * Math.PI * 2;
        pts.push(
          new THREE.Vector3(
            Math.cos(a) * (2 + j * 0.065),
            Math.sin(a) * (2 + j * 0.065),
            0,
          ),
        );
      }
      const ring = new THREE.LineLoop(
        new THREE.BufferGeometry().setFromPoints(pts),
        new THREE.LineBasicMaterial({
          color: j % 3 === 0 ? 0xc6e3ac : 0xbf815b,
          transparent: true,
          opacity: j % 3 === 0 ? 0.65 : 0.27,
        }),
      );
      ring.rotation.set(0.7 + j * 0.18, 0.35 + j * 0.22, j * 0.26);
      group.add(ring);
      rings.push(ring);
    }
    let seed = 47;
    const random = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };
    const count = mobile ? 500 : 1300;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const a = random() * Math.PI * 2,
        r = 2.35 + random() * 0.65;
      pos[i * 3] = Math.cos(a) * r;
      pos[i * 3 + 1] = (random() - 0.5) * 0.07;
      pos[i * 3 + 2] = Math.sin(a) * r;
    }
    const dust = new THREE.Points(
      new THREE.BufferGeometry().setAttribute(
        "position",
        new THREE.BufferAttribute(pos, 3),
      ),
      new THREE.PointsMaterial({
        color: 0xe0b994,
        size: mobile ? 0.012 : 0.009,
        transparent: true,
        opacity: 0.72,
      }),
    );
    dust.rotation.z = 0.45;
    group.add(dust);
    const satellites = new THREE.Group();
    group.add(satellites);
    for (let i = 0; i < 3; i++) {
      const m = new THREE.Mesh(
        new THREE.SphereGeometry(0.055, 12, 8),
        new THREE.MeshBasicMaterial({ color: i === 0 ? 0xd3f7b7 : 0xdfb89b }),
      );
      m.position.set(
        Math.cos(i * 2.1) * 2.4,
        Math.sin(i * 2.1) * 1.4,
        Math.sin(i * 2.1) * 1.5,
      );
      satellites.add(m);
    }
    const pointer = new THREE.Vector2();
    const move = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const b = element.getBoundingClientRect();
      pointer.set(
        (e.clientX - b.left) / b.width - 0.5,
        (e.clientY - b.top) / b.height - 0.5,
      );
    };
    const leave = () => pointer.set(0, 0);
    element.addEventListener("pointermove", move);
    element.addEventListener("pointerleave", leave);
    let needsRender = true;
    const resize = () => {
      const { width, height } = element.getBoundingClientRect();
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      needsRender = true;
    };
    const ro = new ResizeObserver(resize);
    ro.observe(element);
    resize();
    let visible = true;
    let lost = false;
    let frame = 0;
    let last = 0;
    let elapsed = 0;
    let slowFrames = 0;
    let lateFrames = 0;
    let lastDraw = 0;
    let mobileStarted = 0;
    // Software graphics share the main CPU with scrolling and input. Keep the
    // sculpture interactive, but render these devices only when state changes.
    const gl = renderer.getContext();
    const rendererInfo = gl.getExtension("WEBGL_debug_renderer_info");
    const rendererName = rendererInfo
      ? String(gl.getParameter(rendererInfo.UNMASKED_RENDERER_WEBGL))
      : "";
    let adaptiveStill = /swiftshader|llvmpipe|software|basic render/i.test(rendererName);
    if (adaptiveStill) element.dataset.quality = "adaptive-still";
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
    });
    io.observe(element);
    const contextLost = (e: Event) => {
      e.preventDefault();
      lost = true;
      setFallback(true);
    };
    renderer.domElement.addEventListener("webglcontextlost", contextLost);
    const animate = (now: number) => {
      frame = requestAnimationFrame(animate);
      const interval = last ? now - last : 16;
      last = now;
      if (!visible || document.hidden || lost) return;
      if (!mobileStarted) mobileStarted = now;
      const delta = live.current.mode - uniforms.uMode.value;
      const sceneMoving =
        live.current.motion &&
        !adaptiveStill &&
        (!mobile || now - mobileStarted < 1200 || Math.abs(delta) > 0.001);
      if (!sceneMoving && !needsRender && Math.abs(delta) <= 0.001) return;
      if (mobile && !needsRender && now - lastDraw < 1000 / 30) return;
      const dt = Math.min(lastDraw ? (now - lastDraw) / 1000 : 0.016, 0.05);
      lastDraw = now;
      // GPU driver/compositor time often falls outside renderer.render().
      // Measure delivered frames too, so software graphics remain responsive.
      if (sceneMoving) {
        lateFrames =
          interval > 48 ? lateFrames + 1 : Math.max(0, lateFrames - 1);
        if (lateFrames >= 3) {
          adaptiveStill = true;
          element.dataset.quality = "adaptive-still";
        }
      }
      if (sceneMoving) {
        elapsed += dt;
        group.rotation.y += (pointer.x * 0.24 - group.rotation.y) * 0.025;
        group.rotation.x += (-pointer.y * 0.18 - group.rotation.x) * 0.025;
        core.rotation.y = elapsed * 0.035;
        dust.rotation.y = elapsed * 0.028;
        satellites.rotation.y = elapsed * 0.09;
        rings.forEach(
          (r, i) => (r.rotation.z += dt * 0.012 * (i % 2 ? 1 : -1)),
        );
      }
      if (sceneMoving || needsRender || Math.abs(delta) > 0.001) {
        uniforms.uTime.value = elapsed;
        uniforms.uMode.value =
          live.current.motion && !adaptiveStill
            ? uniforms.uMode.value + delta * (mobile ? 0.15 : 0.04)
            : live.current.mode;
        const started = performance.now();
        renderer.render(scene, camera);
        needsRender = false;
        if (performance.now() - started > 35) slowFrames++;
        else slowFrames = Math.max(0, slowFrames - 1);
        if (slowFrames >= 2) {
          adaptiveStill = true;
          element.dataset.quality = "adaptive-still";
        }
      }
    };
    frame = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      io.disconnect();
      element.removeEventListener("pointermove", move);
      element.removeEventListener("pointerleave", leave);
      renderer.domElement.removeEventListener("webglcontextlost", contextLost);
      scene.traverse((o) => {
        if (
          o instanceof THREE.Mesh ||
          o instanceof THREE.Points ||
          o instanceof THREE.Line
        ) {
          o.geometry.dispose();
          const mats = Array.isArray(o.material) ? o.material : [o.material];
          mats.forEach((m) => m.dispose());
        }
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);
  return (
    <div
      className={`orbit-art ${fallback ? "is-fallback" : ""}`}
      ref={host}
      role="img"
      aria-label="An intricate copper intelligence core surrounded by intersecting orbits and particles"
    >
      {fallback && (
        <div className="orbit-fallback">
          <i />
          <i />
          <i />
          <b />
        </div>
      )}
    </div>
  );
}
