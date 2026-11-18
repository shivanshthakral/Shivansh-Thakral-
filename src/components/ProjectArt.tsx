import type { Project } from "../data";
export default function ProjectArt({
  project,
  stage = 1,
}: {
  project: Project;
  stage?: number;
}) {
  const caption =
    project.id === "healthpredict"
      ? "THE ANATOMY OF INTELLIGENCE"
      : project.id === "contentstack"
        ? "INFORMATION, REIMAGINED"
        : "EVERY CONNECTION MATTERS";
  return (
    <div
      className={`project-art cinematic-art art-${project.color} stage-${stage}`}
      aria-hidden="true"
    >
      <img
        className="project-world-image"
        src={`/images/projects/${project.id}.webp`}
        alt=""
        loading="lazy"
        width="1536"
        height="1024"
      />
      <div className="world-shade" />
      <div className="world-scan" />
      <div className="world-cross cross-a">+</div>
      <div className="world-cross cross-b">+</div>
      <div className="world-caption">
        <span />
        {caption}
      </div>
      <div className="world-stages">
        {project.stages.map((s, i) => (
          <span key={s} className={i === stage ? "active" : ""}>
            <b>0{i + 1}</b>
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}
