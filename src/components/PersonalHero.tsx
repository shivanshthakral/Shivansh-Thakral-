import { useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, RotateCcw } from "lucide-react";

export default function PersonalHero({
  motion,
  entering,
  replay,
  ask,
}: {
  motion: boolean;
  entering: boolean;
  replay: () => void;
  ask: () => void;
}) {
  const stage = useRef<HTMLDivElement>(null);
  const [hello, setHello] = useState(false);
  return (
    <section
      id="home"
      className={`personal-hero ${entering ? "is-entering" : "is-ready"}`}
    >
      <div className="personal-topline">
        <span>
          <i className="status-dot" /> THE PERSONAL PORTFOLIO OF
        </span>
        <span>CHENNAI, INDIA / OPEN TO POSSIBILITIES</span>
      </div>
      <h1 className="personal-name" aria-label="Shivansh Thakral">
        <span>SHIVANSH</span>
        <span className="name-second">
          THAKRAL<span className="name-star">✳</span>
        </span>
      </h1>
      <div
        className="portrait-stage"
        ref={stage}
        onPointerMove={(e) => {
          if (!motion || e.pointerType === "touch") return;
          const r = e.currentTarget.getBoundingClientRect();
          stage.current?.style.setProperty(
            "--portrait-x",
            `${(e.clientX - r.left - r.width / 2) * 0.025}px`,
          );
          stage.current?.style.setProperty(
            "--portrait-r",
            `${(e.clientX - r.left - r.width / 2) * 0.008}deg`,
          );
        }}
        onPointerLeave={() => {
          stage.current?.style.setProperty("--portrait-x", "0px");
          stage.current?.style.setProperty("--portrait-r", "0deg");
        }}
      >
        <div className="portrait-halo" aria-hidden="true" />
        <div className="portrait-outline" aria-hidden="true" />
        <img
          className="hero-character"
          src="/images/shivansh-character.webp"
          alt="A full-body illustrated portrait of Shivansh in his yellow shirt, black glasses and sneakers, waving hello"
          fetchPriority="high"
          width="1024"
          height="1536"
        />
        <button
          className={`hello-sticker ${hello ? "said-hello" : ""}`}
          onClick={() => setHello(!hello)}
          aria-label={hello ? "Reset greeting" : "Say hello to Shivansh"}
        >
          {hello ? "Hey, you! ↗" : "Oh, hey there. ✳"}
        </button>
      </div>
      <div className="hero-aside hero-aside-left">
        <span className="label">01 / THE INTRODUCTION</span>
        <h2>
          I build things.
          <br />
          <em>
            And question
            <br />
            everything.
          </em>
        </h2>
        <p>
          Software engineer. AI enthusiast.
          <br />
          Human first, always.
        </p>
        <a href="#work" className="personal-cta">
          Explore my work <ArrowDown size={18} />
        </a>
      </div>
      <div className="hero-aside hero-aside-right">
        <span className="handwritten">Yes, that's me.</span>
        <span className="sketch-arrow" aria-hidden="true">
          ↙
        </span>
        <p>
          Code, curiosity, and a little
          <br />
          bit of organised chaos.
        </p>
        <button className="hero-chat-link" onClick={ask}>
          Get to know me <ArrowUpRight size={17} />
        </button>
      </div>
      <div className="personal-hero-foot">
        <button onClick={replay}>
          <RotateCcw size={14} /> Replay the entrance
        </button>
        <span>SCROLL FOR THE WORK. STAY FOR THE PERSON.</span>
        <a href="#about">
          Meet Shivansh <ArrowDown size={14} />
        </a>
      </div>
    </section>
  );
}
