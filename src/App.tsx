import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  ArrowRight,
  Plus,
  Minus,
  Copy,
  Check,
  Pause,
  Play,
  Menu,
  Send,
} from "lucide-react";
import {
  profile,
  projects,
  experience,
  constellations,
  certifications,
  type Project,
} from "./data";
import Dialog from "./components/Dialog";
import Explorer from "./components/Explorer";
import ProjectArt from "./components/ProjectArt";
import ProjectShowcase from "./components/ProjectShowcase";
import Entrance from "./components/Entrance";
import PersonalHero from "./components/PersonalHero";
import LifeGallery from "./components/LifeGallery";
import AboutStory from "./components/AboutStory";
import MakerStudio from "./components/MakerStudio";
import AskPortal from "./components/AskPortal";
import ToolStudio from "./components/ToolStudio";
import JourneyNote from "./components/JourneyNote";
import ContactNote from "./components/ContactNote";
import CuriositySculpture from "./components/CuriositySculpture";
import { useSceneScroll } from "./useSceneScroll";

const repositories: Record<string, string> = {
  healthpredict: "https://github.com/shivanshthakral/HealthPredict-AI-MAIN",
  contentstack:
    "https://github.com/shivanshthakral/contentstack-accelerator-main",
  crm: "https://github.com/shivanshthakral/AI-Powered-CRM",
};
const sections = [
  ["home", "Hello, I'm Shivansh"],
  ["work", "Selected work"],
  ["workbench", "Inside the process"],
  ["about", "The human"],
  ["life", "Off the clock"],
  ["journey", "The journey"],
  ["constellation", "The toolkit"],
  ["recognition", "Recognition"],
  ["ask", "Ask Shivansh"],
  ["contact", "Let’s connect"],
];
function readMotion() {
  try {
    return (
      localStorage.getItem("apex-motion-v2") !== "off" &&
      !matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  } catch {
    return false;
  }
}
function Mark() {
  return (
    <svg
      className="identity-mark"
      viewBox="0 0 44 44"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M22 10H12a7 7 0 0 0 0 14h5a6 6 0 0 1 0 12H5M23 10h17M31.5 10v26"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
function Label({
  number,
  children,
}: {
  number: string;
  children: React.ReactNode;
}) {
  return (
    <div className="section-label">
      <span>{number} /</span>
      {children}
    </div>
  );
}

export default function App() {
  const [motion, setMotion] = useState(readMotion);
  const [menu, setMenu] = useState(false);
  const [chat, setChat] = useState(false);
  const [active, setActive] = useState("home");

  const [selected, setSelected] = useState<Project | null>(null);
  const [stage, setStage] = useState(1);
  const [job, setJob] = useState(0);
  const [skill, setSkill] = useState(0);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [philosophy, setPhilosophy] = useState(0);
  const [intro, setIntro] = useState(() => readMotion());
  const [introRevealed, setIntroRevealed] = useState(false);
  useSceneScroll(motion);
  const progress = useRef<HTMLDivElement>(null);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    const mq = matchMedia("(prefers-reduced-motion: reduce)");
    const listener = () => {
      if (mq.matches) setMotion(false);
    };
    mq.addEventListener("change", listener);
    return () => mq.removeEventListener("change", listener);
  }, []);
  useEffect(() => {
    document.documentElement.dataset.motion = motion ? "on" : "off";
    try {
      localStorage.setItem("apex-motion-v2", motion ? "on" : "off");
    } catch {}
  }, [motion]);
  useEffect(() => {
    const reveal = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("revealed");
            reveal.unobserve(e.target);
          }
        }),
      { threshold: 0.12 },
    );
    document.querySelectorAll(".reveal").forEach((el) => reveal.observe(el));
    const chapterObserver = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) =>
          entry.target.classList.toggle(
            "chapter-visible",
            entry.isIntersecting,
          ),
        ),
      { rootMargin: "100px 0px", threshold: 0 },
    );
    document
      .querySelectorAll("main > section")
      .forEach((el) => chapterObserver.observe(el));
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        }),
      { rootMargin: "-15% 0px -55% 0px" },
    );
    sections.forEach(([id]) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    const onScroll = () => {
      if (progress.current)
        progress.current.style.transform = `scaleX(${scrollY / (document.documentElement.scrollHeight - innerHeight) || 0})`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    const key = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setMenu(false);
        setSelected(null);
        setChat((c) => !c);
      }
    };
    window.addEventListener("keydown", key);
    return () => {
      reveal.disconnect();
      chapterObserver.disconnect();
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", key);
      if (copyTimer.current) clearTimeout(copyTimer.current);
    };
  }, []);
  const openChat = () => {
    setMenu(false);
    setSelected(null);
    setChat(true);
  };
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setCopyError(false);
      if (copyTimer.current) clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopyError(true);
    }
  };
  const openProject = (p: Project) => {
    setStage(0);
    setSelected(p);
  };
  return (
    <>
      <div className="scroll-progress" ref={progress} />
      <div className="portfolio-shell" inert={intro}>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <header className="site-header">
          <a className="brand" href="#home" aria-label="Shivansh Thakral home">
            <Mark />
            <span>
              SHIVANSH
              <br />
              THAKRAL<span className="brand-period">•</span>
            </span>
          </a>
          <nav className="desktop-nav" aria-label="Main navigation">
            <a
              href="#work"
              aria-current={active === "work" ? "location" : undefined}
            >
              Selected work <span>03</span>
            </a>
            <a
              href="#about"
              aria-current={active === "about" ? "location" : undefined}
            >
              About me
            </a>
            <button onClick={openChat}>
              Ask Shivansh <span className="small-spark">✳</span>
            </button>
          </nav>
          <button
            className="menu-button"
            aria-label="Explore navigation"
            aria-expanded={menu}
            onClick={() => setMenu(true)}
          >
            <span>Explore</span>
            <Menu size={20} />
          </button>
        </header>
        <main id="main">
          <PersonalHero
            motion={motion}
            entering={intro && !introRevealed}
            replay={() => {
              window.scrollTo({ top: 0, behavior: "instant" });
              setIntroRevealed(false);
              setIntro(true);
            }}
            ask={openChat}
          />
          <div className="statement-strip">
            <span>INTELLIGENCE</span>
            <i>✳</i>
            <span>ENGINEERING</span>
            <i>✳</i>
            <span>IMAGINATION</span>
            <i>✳</i>
            <span>HUMAN CURIOSITY</span>
          </div>
          <section className="work section-pad" id="work">
            <div className="section-heading reveal">
              <Label number="01">SELECTED EXPLORATIONS</Label>
              <div className="heading-row">
                <h2>
                  Ideas, taken
                  <br />
                  <em>into the world.</em>
                </h2>
                <p>
                  Three explorations in making technology
                  <br className="desktop-only" /> more useful, more intelligent,
                  more human.
                </p>
              </div>
            </div>
            <div className="projects">
              {projects.map((p) => (
                <ProjectShowcase
                  key={p.id}
                  project={p}
                  explore={() => openProject(p)}
                />
              ))}
            </div>
            <a
              className="github-link"
              href={profile.github}
              target="_blank"
              rel="noreferrer"
            >
              More experiments live on GitHub <ArrowUpRight size={17} />
            </a>
          </section>
          <MakerStudio motion={motion} />
          <AboutStory />
          <LifeGallery />
          <section className="journey section-pad" id="journey">
            <div className="section-heading reveal">
              <Label number="03">LEARNING THROUGH DOING</Label>
              <div className="heading-row">
                <h2>
                  Every chapter
                  <br />
                  adds <em>perspective.</em>
                </h2>
                <p>
                  Different environments.
                  <br />
                  One instinct: understand, then build.
                </p>
              </div>
            </div>
            <div className="journey-layout">
              <JourneyNote selected={job} />
              <div className="timeline">
                {experience.map((e, i) => (
                  <article
                    className={`timeline-item ${job === i ? "expanded" : ""}`}
                    key={e.company}
                  >
                    <button
                      className="timeline-toggle"
                      onClick={() => setJob(job === i ? -1 : i)}
                      aria-expanded={job === i}
                      aria-controls={`job-${i}`}
                    >
                      <span className="timeline-year">{e.year}</span>
                      <span className="timeline-node" />
                      <span className="timeline-company">
                        <span>{e.company}</span>
                        <small>{e.role}</small>
                      </span>
                      <span className="timeline-date label">{e.date}</span>
                      {job === i ? <Minus size={21} /> : <Plus size={21} />}
                    </button>
                    <div
                      id={`job-${i}`}
                      className="timeline-details"
                      hidden={job !== i}
                    >
                      <p className="timeline-summary">{e.text}</p>
                      <ul>
                        {e.details.map((d) => (
                          <li key={d}>{d}</li>
                        ))}
                      </ul>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
          <section className="constellation section-pad" id="constellation">
            <Label number="04">A CONNECTED TOOLKIT</Label>
            <div className="constellation-layout">
              <div className="constellation-copy">
                <h2>
                  Not just tools.
                  <br />A way of <em>thinking.</em>
                </h2>
                <p className="section-description">
                  Explore the connections between the technologies and the ideas
                  they make possible.
                </p>
                <div
                  className="skill-tabs"
                  role="tablist"
                  aria-label="Technology disciplines"
                >
                  {constellations.map((s, i) => (
                    <button
                      key={s.name}
                      id={`skill-tab-${i}`}
                      role="tab"
                      aria-selected={skill === i}
                      aria-controls="skill-panel"
                      tabIndex={skill === i ? 0 : -1}
                      onKeyDown={(e) => {
                        if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                          e.preventDefault();
                          const n =
                            (skill + (e.key === "ArrowRight" ? 1 : 2)) % 3;
                          setSkill(n);
                          document.getElementById(`skill-tab-${n}`)?.focus();
                        }
                      }}
                      onClick={() => setSkill(i)}
                    >
                      <span>0{i + 1}</span>
                      {s.name}
                      <ArrowUpRight size={16} />
                    </button>
                  ))}
                </div>
                <div
                  id="skill-panel"
                  role="tabpanel"
                  aria-labelledby={`skill-tab-${skill}`}
                  className="skill-detail"
                  key={skill}
                >
                  <span className="label">
                    {constellations[skill].subtitle}
                  </span>
                  <p>{constellations[skill].description}</p>
                  <span className="skill-project">
                    IN PRACTICE / {constellations[skill].project}
                  </span>
                </div>
              </div>
              <ToolStudio
                key={skill}
                skill={skill}
                openProject={() => openProject(projects[skill])}
              />
            </div>
          </section>
          <section className="recognition section-pad" id="recognition">
            <Label number="05">MOMENTS THAT MATTER</Label>
            <div className="recognition-main reveal">
              <div className="rank">
                <span className="rank-edition label">
                  A MOMENT IN THE MAKING / ICPC TOPC
                </span>
                <span className="label">
                  ICPC TAIWAN ONLINE PROGRAMMING CONTEST
                </span>
                <div>
                  103
                  <span>
                    GLOBAL
                    <br />
                    RANK
                  </span>
                </div>
              </div>
              <div className="recognition-copy">
                <h2>
                  Curiosity,
                  <br />
                  put to <em>the test.</em>
                </h2>
                <p>
                  Milestones from a continuing pursuit
                  <br />
                  of better questions and better solutions.
                </p>
              </div>
            </div>
            <div className="awards-row">
              <div>
                <span>
                  02<sup>ND</sup>
                </span>
                <p>HackNova</p>
              </div>
              <div>
                <span>
                  03<sup>RD</sup>
                </span>
                <p>Foundathon</p>
              </div>
              <div className="sih">
                <span className="award-monogram" aria-hidden="true">
                  SIH
                </span>
                <p>
                  Smart India Hackathon
                  <small>Cleared college internal round</small>
                </p>
              </div>
            </div>
            <details className="certifications">
              <summary>
                ALSO LEARNING, ALWAYS.{" "}
                <span>
                  {certifications.length} CERTIFICATIONS <Plus size={17} />
                </span>
              </summary>
              <ul>
                {certifications.map((c) => (
                  <li key={c}>
                    {c}
                    <Check size={16} />
                  </li>
                ))}
              </ul>
            </details>
          </section>
          <section className="philosophy light-section section-pad" id="beyond">
            <Label number="06">BEYOND THE CODE</Label>
            <div className="philosophy-layout">
              <div className="philosophy-art">
                <h2 className="reveal">
                  The best part
                  <br />
                  of engineering?
                  <br />
                  <em>The possibility.</em>
                </h2>
                <CuriositySculpture chapter={philosophy} />
              </div>
              <div className="principles">
                {[
                  {
                    title: "Stay curious.",
                    text: "The most interesting work starts with a question. AI, creative development, and software architecture offer different ways to follow it.",
                  },
                  {
                    title: "Make complexity useful.",
                    text: "A model, an API, a carefully designed workflow. The goal is to connect the technical pieces to something that makes sense to the person using it.",
                  },
                  {
                    title: "Keep becoming.",
                    text: "Build, test, learn, refine. Every project is a chance to make the next one more thoughtful.",
                  },
                ].map((p, i) => (
                  <div className="principle" key={p.title}>
                    <button
                      onClick={() => setPhilosophy(philosophy === i ? -1 : i)}
                      aria-expanded={philosophy === i}
                    >
                      <span className="label">0{i + 1}</span>
                      {p.title}
                      {philosophy === i ? (
                        <Minus size={18} />
                      ) : (
                        <Plus size={18} />
                      )}
                    </button>
                    {philosophy === i && <p>{p.text}</p>}
                  </div>
                ))}
              </div>
            </div>
          </section>
          <AskPortal open={openChat} />
          <section className="contact section-pad" id="contact">
            <div className="contact-top">
              <Label number="07">THE NEXT CHAPTER</Label>
              <span className="label">
                <i className="status-dot" /> OPEN TO GOOD CONVERSATIONS
              </span>
            </div>
            <h2 className="reveal">
              Let’s build what
              <br />
              doesn’t <em>exist yet.</em>
              <a
                href={`mailto:${profile.email}`}
                className="contact-arrow"
                aria-label="Email Shivansh"
              >
                <ArrowUpRight />
              </a>
            </h2>
            <div className="contact-links">
              <div>
                <a className="email-link" href={`mailto:${profile.email}`}>
                  {profile.email}
                </a>
                <button
                  className="copy-button"
                  onClick={copy}
                  aria-label="Copy email address"
                >
                  {copied ? <Check size={18} /> : <Copy size={18} />}
                </button>
                <span className="copy-message" role="status">
                  {copied
                    ? "Email copied"
                    : copyError
                      ? "Copy unavailable. Select the email to copy it."
                      : ""}
                </span>
              </div>
              <div className="socials">
                <a href={profile.github} target="_blank" rel="noreferrer">
                  GitHub <ArrowUpRight size={16} />
                </a>
                <a href={profile.linkedin} target="_blank" rel="noreferrer">
                  LinkedIn <ArrowUpRight size={16} />
                </a>
              </div>
            </div>
            <ContactNote email={profile.email} />
            <footer>
              <a href="#home" className="footer-brand">
                <Mark /> SHIVANSH THAKRAL
              </a>
              <span>ENGINEERED WITH CURIOSITY.</span>
              <a href="#home">
                Back to the universe <ArrowUpRight size={15} />
              </a>
            </footer>
          </section>
        </main>
        <div className="utility-dock">
          <button
            className="dock-menu"
            onClick={() => setMenu(true)}
            aria-label="Explore sections"
          >
            <Menu size={17} />
          </button>
          <button
            className="motion-toggle"
            aria-label={
              motion
                ? "Motion on. Turn motion off"
                : "Motion off. Turn motion on"
            }
            aria-pressed={motion}
            onClick={() => {
              setMotion(!motion);
              setIntro(false);
            }}
          >
            {motion ? <Pause size={13} /> : <Play size={13} />}
            <span>MOTION {motion ? "ON" : "OFF"}</span>
          </button>
          <button
            className="ask-dock"
            onClick={openChat}
            aria-label="Open Ask Shivansh"
          >
            <img
              className="dock-face"
              src="/images/agent-portrait.webp"
              alt=""
              width="32"
              height="32"
            />
            <span>Ask Shivansh</span>
          </button>
        </div>
        <Dialog
          open={menu}
          onClose={() => setMenu(false)}
          title="Navigation"
          className="nav-dialog"
        >
          <div className="nav-intro">
            <Mark />
            <p className="label">
              A FEW PLACES
              <br />
              CURIOSITY CAN TAKE YOU.
            </p>
          </div>
          <nav aria-label="Explore the universe">
            {sections.map(([id, name], i) => (
              <a
                href={`#${id}`}
                key={id}
                onClick={() => setMenu(false)}
                aria-current={active === id ? "location" : undefined}
              >
                <span className="label">0{i}</span>
                <span>{name}</span>
                <ArrowUpRight />
              </a>
            ))}
          </nav>
          <div className="nav-bottom">
            <span className="label">CHENNAI, INDIA</span>
            <button onClick={openChat}>
              Or, just ask me <Send size={17} />
            </button>
          </div>
        </Dialog>
        <Explorer open={chat} onClose={() => setChat(false)} />
        <Dialog
          open={!!selected}
          onClose={() => setSelected(null)}
          title={selected?.name || "Project"}
          className={`project-dialog ${selected ? "detail-" + selected.color : ""}`}
        >
          {selected && (
            <>
              <div className="detail-visual">
                <ProjectArt project={selected} stage={stage} />
                <span className="label detail-number">
                  EXPLORATION / {selected.number}
                </span>
              </div>
              <div className="detail-copy">
                <span className="label">{selected.category}</span>
                <h2>{selected.name}</h2>
                <p className="detail-description">{selected.description}</p>
                <div
                  className="stage-tabs"
                  role="group"
                  aria-label="Explore project workflow"
                >
                  {selected.stages.map((s, i) => (
                    <button
                      aria-pressed={stage === i}
                      key={s}
                      onClick={() => setStage(i)}
                    >
                      <span>0{i + 1}</span>
                      {s}
                      <ArrowRight size={14} />
                    </button>
                  ))}
                </div>
                <p className="stage-explanation">
                  {stage === 0
                    ? selected.problem
                    : stage === 1
                      ? selected.solution
                      : `Built with ${selected.stack.join(", ")}. ${selected.note}`}
                </p>
                <div className="detail-grid">
                  <div>
                    <h3>The challenge</h3>
                    <p>{selected.problem}</p>
                  </div>
                  <div>
                    <h3>The approach</h3>
                    <p>{selected.solution}</p>
                  </div>
                </div>
                <div className="detail-stack">
                  {selected.stack.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
                <p className="detail-note">
                  {selected.note} Descriptions are grounded in the supplied
                  project brief; the linked repositories may contain newer
                  iterations. No live demo is claimed here.
                </p>
                <a
                  className="text-link repository-link"
                  href={repositories[selected.id]}
                  target="_blank"
                  rel="noreferrer"
                >
                  View repository <ArrowUpRight size={16} />
                </a>
                <br />
                <button className="text-link" onClick={openChat}>
                  Explore this work with the portfolio guide{" "}
                  <ArrowUpRight size={16} />
                </button>
              </div>
            </>
          )}
        </Dialog>
      </div>
      {intro && (
        <Entrance
          onComplete={() => setIntro(false)}
          onReveal={() => setIntroRevealed(true)}
        />
      )}
    </>
  );
}
