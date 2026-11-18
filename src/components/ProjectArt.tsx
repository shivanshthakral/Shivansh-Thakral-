import { useId } from "react";
import type { Project } from "../data";
export default function ProjectArt({
  project,
  stage = 1,
}: {
  project: Project;
  stage?: number;
}) {
  const gradientId = useId();
  return (
    <div
      className={`project-art art-${project.color} stage-${stage}`}
      aria-hidden="true"
    >
      <div className="art-grid" />
      {project.id === "healthpredict" ? (
        <div className="diagnostic">
          <div className="scan-ring ring-one" />
          <div className="scan-ring ring-two" />
          <svg viewBox="0 0 480 300">
            <defs>
              <linearGradient id={gradientId}>
                <stop stopColor="#a9e8c8" />
                <stop offset="1" stopColor="#467f74" />
              </linearGradient>
            </defs>
            {Array.from({ length: 16 }, (_, i) => (
              <path
                key={i}
                d={`M 20 ${70 + i * 11} Q 100 ${35 + i * 8} 160 ${110 + i * 6} T 265 ${50 + i * 12} T 460 ${120 + i * 7}`}
                fill="none"
                stroke={`url(#${gradientId})`}
                strokeWidth=".8"
                opacity={0.25 + i * 0.035}
              />
            ))}
            <path
              d="M 40 155 H 130 L 155 150 L 170 171 L 191 113 L 218 198 L 242 140 L 259 155 H 440"
              fill="none"
              stroke="#c7ffe0"
              strokeWidth="2"
            />
          </svg>
          <span className="art-tag tag-top">FEATURE SPACE / 01</span>
          <span className="art-tag tag-bottom">PATTERNS → POSSIBILITIES</span>
          <div className="data-chip">
            <span className="status-dot" /> MODEL EXPLORATION <b>f(x)</b>
          </div>
        </div>
      ) : project.id === "contentstack" ? (
        <div className="workflow-art">
          <div className="document doc-back">
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="document doc-front">
            <b>01 / INPUT</b>
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="flow-core">✳</div>
          <div className="output-block">
            <b>STRUCTURED</b>
            <span>content: &#123;</span>
            <span>&nbsp; possibilities</span>
            <span>&#125;</span>
          </div>
          <svg viewBox="0 0 600 300">
            <path d="M120 160 C200 160 220 160 300 160 S400 160 500 160" />
          </svg>
          <span className="art-tag tag-bottom">INFORMATION, IN MOTION.</span>
        </div>
      ) : (
        <div className="network-art">
          <svg viewBox="0 0 600 350">
            {[
              [110, 90],
              [170, 265],
              [450, 80],
              [490, 245],
              [295, 55],
              [380, 290],
              [75, 190],
            ].map(([x, y], i) => (
              <g key={i}>
                <path d={`M300 175 Q${x} 175 ${x} ${y}`} />
                <circle cx={x} cy={y} r={i % 2 ? 8 : 5} />
                <circle cx={x} cy={y} r={i % 2 ? 17 : 12} fill="none" />
              </g>
            ))}
            <circle cx="300" cy="175" r="65" />
            <circle
              cx="300"
              cy="175"
              r="82"
              fill="none"
              strokeDasharray="2 7"
            />
          </svg>
          <span className="network-center">
            a human
            <br />
            <em>connection.</em>
          </span>
          <span className="art-tag tag-top">ENGAGEMENT NETWORK</span>
          <span className="art-tag tag-bottom">
            EVERY CONNECTION HAS A STORY
          </span>
        </div>
      )}
    </div>
  );
}
