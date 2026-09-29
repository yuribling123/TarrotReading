type StarKind = "far" | "middle" | "anchor";
type Drift = "still" | "left" | "right";
type Tone = "gold" | "moon" | "violet";

type Star = {
  index: number;
  x: number;
  y: number;
  kind: StarKind;
  drift: Drift;
  tone: Tone;
  opacity: number;
  twinkles: boolean;
  delay: number;
  duration: number;
};

const pointClasses: Record<Exclude<StarKind, "anchor">, string> = {
  far: "size-px",
  middle: "size-0.5",
};

const pointToneClasses: Record<Tone, string> = {
  gold: "bg-[#d7b56d]",
  moon: "bg-[#f7efe3]",
  violet: "bg-[#d7c5e7]",
};

const anchorToneClasses: Record<Tone, string> = {
  gold: "text-[#d7b56d]",
  moon: "text-[#f7efe3]",
  violet: "text-[#d7c5e7]",
};

const driftClasses: Record<Drift, string> = {
  still: "",
  left: "animate-[starfield-drift-left_19s_ease-in-out_infinite_alternate] motion-reduce:animate-none",
  right: "animate-[starfield-drift-right_23s_ease-in-out_infinite_alternate] motion-reduce:animate-none",
};

function createStars(): Star[] {
  // A fixed seed keeps positions stable across renders and hydration.
  let seed = 2928;
  const next = () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  return Array.from({ length: 108 }, (_, index) => {
    const kind: StarKind = index < 72 ? "far" : index < 100 ? "middle" : "anchor";
    const side = next();
    const x = kind === "anchor"
      ? side < 0.5 ? 6 + next() * 22 : 72 + next() * 22
      : side * 100;

    return {
      index,
      x,
      y: next() * 100,
      kind,
      drift: kind === "middle" ? index % 2 === 0 ? "left" : "right" : "still",
      tone: index === 103 || index % 17 === 0 ? "gold" : index % 3 === 0 ? "violet" : "moon",
      opacity: kind === "far" ? 0.3 + next() * 0.2 : kind === "middle" ? 0.55 + next() * 0.2 : 0.78 + next() * 0.17,
      twinkles: kind === "anchor" || (kind === "middle" && index % 3 === 0),
      delay: next() * -7,
      duration: 4 + next() * 3,
    };
  });
}

const stars = createStars();
const stillStars = stars.filter((star) => star.drift === "still");
const leftStars = stars.filter((star) => star.drift === "left");
const rightStars = stars.filter((star) => star.drift === "right");

function StarLayer({ items, drift }: { items: Star[]; drift: Drift }) {
  return (
    <div className={`absolute inset-0 ${driftClasses[drift]}`}>
      {items.map((star) => (
        <span
          key={star.index}
          className={`absolute -translate-x-1/2 -translate-y-1/2 ${star.kind === "anchor" ? `size-3.5 ${anchorToneClasses[star.tone]}` : `rounded-full ${pointClasses[star.kind]} ${pointToneClasses[star.tone]}`} ${star.twinkles ? "animate-[starfield-twinkle_5s_ease-in-out_infinite] motion-reduce:animate-none" : ""} ${star.index % 4 === 0 ? "max-sm:hidden" : ""}`}
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            opacity: star.opacity,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
          }}
        >
          {star.kind === "anchor" && (
            <svg className="size-full drop-shadow-[0_0_5px_rgba(247,239,227,0.45)]" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="0.65" strokeLinecap="round" opacity="0.7" />
              <circle cx="7" cy="7" r="1.5" fill="currentColor" />
            </svg>
          )}
        </span>
      ))}
    </div>
  );
}

export function StarfieldBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <StarLayer items={stillStars} drift="still" />
      <StarLayer items={leftStars} drift="left" />
      <StarLayer items={rightStars} drift="right" />
    </div>
  );
}
