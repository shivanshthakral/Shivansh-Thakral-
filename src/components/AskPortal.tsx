import { ArrowUpRight } from "lucide-react";
export default function AskPortal({ open }: { open: () => void }) {
  return (
    <section id="ask" className="ask-portal section-pad">
      <div className="portal-portrait reveal">
        <div className="portal-frame">
          <img
            src="/images/agent-portrait.webp"
            alt="Illustrated portrait of Shivansh, your portfolio guide"
            loading="lazy"
            width="512"
            height="512"
          />
          <span className="portal-status">
            <i />
            YOUR PORTFOLIO GUIDE
          </span>
        </div>
        <span className="portal-handwriting">
          A familiar face.
          <br />A different conversation.
        </span>
      </div>
      <div className="portal-copy reveal">
        <div className="section-label">
          <span>ASK /</span>FOLLOW YOUR CURIOSITY
        </div>
        <h2>
          You’ve seen the work.
          <br />
          <em>Now ask the questions.</em>
        </h2>
        <p>
          How does HealthPredict work? What did I do at Espire? Get to know the
          projects, the technologies, and the person behind them — one question
          at a time.
        </p>
        <button className="portal-button" onClick={open}>
          Ask Shivansh <ArrowUpRight size={25} />
        </button>
        <span className="portal-disclosure">
          A CONVERSATION, POWERED BY GEMINI
          <br />
          Ask naturally. Follow the thought. Keep the conversation going.
        </span>
      </div>
    </section>
  );
}
