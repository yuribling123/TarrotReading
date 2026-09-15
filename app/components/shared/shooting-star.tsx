"use client";

type ShootingStarsProps = {
  active: boolean;
};

const shootingStars = [
  { top: "8%", left: "28%", width: "110px", delay: "0ms", duration: "5500ms", opacity: 0.7 },
  { top: "18%", left: "42%", width: "75px", delay: "200ms", duration: "4000ms", opacity: 0.45 },
  { top: "30%", left: "68%", width: "145px", delay: "400ms", duration: "3500ms", opacity: 0.8 },


  { top: "40%", left: "76%", width: "80px", delay: "1350ms", duration: "4500ms", opacity: 0.45 },
];
export function ShootingStars({
  active,
}: ShootingStarsProps) {
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
      <span className="absolute left-0 top-1/2 size-1 -translate-y-1/2 rounded-full bg-[#f2e6c7] shadow-[0_0_7px_2px_rgba(224,201,147,0.5)]" />

<span className="absolute inset-0 bg-gradient-to-r from-[#ead9ae]/75 via-[#cbb2d3]/30 to-transparent" />
        </span>
      ))}
    </div>
  );
}