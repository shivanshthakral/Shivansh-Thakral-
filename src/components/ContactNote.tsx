import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
const topics = ["A project idea", "An opportunity", "Just saying hello"];
export default function ContactNote({ email }: { email: string }) {
  const [topic, setTopic] = useState(0);
  const [note, setNote] = useState("");
  return (
    <div className="contact-note">
      <div className="note-intro">
        <span className="label">EVERY GOOD THING STARTS SOMEWHERE.</span>
        <h3>
          One idea.
          <br />
          <em>One conversation.</em>
        </h3>
        <p>
          A little context goes a long way.
          <br />
          Leave the first line here.
        </p>
        <span className="note-signature" aria-hidden="true">
          Shivansh.
        </span>
      </div>
      <div className="note-paper">
        <div className="note-address">
          <span>TO / SHIVANSH THAKRAL</span>
          <span className="note-stamp" aria-hidden="true">
            ST
            <br />
            <small>LET’S TALK</small>
          </span>
        </div>
        <div
          className="note-topics"
          role="group"
          aria-label="Conversation topic"
        >
          {topics.map((t, i) => (
            <button
              key={t}
              type="button"
              aria-pressed={topic === i}
              onClick={() => setTopic(i)}
            >
              {t}
            </button>
          ))}
        </div>
        <label htmlFor="conversation-note">What’s on your mind?</label>
        <textarea
          id="conversation-note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          maxLength={1500}
          rows={3}
          placeholder="I’ve been thinking about…"
        />
        <div className="note-send">
          <span>
            Opens your email app.
            <br />
            Nothing is sent from this website.
          </span>
          <a
            href={`mailto:${email}?subject=${encodeURIComponent(topics[topic])}&body=${encodeURIComponent(`Hi Shivansh,\n\n${note.trim()}\n\n`)}`}
          >
            Let’s talk <ArrowUpRight size={19} />
          </a>
        </div>
      </div>
    </div>
  );
}
