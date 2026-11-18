import { useState, type CSSProperties, type PointerEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { constellations } from "../data";
const notes: Record<string, string> = {
  Python: "Preparing data and building the logic behind intelligent features.",
  "Scikit-Learn":
    "Turning prepared data into models that can be evaluated and compared.",
  XGBoost: "Exploring patterns in structured data with boosted decision trees.",
  "Document AI":
    "Bringing structure to information that starts inside documents.",
  "OpenAI APIs": "Connecting language capabilities to application workflows.",
  "Node.js":
    "Building the services that connect an application’s moving parts.",
  "Express.js": "Organizing server routes, requests, and application APIs.",
  Flask: "Making Python workflows accessible through an application interface.",
  MongoDB: "Storing and retrieving application information in document form.",
  "REST APIs": "Giving separate systems a clear way to exchange information.",
  React: "Composing interfaces out of reusable, interactive pieces.",
  "Next.js":
    "Connecting React interfaces with application structure and workflows.",
  TypeScript:
    "Making the shape of application data explicit as the code grows.",
  "Three.js":
    "Exploring dimensional interfaces and interactive browser graphics.",
  CSS: "Directing typography, composition, responsive layouts, and motion.",
};
const codes = [
  [".py", "ML", "XG", "DOC", "AI"],
  ["JS", "EX", "FL", "DB", "API"],
  ["RE", "NX", "TS", "3D", "CSS"],
];
export default function ToolStudio({
  skill,
  openProject,
}: {
  skill: number;
  openProject: () => void;
}) {
  const [selected, setSelected] = useState(0);
  const discipline = constellations[skill];
  const tilt = (e: PointerEvent<HTMLDivElement>) => {
    if (
      e.pointerType !== "mouse" ||
      document.documentElement.dataset.motion === "off"
    )
      return;
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty(
      "--studio-x",
      `${((e.clientX - r.left) / r.width - 0.5) * 7}deg`,
    );
    e.currentTarget.style.setProperty(
      "--studio-y",
      `${-((e.clientY - r.top) / r.height - 0.5) * 6}deg`,
    );
  };
  return (
    <div
      className={`tool-studio studio-${skill}`}
      onPointerMove={tilt}
      onPointerLeave={(e) => {
        e.currentTarget.style.setProperty("--studio-x", "0deg");
        e.currentTarget.style.setProperty("--studio-y", "0deg");
      }}
    >
      <div className="studio-scene">
        <span className="studio-label label">
          THE ENGINEERING STUDIO / 0{skill + 1}
        </span>
        <span className="studio-word" aria-hidden="true">
          {["THINK", "BUILD", "CREATE"][skill]}
        </span>
        <div className="studio-floor" />
        <img
          className="studio-character"
          src="/images/shivansh-builder.webp"
          alt="Illustrated Shivansh working on a laptop"
          width="1024"
          height="1536"
          loading="lazy"
        />
        <div
          className="studio-tools"
          role="group"
          aria-label={`${discipline.name} tools`}
        >
          {discipline.tech.map((t, i) => (
            <button
              key={t}
              className={`studio-tool tool-${i}`}
              aria-pressed={selected === i}
              onClick={() => setSelected(i)}
              style={{ "--tile-delay": `${i * 0.06}s` } as CSSProperties}
            >
              <b>{codes[skill][i]}</b>
              <span>{t}</span>
              <i />
            </button>
          ))}
        </div>
        <span className="studio-note">
          Always building.
          <br />
          <em>Always becoming.</em>
        </span>
      </div>
      <div className="studio-insight" aria-live="polite">
        <span className="label">
          IN THE TOOLKIT / {discipline.tech[selected]}
        </span>
        <p>{notes[discipline.tech[selected]]}</p>
      </div>
      <button className="studio-project" onClick={openProject}>
        <span>SEE THE CONNECTION</span>
        {discipline.project}
        <ArrowUpRight size={18} />
      </button>
    </div>
  );
}
