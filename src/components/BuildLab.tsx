import { useState } from "react";
import { ArrowRight, Braces, Workflow, MousePointer2 } from "lucide-react";
const phases = [
  {
    name: "Question",
    eyebrow: "01 / FIND THE RIGHT PROBLEM",
    title: "It starts with a little friction.",
    text: "Something takes too long. Information gets lost. A useful pattern stays hidden. Before the code, there’s a question worth asking.",
    code: [
      "observe(problem)",
      'ask("what could be better?")',
      "define(intent)",
    ],
    outputs: ["Listen", "Explore", "Frame"],
    icon: Braces,
  },
  {
    name: "Connect",
    eyebrow: "02 / MAKE THE PIECES TALK",
    title: "Give the idea a structure.",
    text: "Data, models, APIs, and interfaces each do one part. The interesting work is in the connections — making the whole system make sense.",
    code: ["prepare(data)", "connect(services)", "validate(flow)"],
    outputs: ["Data", "Logic", "Interface"],
    icon: Workflow,
  },
  {
    name: "Create",
    eyebrow: "03 / PUT IT INTO THE WORLD",
    title: "Make it useful. Then make it better.",
    text: "An idea becomes real when someone can use it. Build the experience, test the edges, and keep refining the parts that matter.",
    code: ["build(experience)", "test(edge_cases)", "refine(details)"],
    outputs: ["Build", "Test", "Refine"],
    icon: MousePointer2,
  },
];
export default function BuildLab() {
  const [phase, setPhase] = useState(0);
  const p = phases[phase];
  const Icon = p.icon;
  return (
    <section id="workbench" className="build-lab section-pad">
      <div className="section-label">
        <span>INTERLUDE /</span>INSIDE THE PROCESS
      </div>
      <div className="heading-row reveal">
        <h2>
          From a “what if.”
          <br />
          <em>To something real.</em>
        </h2>
        <p>
          A small look inside the way I think.
          <br />
          Move through the process.
        </p>
      </div>
      <div className={`lab-stage phase-${phase}`}>
        <div className="lab-grid" />
        <span className="lab-stage-label label">
          SHIVANSH’S WORKBENCH / INTERACTIVE STUDY
        </span>
        <svg
          className="lab-flow"
          viewBox="0 0 1000 360"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            pathLength="1"
            d="M200 180 H400 Q500 180 500 100 H780 M500 180 H780 M500 180 V260 H780"
          />
          <path
            pathLength="1"
            d="M200 180 H400 Q500 180 500 100 H780 M500 180 H780 M500 180 V260 H780"
          />
        </svg>
        <div className="lab-code" key={`code-${phase}`}>
          <span className="label">THOUGHTS → STRUCTURE</span>
          {p.code.map((s, i) => (
            <code key={s}>
              <small>0{i + 1}</small>
              {s}
            </code>
          ))}
          <i />
        </div>
        <div className="lab-core" key={phase}>
          <span className="lab-core-ring" />
          <span className="label">0{phase + 1}</span>
          <Icon size={42} strokeWidth={1} />
          <strong>{p.name}</strong>
        </div>
        <div className="lab-output" key={`out-${phase}`}>
          {p.outputs.map((s, i) => (
            <span key={s}>
              <i /> {s}
              <small>0{i + 1}</small>
            </span>
          ))}
        </div>
      </div>
      <div className="lab-bottom">
        <div className="lab-narration" aria-live="polite">
          <span className="label">{p.eyebrow}</span>
          <h3>{p.title}</h3>
          <p>{p.text}</p>
        </div>
        <div className="lab-controls">
          <div role="group" aria-label="Build process steps">
            {phases.map((x, i) => (
              <button
                key={x.name}
                aria-pressed={phase === i}
                onClick={() => setPhase(i)}
              >
                0{i + 1}
                <span>{x.name}</span>
              </button>
            ))}
          </div>
          <button
            className="lab-next"
            onClick={() => setPhase((phase + 1) % 3)}
            aria-label="Next build step"
          >
            <ArrowRight size={22} />
          </button>
        </div>
      </div>
    </section>
  );
}
