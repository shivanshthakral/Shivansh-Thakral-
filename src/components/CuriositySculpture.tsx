export default function CuriositySculpture({ chapter }: { chapter: number }) {
  return (
    <div
      className={`curiosity-sculpture sculpture-${Math.max(0, chapter)}`}
      aria-hidden="true"
    >
      <div className="sculpture-shadow" />
      <div className="sculpture-ribbon ribbon-a" />
      <div className="sculpture-ribbon ribbon-b" />
      <div className="sculpture-ribbon ribbon-c" />
      <span className="sculpture-caption">
        {
          [
            "A QUESTION OPENS A DOOR.",
            "THE PIECES FIND THEIR PLACE.",
            "THERE IS ALWAYS A NEXT CHAPTER.",
          ][Math.max(0, chapter)]
        }
      </span>
    </div>
  );
}
