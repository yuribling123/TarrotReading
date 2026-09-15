"use client";

type ShootingStarsProps = {
  active: boolean;
};
const shootingStars = [
  {
    top: "13%",
    left: "-5%",
    width: "55px",
    delay: "0ms",
    duration: "10000ms",
    opacity: 1,
  },
  {
    top: "15%",
    left: "18%",
    width: "55px",
    delay: "-1200ms",
    duration: "10000ms",
    opacity: 1,
  },
  {
    top: "10%",
    left: "10%",
    width: "55px",
    delay: "-2200ms",
    duration: "10000ms",
    opacity: 1,
  },
  {
    top: "12%",
    left: "0%",
    width: "55px",
    delay: "-2600ms",
    duration: "10000ms",
    opacity: 1,
  },
  {
    top: "10%",
    left: "25%",
    width: "55px",
    delay: "-3200ms",
    duration: "10000ms",
    opacity: 1,
  },
  {
    top: "15%",
    left: "7%",
    width: "55px",
    delay: "-4200ms",
    duration: "10000ms",
    opacity: 1,
  },
];

export function ShootingStars({ active }: ShootingStarsProps) {
  if (!active) {
    return null;
  }

  return (
    <div
      className="pointer-events-none absolute inset-0 z-10 overflow-hidden"
      aria-hidden="true"
    >
      {shootingStars.map((star, index) => (
        <span
          key={index}
          className="selection-shooting-star absolute block h-px origin-right"
          style={{
            top: star.top,
            left: star.left,
            width: star.width,
            opacity: star.opacity,
            animationDelay: star.delay,
            animationDuration: star.duration,
          }}
        >
          {/* Tail */}
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-[#cbb2d3]/30 to-[#ead9ae]/75" />

          {/* Five-point star */}
          <span
            className="
    absolute right-0 top-1/2 z-100
    -translate-y-1/2 translate-x-1/2
    text-[8px] leading-none
    text-[#f2e6c7]
    drop-shadow-[0_0_5px_rgba(224,201,147,0.7)]
  "
          >
            ★
          </span>
        </span>
      ))}
    </div>
  );
}