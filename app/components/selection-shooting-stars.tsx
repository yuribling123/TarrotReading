type SelectionShootingStarsProps = {
  count: number;
  label: string;
};

const starPositions = [
  { left: 20, top: 18, delay: 0, size: 12, rotation: 0 },
  { left: 50, top: 18, delay: 30, size: 12, rotation: 0 },
  { left: 80, top: 18, delay: 60, size: 12, rotation: 0 },
];

function SolidFivePointStar({
  size,
  rotation,
}: {
  size: number;
  rotation: number;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className="overflow-visible drop-shadow-[0_0_4px_rgba(200,155,69,0.48)]"
      style={{ transform: `rotate(${rotation}deg)` }}
      aria-hidden="true"
    >
      <path
        d="M12 1.8 15.05 8.17 22 9.12 16.95 13.92 18.2 20.8 12 17.5 5.8 20.8 7.05 13.92 2 9.12 8.95 8.17 12 1.8Z"
        fill="#c89b45"
      />
    </svg>
  );
}

export function SelectionShootingStars({
  count,
  label,
}: SelectionShootingStarsProps) {
  return (
    <div
      className="relative h-10 w-32 animate-in fade-in duration-300"
      aria-label={label}
    >
      {starPositions.map((position, index) =>
        index < count ? (
          <span
            key={index}
            aria-hidden="true"
            className="absolute"
            style={{ left: `${position.left}%`, top: position.top }}
          >
            <span
              className="absolute left-1/2 top-1/2 animate-[selection-comet-arrive_1050ms_cubic-bezier(0.22,1,0.36,1)_both] motion-reduce:hidden"
              style={{ animationDelay: `${position.delay}ms` }}
            >
              <span className="absolute right-1 top-1/2 h-px w-9 -translate-y-1/2 bg-gradient-to-l from-[#dbb760]/70 via-[#d6b25f]/24 to-transparent blur-[0.3px]" />
              <span className="block size-1.5 rotate-45 bg-[#e1c276] shadow-[0_0_8px_rgba(218,181,96,0.72)]" />
            </span>

            <span
              className="absolute left-1/2 top-1/2 animate-[selection-star-settle_1050ms_ease-out_both] motion-reduce:animate-none motion-reduce:-translate-x-1/2 motion-reduce:-translate-y-1/2 motion-reduce:opacity-100"
            >
              <SolidFivePointStar
                size={position.size}
                rotation={position.rotation}
              />
            </span>
          </span>
        ) : null,
      )}
    </div>
  );
}
