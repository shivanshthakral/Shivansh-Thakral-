import { Code2, GraduationCap, Layers } from "lucide-react";
import { experience } from "../data";
const notes = [
  {
    heading: "Learning at the scale of real work.",
    tag: "AUTOMATION / ENGINEERING",
    icon: Code2,
    phrase: "Connect the pieces.",
  },
  {
    heading: "Good ideas deserve a clear explanation.",
    tag: "LEARNING / COMMUNICATION",
    icon: GraduationCap,
    phrase: "Make it make sense.",
  },
  {
    heading: "Understand the system. Then improve it.",
    tag: "WORKFLOWS / VALIDATION",
    icon: Layers,
    phrase: "Start with the details.",
  },
];
export default function JourneyNote({ selected }: { selected: number }) {
  const i = selected < 0 ? 0 : selected;
  const n = notes[i];
  const e = experience[i];
  const Icon = n.icon;
  return (
    <aside
      className="journey-notebook"
      aria-label="Experience chapter illustration"
    >
      <div className="notebook-pages" />
      <div className="notebook-page" key={i}>
        <div className="notebook-top">
          <span>FIELD NOTES</span>
          <span>CHAPTER 0{3 - i}</span>
        </div>
        <span className="notebook-year" aria-hidden="true">
          {e.year.slice(0, 4)}
        </span>
        <Icon className="notebook-icon" size={44} strokeWidth={1} />
        <h3>{n.heading}</h3>
        <div className="notebook-rule" />
        <p>{n.phrase}</p>
        <div className="notebook-bottom">
          <span>{n.tag}</span>
          <span>ST.</span>
        </div>
      </div>
      <span className="notebook-caption">EXPERIENCE IS THE BEST TEACHER.</span>
    </aside>
  );
}
