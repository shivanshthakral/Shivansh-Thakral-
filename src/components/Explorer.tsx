import { useState, useRef, useEffect } from "react";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { explore } from "../explorer.mjs";
import Dialog from "./Dialog";
type Answer = { title: string; text: string; href?: string; label?: string };
type Exchange = { q: string; a: Answer; source: "loading" | "ai" | "local" };
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
  const [messages, setMessages] = useState<Exchange[]>([]);
  const [pending, setPending] = useState(false);
  const request = useRef<AbortController | null>(null);
  useEffect(() => () => request.current?.abort(), []);
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
  const ask = async (q: string) => {
    if (!q.trim() || request.current) return;
    const question = q.trim().slice(0, 500);
    const controller = new AbortController();
    request.current = controller;
    setPending(true);
    const history = messages.slice(-5).flatMap((m) => [
      { role: "user", text: m.q },
      { role: "model", text: m.a.text.slice(0, 3000) },
    ]);
    setMessages((m) => [
      ...m.slice(-19),
      {
        q: question,
        a: { title: "Let’s talk.", text: "Thinking…" },
        source: "loading",
      },
    ]);
    setInput("");
    const update = (a: Answer, source: Exchange["source"]) =>
      setMessages((m) => [...m.slice(0, -1), { q: question, a, source }]);
    let text = "";
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...history, { role: "user", text: question }],
        }),
        signal: controller.signal,
      });
      if (
        !response.ok ||
        !response.body ||
        !response.headers.get("content-type")?.includes("application/x-ndjson")
      )
        throw new Error("Unavailable");
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let done = false;
      while (!done) {
        const part = await reader.read();
        if (part.done) break;
        buffer += decoder.decode(part.value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";
        for (const line of lines) {
          if (!line.trim()) continue;
          const event = JSON.parse(line);
          if (event.error) throw new Error("Interrupted");
          if (event.text) {
            text += event.text;
            update({ title: "A little more about Shivansh.", text }, "ai");
          }
          if (event.done) done = true;
        }
      }
      if (!done || !text) throw new Error("Incomplete");
    } catch {
      if (text)
        update(
          {
            title: "Connection interrupted",
            text: `${text}\n\nThe connection paused. Please try your question again.`,
          },
          "ai",
        );
      else
        update(
          { ...explore(question), title: "AI unavailable · Portfolio facts" },
          "local",
        );
    } finally {
      request.current = null;
      setPending(false);
    }
  };
  return (
    <Dialog
      open={open}
      onClose={onClose}
      title="Ask Shivansh"
      className="explorer-dialog"
    >
      <header className="explorer-head">
        <img
          className="agent-avatar"
          src="/images/agent-portrait.webp"
          alt="Illustrated portrait of Shivansh"
          width="72"
          height="72"
        />
        <div className="label">
          <span className="status-dot" /> YOUR PORTFOLIO GUIDE
        </div>
        <h2>
          Ask <em>Shivansh.</em>
        </h2>
        <p>Explore the work. Follow your curiosity.</p>
        <span className="local-badge">AI conversation · Powered by Gemini</span>
      </header>
      <div
        className="conversation"
        role="log"
        tabIndex={0}
        aria-label="Portfolio conversation"
        aria-live="polite"
        aria-busy={pending}
      >
        {messages.length === 0 ? (
          <div className="chat-welcome">
            <span className="agent-greeting">Hello, curious human.</span>
            <h3>A different way to get to know me.</h3>
            <p>
              Ask about the projects, technologies, and journey. Follow up,
              compare ideas, or ask for an explanation in your own words.
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
                <span className="label">
                  {m.source === "local"
                    ? "ST / VERIFIED PORTFOLIO FACTS"
                    : m.source === "loading"
                      ? "ST / THINKING"
                      : "ST / AI PORTFOLIO GUIDE"}
                </span>
                <h3>{m.a.title}</h3>
                <p style={{ whiteSpace: "pre-wrap" }}>{m.a.text}</p>
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
          disabled={!input.trim() || pending}
          aria-label="Send question"
        >
          <ArrowUp size={20} />
        </button>
      </form>
      <p className="chat-footnote">
        AI can make mistakes. Your questions and recent replies are sent to
        Google Gemini. This site does not save your conversation.
      </p>
    </Dialog>
  );
}
