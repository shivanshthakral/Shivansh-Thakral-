import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  FileText,
  Globe2,
  Braces,
  HeartPulse,
  Users,
  Check,
  Layers,
} from "lucide-react";
import type { Project } from "../data";
const stories = {
  healthpredict: {
    intro: "A little intelligence. A more human purpose.",
    description:
      "Follow the journey from carefully prepared healthcare data to an understandable analytics interface.",
    role: "AN IMAGINED HEALTHCARE CHAPTER",
    character: "health-character",
    steps: [
      {
        title: "Start with a clearer signal.",
        note: "Clean and validate the input before looking for patterns.",
        label: "DATA PREPARATION",
      },
      {
        title: "Find the useful patterns.",
        note: "Feature engineering and predictive models connect the dots.",
        label: "MODEL EXPLORATION",
      },
      {
        title: "Make the result understandable.",
        note: "Bring the workflow into an accessible application interface.",
        label: "APPLICATION INTERFACE",
      },
    ],
  },
  contentstack: {
    intro: "Less busywork. More room for the idea.",
    description:
      "Documents, services, and content tools come together in one connected creative workflow.",
    role: "AN IMAGINED CREATIVE CHAPTER",
    character: "content-character",
    steps: [
      {
        title: "Every idea starts somewhere.",
        note: "A document, a URL, or an API becomes the starting point.",
        label: "CHOOSE AN INPUT",
      },
      {
        title: "Give information a shape.",
        note: "Extract the useful pieces and organize the content.",
        label: "STRUCTURE THE CONTENT",
      },
      {
        title: "One source. New possibilities.",
        note: "Connect structured information to content and presentation tools.",
        label: "COMPOSE THE OUTPUT",
      },
    ],
  },
  crm: {
    intro: "Behind every data point, a person.",
    description:
      "Connect engagement, campaigns, and analytics around the people an application serves.",
    role: "AN IMAGINED CONNECTION CHAPTER",
    character: "crm-character",
    steps: [
      {
        title: "Bring the conversation together.",
        note: "One shared place for customer and campaign information.",
        label: "A CONNECTED VIEW",
      },
      {
        title: "Listen for the useful signal.",
        note: "Look across engagement and activity to understand the context.",
        label: "ENGAGEMENT CONTEXT",
      },
      {
        title: "Make the next step count.",
        note: "Connect campaign workflows with automation and AI-assisted features.",
        label: "THE NEXT INTERACTION",
      },
    ],
  },
};
export default function ProjectShowcase({
  project: p,
  explore,
}: {
  project: Project;
  explore: () => void;
}) {
  const [step, setStep] = useState(0);
  const [source, setSource] = useState(0);
  const s = stories[p.id];
  const chapter = s.steps[step];
  return (
    <article
      className={`project project-${p.color} project-interactive reveal project-chapter-${step}`}
    >
      <div className={`project-visual project-playground playground-${p.id}`}>
        <div className="playground-grid" />
        <div className="playground-top">
          <span>EXPLORATION / {p.number}</span>
          <span>{p.category}</span>
        </div>
        <div className="playground-intro">
          <h3>{p.name}</h3>
          <p className="playground-line">{s.intro}</p>
          <p className="playground-description">{s.description}</p>
        </div>
        <div className="project-character-stage">
          <div className={`project-world world-${p.id}`} aria-hidden="true">
            <img
              src={`/images/projects/${p.id}.webp`}
              alt=""
              width="1536"
              height="1024"
              loading="lazy"
            />
            <span className="world-caption">
              {p.id === "healthpredict"
                ? "THE HUMAN SIDE OF DATA"
                : p.id === "contentstack"
                  ? "IDEAS, IN FLOW"
                  : "EVERY CONNECTION COUNTS"}
            </span>
          </div>
          <span className="project-scene-word" aria-hidden="true">
            {p.id === "healthpredict"
              ? "CARE."
              : p.id === "contentstack"
                ? "CREATE."
                : "CONNECT."}
          </span>
          <div className="character-platform" />
          <img
            className="project-character"
            src={`/images/projects/${s.character}.webp`}
            alt={`Illustrated Shivansh in a fictional ${p.id === "healthpredict" ? "healthcare" : p.id === "contentstack" ? "creative technologist" : "product builder"} role`}
            loading="lazy"
            width="1024"
            height="1536"
          />
          <span className="character-role">
            {s.role}
            <br />
            AI-GENERATED ILLUSTRATION
          </span>
        </div>
        <div className="project-demo">
          <div className="demo-top">
            <span>
              <i />
              {chapter.label}
            </span>
            <span>CONCEPT PREVIEW</span>
          </div>
          <div
            className={`demo-animation demo-${p.id} demo-step-${step}`}
            key={`${step}-${source}`}
            aria-hidden="true"
          >
            {p.id === "healthpredict" ? (
              <>
                <div className="health-emblem">
                  <HeartPulse size={29} strokeWidth={1.3} />
                </div>
                <div className="health-signal">
                  <svg viewBox="0 0 300 70">
                    <path d="M0 38 H65 L80 31 L94 48 L117 9 L145 65 L168 25 L188 38 H300" />
                  </svg>
                  <div className="signal-points">
                    {Array.from({ length: 25 }, (_, i) => (
                      <i key={i} style={{ animationDelay: `${i * 0.025}s` }} />
                    ))}
                  </div>
                  <span className="demo-tag">
                    {
                      [
                        "INPUT → VALIDATION",
                        "FEATURES → PATTERNS",
                        "MODEL → INTERFACE",
                      ][step]
                    }
                  </span>
                </div>
              </>
            ) : p.id === "contentstack" ? (
              <>
                <div className="content-source">
                  {source === 0 ? (
                    <FileText />
                  ) : source === 1 ? (
                    <Globe2 />
                  ) : (
                    <Braces />
                  )}
                  <span>{["Document", "URL", "API"][source]}</span>
                </div>
                <div className="content-bridge">
                  <i />
                  <i />
                  <i />
                  <ArrowRight size={18} />
                </div>
                <div className="content-result">
                  {step === 0 ? (
                    <>
                      <span className="mock-line" />
                      <span className="mock-line" />
                      <span className="mock-line" />
                    </>
                  ) : step === 1 ? (
                    <>
                      <b>title</b>
                      <span>A useful idea</span>
                      <b>format</b>
                      <span>Structured content</span>
                    </>
                  ) : (
                    <>
                      <Layers size={20} />
                      <span>Article · Outline · Slides</span>
                    </>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="crm-people">
                  {["A", "B", "C"].map((x, i) => (
                    <span className={i === source ? "chosen" : ""} key={x}>
                      {x}
                      <i />
                    </span>
                  ))}
                </div>
                <div className="crm-connection">
                  <span />
                  <Users size={27} strokeWidth={1.3} />
                  <span />
                </div>
                <div className="crm-result">
                  <span>{["Conversation", "Context", "Campaign"][step]}</span>
                  <b>{["Connected", "Understood", "Ready to engage"][step]}</b>
                  <div>
                    <i />
                    <i />
                    <i />
                    <i />
                    <i />
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="demo-narrative" aria-live="polite">
            <h4>{chapter.title}</h4>
            <p>{chapter.note}</p>
          </div>
          {p.id !== "healthpredict" && (
            <div
              className="demo-choices"
              role="group"
              aria-label={
                p.id === "contentstack"
                  ? "Example input source"
                  : "Illustrative contact"
              }
            >
              {(p.id === "contentstack"
                ? ["Document", "URL", "API"]
                : ["Contact A", "Contact B", "Contact C"]
              ).map((label, i) => (
                <button
                  key={label}
                  onClick={() => setSource(i)}
                  aria-pressed={source === i}
                >
                  {source === i && <Check size={10} />} {label}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="project-play-controls">
          <div
            className="play-step-buttons"
            role="group"
            aria-label={`${p.name} concept stages`}
          >
            {p.stages.map((stage, i) => (
              <button
                key={stage}
                aria-pressed={step === i}
                onClick={() => setStep(i)}
              >
                <span>0{i + 1}</span>
                {stage}
              </button>
            ))}
          </div>
          <button
            className="play-next"
            onClick={() => setStep((step + 1) % 3)}
            aria-label={`Next ${p.name} concept stage`}
          >
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
      <div className="project-play-footer">
        <div className="project-tech">
          {p.stack.slice(0, 3).map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
        <span className="project-demo-disclosure">
          {p.id === "healthpredict"
            ? "Workflow illustration · No clinical predictions"
            : "Interactive concept · Not a live product demo"}
        </span>
        <button
          className="play-case"
          onClick={explore}
          aria-label={`Explore ${p.name}`}
        >
          Inside the project <ArrowUpRight size={18} />
        </button>
      </div>
    </article>
  );
}
