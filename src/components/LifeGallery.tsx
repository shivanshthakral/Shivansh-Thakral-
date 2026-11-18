import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Maximize2 } from "lucide-react";
import Dialog from "./Dialog";

const moments = [
  {
    src: "off-duty.webp",
    title: "A change of scenery.",
    note: "Away from the screen",
    alt: "Shivansh in sunglasses and a basketball jersey on a leafy terrace",
  },
  {
    src: "adventure.webp",
    title: "Take the scenic route.",
    note: "A little adventure",
    alt: "Shivansh driving a red quad bike through a muddy forest trail",
  },
  {
    src: "yellow-shirt.webp",
    title: "A little more colour.",
    note: "Everyday, unfiltered",
    alt: "Shivansh taking a mirror photo wearing a textured yellow shirt",
  },
  {
    src: "suit.webp",
    title: "A different kind of build.",
    note: "Dressed for the occasion",
    alt: "Shivansh in a dark suit and glasses taking a mirror portrait",
  },
];
export default function LifeGallery() {
  const [current, setCurrent] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const down = useRef(0);
  const swiped = useRef(false);
  const go = (direction: number) =>
    setCurrent((i) => (i + direction + moments.length) % moments.length);
  return (
    <section id="life" className="life-section section-pad">
      <div className="life-copy reveal">
        <div className="section-label">
          <span>PERSONAL /</span> THE OTHER SIDE OF THE SCREEN
        </div>
        <h2>
          There’s a whole
          <br />
          <em>human here.</em>
        </h2>
        <p>
          Projects tell you what I build.
          <br />
          These are a few moments in between.
        </p>
        <span className="life-scribble">
          Not everything needs
          <br />a commit message. ↗
        </span>
        <div className="life-selector">
          <button aria-label="Previous photo" onClick={() => go(-1)}>
            <ArrowLeft size={20} />
          </button>
          <span aria-live="polite">0{current + 1} / 04</span>
          <button aria-label="Next photo" onClick={() => go(1)}>
            <ArrowRight size={20} />
          </button>
        </div>
        <p className="life-hint">SWIPE THE PHOTOS. EXPLORE THE MOMENTS.</p>
      </div>
      <div
        className="life-stage reveal"
        onPointerDown={(e) => {
          down.current = e.clientX;
          swiped.current = false;
        }}
        onPointerUp={(e) => {
          const d = e.clientX - down.current;
          if (Math.abs(d) > 45) {
            swiped.current = true;
            go(d < 0 ? 1 : -1);
          }
        }}
      >
        <div className="photo-stack">
          {moments.map((m, i) => {
            const rank = (i - current + moments.length) % moments.length;
            return (
              <button
                key={m.src}
                className="photo-print"
                data-rank={rank}
                tabIndex={rank === 0 ? 0 : -1}
                aria-hidden={rank !== 0}
                aria-label={`Enlarge photo: ${m.note}`}
                onClick={() => {
                  if (rank === 0 && !swiped.current) setExpanded(true);
                  swiped.current = false;
                }}
              >
                <img
                  src={`/photos/${m.src}`}
                  alt={m.alt}
                  loading="lazy"
                  draggable={false}
                />
                <span className="photo-caption">
                  <span>{m.note}</span>
                  <Maximize2 size={15} />
                </span>
              </button>
            );
          })}
        </div>
        <div className="life-caption" aria-live="polite">
          <span>FROM MY CAMERA ROLL</span>
          <h3>{moments[current].title}</h3>
        </div>
      </div>
      <Dialog
        open={expanded}
        onClose={() => setExpanded(false)}
        title="Personal photograph"
        className="photo-dialog"
      >
        <img
          src={`/photos/${moments[current].src}`}
          alt={moments[current].alt}
        />
        <p>{moments[current].note}</p>
        <div className="photo-dialog-controls">
          <button onClick={() => go(-1)} aria-label="Previous enlarged photo">
            <ArrowLeft />
          </button>
          <button onClick={() => go(1)} aria-label="Next enlarged photo">
            <ArrowRight />
          </button>
        </div>
      </Dialog>
    </section>
  );
}
