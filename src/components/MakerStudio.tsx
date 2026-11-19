import { useEffect, useRef, useState } from "react";
import { Play, Pause, RotateCcw, Sparkles, Check } from "lucide-react";

const chapters = [
  {
    name: "The spark",
    word: "Imagine.",
    title: "A better question changes everything.",
    text: "I start with the friction. The repeated task. The missing connection. The small thing that could work a little better.",
    note: "What if we made this simpler?",
    code: "const idea = curiosity + purpose;",
  },
  {
    name: "The craft",
    word: "Connect.",
    title: "Then the pieces find their place.",
    text: "Information becomes structure. Services become a system. I like the moment when separate parts start making sense together.",
    note: "A little structure. A lot of possibility.",
    code: "const system = connect(data, logic, people);",
  },
  {
    name: "The human",
    word: "Make it real.",
    title: "It only matters when it helps someone.",
    text: "A clear interface. A useful answer. One less thing to think about. That’s the part of engineering I keep coming back to.",
    note: "Built with a person in mind.",
    code: "return somethingWorthUsing;",
  },
];

export default function MakerStudio({ motion }: { motion: boolean }) {
  const [phase, setPhase] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [visible, setVisible] = useState(false);
  const [activeTab, setActiveTab] = useState(true);
  const section = useRef<HTMLElement>(null);
  const chapter = chapters[phase];
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.2 },
    );
    if (section.current) observer.observe(section.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!motion) setPlaying(false);
  }, [motion]);
  useEffect(() => {
    const update = () => setActiveTab(document.visibilityState === "visible");
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);
  useEffect(() => {
    if (!playing || !visible || !motion || !activeTab) return;
    const timer = window.setTimeout(() => {
      if (phase === 2) setPlaying(false);
      else setPhase(phase + 1);
    }, 5200);
    return () => clearTimeout(timer);
  }, [phase, playing, visible, motion, activeTab]);
  const select = (index: number) => {
    setPlaying(false);
    setPhase(index);
  };
  return (
    <section
      id="workbench"
      ref={section}
      className={`maker-studio section-pad maker-phase-${phase}`}
    >
      <div className="section-label">
        <span>BEHIND THE WORK /</span> A LITTLE OF HOW I THINK
      </div>
      <div className="maker-heading reveal">
        <h2>
          Every good thing
          <br />
          starts with <em>a little spark.</em>
        </h2>
        <p>
          From a passing thought to something useful.
          <br />
          Three moments inside my process.
        </p>
      </div>
      <div className="maker-theatre">
        <div className="maker-person">
          <div className="maker-disc" aria-hidden="true">
            <span>CURIOUS BY NATURE · HUMAN BY DESIGN</span>
          </div>
          <span className="maker-watermark" aria-hidden="true">
            what if?
          </span>
          <img
            src="/images/shivansh-maker.webp"
            alt="Illustrated Shivansh holding a glowing idea in his hand"
            width="1024"
            height="1536"
            loading="lazy"
          />
          <div className="maker-handnote" key={phase}>
            <span>{chapter.note}</span>
            <svg viewBox="0 0 70 40" aria-hidden="true">
              <path d="M5 5 Q15 38 60 22 M46 14 L61 22 L48 31" />
            </svg>
          </div>
          <span className="maker-art-note">
            AN AI-ILLUSTRATED SELF-PORTRAIT
          </span>
        </div>
        <div className="maker-story">
          <div className="maker-exhibit" aria-hidden="true">
            <div className="exhibit-top">
              <span>THE ANATOMY OF AN IDEA</span>
              <span>0{phase + 1} / 03</span>
            </div>
            <div className="idea-object">
              <div className="idea-tile tile-one">
                <Sparkles size={32} strokeWidth={1} />
                <span>possibility</span>
              </div>
              <div className="idea-tile tile-two">
                <span className="object-brackets">{"{ }"}</span>
                <span>structure</span>
              </div>
              <div className="idea-tile tile-three">
                <span className="mini-window">
                  <i />
                  <i />
                  <i />
                </span>
                <span className="mini-content">
                  <i />
                  <i />
                  <i />
                </span>
                <span className="mini-done">
                  <Check size={15} />
                  Made for people
                </span>
              </div>
              <svg className="idea-thread" viewBox="0 0 400 240">
                <path
                  pathLength="1"
                  d="M30 170 C75 170 60 60 125 65 S190 200 240 160 S300 30 375 75"
                />
              </svg>
            </div>
            <code key={chapter.code}>{chapter.code}</code>
          </div>
          <div
            className="maker-narrative"
            aria-live="polite"
            aria-atomic="true"
            key={`copy-${phase}`}
          >
            <span className="maker-verb">{chapter.word}</span>
            <h3>{chapter.title}</h3>
            <p>{chapter.text}</p>
          </div>
        </div>
      </div>
      <div className="maker-timeline">
        <div
          className="maker-chapters"
          role="group"
          aria-label="Inside the creative process"
        >
          {chapters.map((c, i) => (
            <button
              key={c.name}
              aria-pressed={phase === i}
              onClick={() => select(i)}
              className={
                playing && phase === i && visible && activeTab
                  ? "is-playing"
                  : ""
              }
            >
              <span className="chapter-track">
                <i />
              </span>
              <span>
                <small>0{i + 1}</small>
                {c.name}
              </span>
            </button>
          ))}
        </div>
        {motion && (
          <button
            className="maker-play"
            onClick={() => {
              if (phase === 2 && !playing) setPhase(0);
              setPlaying(!playing);
            }}
            aria-label={
              playing
                ? "Pause the visual story"
                : phase === 2
                  ? "Replay the visual story"
                  : "Play the visual story"
            }
          >
            {playing ? (
              <Pause size={15} />
            ) : phase === 2 ? (
              <RotateCcw size={15} />
            ) : (
              <Play size={15} />
            )}
            <span>
              {playing
                ? "Pause story"
                : phase === 2
                  ? "Watch again"
                  : "Play the story"}
            </span>
          </button>
        )}
      </div>
    </section>
  );
}
