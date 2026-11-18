import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { profile } from "../data";
const chapters = [
  {
    name: "The engineer",
    word: "LOGIC",
    photo: "suit",
    side: "off-duty",
    title: "A mind for systems.",
    subtitle: "An eye for possibility.",
    text: "I’m a computer science undergraduate in Chennai, drawn to the moment a difficult problem becomes an elegant system. Learning the fundamentals is where it starts. Finding what I can do with them is what keeps me going.",
    caption: "A LITTLE STRUCTURE. A LOT OF CURIOSITY.",
  },
  {
    name: "The builder",
    word: "CREATE",
    photo: "yellow-shirt",
    side: "suit",
    title: "Curiosity is the start.",
    subtitle: "Making is the point.",
    text: "My work moves between artificial intelligence, backend engineering, and creative development. I like connecting the pieces: taking information, finding its structure, and turning it into something people can actually use.",
    caption: "IDEAS DESERVE TO LEAVE THE NOTEBOOK.",
  },
  {
    name: "The human",
    word: "LIVE",
    photo: "adventure",
    side: "off-duty",
    title: "There’s life beyond",
    subtitle: "the next line of code.",
    text: "The person behind the projects is still collecting experiences. A different place, a muddy trail, a moment away from the screen. This is the other side of my universe — and just as much a part of who I am.",
    caption: "SOME OF THE BEST MOMENTS ARE OFFLINE.",
  },
];
export default function AboutStory() {
  const [chapter, setChapter] = useState(0);
  const c = chapters[chapter];
  return (
    <section id="about" className="about-story section-pad">
      <div className="section-label">
        <span>02 /</span>A PERSON, IN THREE CHAPTERS
      </div>
      <div className="story-heading reveal">
        <h2>
          Built on logic.
          <br />
          <em>Driven by curiosity.</em>
        </h2>
        <p>
          Not just what I build.
          <br />
          What makes me, me.
        </p>
      </div>
      <div className="story-layout">
        <div className={`story-portrait identity-studio chapter-${chapter}`}>
          <span className="story-word" aria-hidden="true">
            {c.word}
          </span>
          <figure className="identity-studio-portrait">
            <img
              src="/images/about-engineer.webp"
              alt="An imagined illustration of Shivansh sketching ideas in a bright engineering studio"
              loading="lazy"
            />
            <figcaption>
              AN IMAGINED STUDIO / AN ORIGINAL ILLUSTRATION
            </figcaption>
          </figure>
          <div className="identity-thought" key={chapter}>
            <span>INSIDE MY MIND / 0{chapter + 1}</span>
            <strong>
              {["solve(problem)", "build(idea)", "explore(world)"][chapter]}
            </strong>
            <i />
            <p>{c.caption}</p>
          </div>
          <span className="story-coordinate">
            CHENNAI, INDIA / A WORK IN PROGRESS
          </span>
        </div>
        <div className="story-narrative">
          <div
            className="story-tabs"
            role="tablist"
            aria-label="About Shivansh chapters"
          >
            {chapters.map((x, i) => (
              <button
                key={x.name}
                role="tab"
                id={`story-tab-${i}`}
                aria-selected={chapter === i}
                aria-controls="story-panel"
                tabIndex={chapter === i ? 0 : -1}
                onClick={() => setChapter(i)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                    e.preventDefault();
                    const next =
                      (chapter + (e.key === "ArrowRight" ? 1 : 2)) % 3;
                    setChapter(next);
                    document.getElementById(`story-tab-${next}`)?.focus();
                  }
                }}
              >
                <span>0{i + 1}</span>
                {x.name}
              </button>
            ))}
          </div>
          <div
            id="story-panel"
            role="tabpanel"
            aria-labelledby={`story-tab-${chapter}`}
            className="story-panel"
          >
            <div key={chapter}>
              <span className="label">
                CHAPTER 0{chapter + 1} / SHIVANSH THAKRAL
              </span>
              <h3>
                {c.title}
                <br />
                <em>{c.subtitle}</em>
              </h3>
              <p>{c.text}</p>
            </div>
          </div>
          <div className="story-education">
            <div>
              <span className="label">CURRENT CHAPTER / 2023–2027</span>
              <h4>B.Tech, Computer Science & Engineering</h4>
              <p>SRM Institute of Science and Technology</p>
            </div>
            <strong>
              9.44<small>CGPA</small>
            </strong>
          </div>
          <a
            className="text-link"
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            The professional chapter <ArrowUpRight size={17} />
          </a>
        </div>
      </div>
    </section>
  );
}
