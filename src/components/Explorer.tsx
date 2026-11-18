import { useState, useRef, useEffect } from "react";
import { ArrowUp, ArrowUpRight, Sparkles } from "lucide-react";
import { explore } from "../explorer.mjs";
import Dialog from "./Dialog";
type Answer = { title: string; text: string; href?: string; label?: string };
const prompts = [
  "What has Shivansh built?",
  "Explain HealthPredict AI",
  "His experience at Espire",
  "Which technologies?",
];
export default function Explorer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ q: string; a: Answer }[]>([]);
  const end = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open || !window.visualViewport) return;
    const viewport = window.visualViewport;
    const update = () => {
      document.documentElement.style.setProperty(
        "--chat-height",
        `${viewport.height}px`,
      );
      document.documentElement.style.setProperty(
        "--chat-top",
        `${viewport.offsetTop}px`,
      );
    };
    update();
    viewport.addEventListener("resize", update);
    viewport.addEventListener("scroll", update);
    return () => {
      viewport.removeEventListener("resize", update);
      viewport.removeEventListener("scroll", update);
      document.documentElement.style.removeProperty("--chat-height");
      document.documentElement.style.removeProperty("--chat-top");
    };
  }, [open]);
  useEffect(() => {
    end.current?.scrollIntoView({ block: "nearest" });
  }, [messages]);
  const ask = (q: string) => {
    if (!q.trim()) return;
    setMessages((m) => [
      ...m.slice(-19),
      { q: q.trim().slice(0, 500), a: explore(q) },
    ]);
    setInput("");
  };
  return (
    <Dialog
      open={open}
      onClose={onClose}
      title="Ask Shivansh"
      className="explorer-dialog"
    >
      <header className="explorer-head">
        <div className="label">
          <span className="status-dot" /> THE INTELLIGENCE LAYER
        </div>
        <h2>
          Ask <em>Shivansh.</em>
        </h2>
        <p>Explore the work. Follow your curiosity.</p>
        <span className="local-badge">
          On-device portfolio explorer · No AI provider connected
        </span>
      </header>
      <div
        className="conversation"
        role="log"
        aria-label="Portfolio conversation"
        aria-live="polite"
      >
        {messages.length === 0 ? (
          <div className="chat-welcome">
            <Sparkles size={30} />
            <h3>A different way to get to know me.</h3>
            <p>
              Search the facts behind the projects, technologies, and journey.
              Answers come from the supplied portfolio, right here on your
              device.
            </p>
            <div className="prompt-grid">
              {prompts.map((p) => (
                <button key={p} onClick={() => ask(p)}>
                  {p}
                  <ArrowUpRight size={16} />
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((m, i) => (
            <div className="exchange" key={i}>
              <p className="question">{m.q}</p>
              <div className="answer">
                <span className="label">ST / PORTFOLIO KNOWLEDGE</span>
                <h3>{m.a.title}</h3>
                <p>{m.a.text}</p>
                {m.a.href && (
                  <a href={m.a.href} onClick={onClose}>
                    {m.a.label}
                    <ArrowUpRight size={15} />
                  </a>
                )}
              </div>
            </div>
          ))
        )}
        <div ref={end} />
      </div>
      <form
        className="chat-form"
        onSubmit={(e) => {
          e.preventDefault();
          ask(input);
        }}
      >
        <label className="sr-only" htmlFor="ask-input">
          Ask about Shivansh
        </label>
        <input
          id="ask-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          maxLength={500}
          placeholder="Ask about a project, skill, or experience…"
          autoComplete="off"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          aria-label="Send question"
        >
          <ArrowUp size={20} />
        </button>
      </form>
      <p className="chat-footnote">
        Fact-based search, not generative AI. Your questions stay in this
        browser session.
      </p>
    </Dialog>
  );
}
