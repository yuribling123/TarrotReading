type SelectionShootingStarsProps = {
  count: number;
  label: string;
  isChanneling?: boolean;
};

const starPositions = [
  { left: -40, top: 18, delay: 0, size: 18, rotation: 0 },
  { left: 52, top: 18, delay: 140, size: 18, rotation: 0 },
  { left: 140, top: 18, delay: 280, size: 18, rotation: 0 },
];

function SolidFivePointStar({
  size,
  rotation,
}: {
  size: number;
  rotation: number;
}) {
  return (
    <span
      className="block text-[#b99a62] drop-shadow-[0_0_3px_rgba(185,154,98,0.34)]"
      style={{
        fontSize: `${size}px`,
        lineHeight: 1,
        transform: `rotate(${rotation}deg)`,
      }}
      aria-hidden="true"
    >
      ✦
    </span>
  );
}

export function SelectionShootingStars({
  count,
  label,
  isChanneling = false,
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
            style={{
              left: `${position.left}%`,
              top: position.top,
            }}
          >
            {/* 飞入 comet */}
            <span
              className="absolute left-1/2 top-1/2 animate-[selection-comet-arrive_1050ms_cubic-bezier(0.22,1,0.36,1)_both] motion-reduce:hidden"
              style={{
                animationDelay: `${position.delay}ms`,
              }}
            >
              <span className="absolute right-1 top-1/2 h-px w-9 -translate-y-1/2 bg-gradient-to-l from-[#c6aa70]/65 via-[#bca06b]/22 to-transparent blur-[0.3px]" />

              <span className="block size-1.5 rotate-45 bg-[#d1b77d] shadow-[0_0_8px_rgba(198,170,112,0.55)]" />
            </span>

            {/* 星星 settle 到最终位置 */}
            <span
              className="absolute left-1/2 top-1/2 animate-[selection-star-settle_1050ms_ease-out_both] motion-reduce:animate-none motion-reduce:-translate-x-1/2 motion-reduce:-translate-y-1/2 motion-reduce:opacity-100"
              style={{
                animationDelay: `${position.delay}ms`,
              }}
            >
              <span className="relative flex items-center justify-center">
                {/* 长按时释放粒子 */}
                {isChanneling && (
                  <>
                    <span
                      className="star-particle particle-purple"
                      style={{
                        animationDelay: `${index * 180}ms`,
                      }}
                    >
                      ·
                    </span>

                    <span
                      className="star-particle particle-gold"
                      style={{
                        animationDelay: `${500 + index * 180}ms`,
                      }}
                    >
                      ˚
                    </span>

                    <span
                      className="star-particle particle-cross-purple"
                      style={{
                        animationDelay: `${950 + index * 220}ms`,
                      }}
                    >
                      ✢
                    </span>

                    <span
                      className="star-particle particle-cross-gold"
                      style={{
                        animationDelay: `${1550 + index * 260}ms`,
                      }}
                    >
                      ✢
                    </span>
                  </>
                )}

                {/* 金色主星呼吸 */}
                <span
                  className={`star-core ${
                    isChanneling ? "star-core-channeling" : ""
                  }`}
                  style={{
                    animationDelay: `${index * 120}ms`,
                  }}
                >
                  <SolidFivePointStar
                    size={position.size}
                    rotation={position.rotation}
                  />
                </span>
              </span>
            </span>
          </span>
        ) : null,
      )}

      <style jsx>{`
        /* =========================
           金色主星呼吸
           ========================= */

        .star-core {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transform-origin: center;
          transition:
            transform 400ms ease,
            filter 400ms ease,
            opacity 400ms ease;
        }

        .star-core-channeling {
          animation: star-core-breathe 1.6s ease-in-out infinite;
        }

        @keyframes star-core-breathe {
          0%,
          100% {
            transform: scale(0.96);
            opacity: 0.9;
            filter:
              drop-shadow(0 0 3px rgba(198, 170, 112, 0.4))
              drop-shadow(0 0 6px rgba(185, 160, 112, 0.18));
          }

          50% {
            transform: scale(1.14);
            opacity: 1;
            filter:
              drop-shadow(0 0 5px rgba(210, 184, 132, 0.85))
              drop-shadow(0 0 10px rgba(198, 170, 112, 0.52))
              drop-shadow(0 0 16px rgba(168, 139, 88, 0.28));
          }
        }

        /* =========================
           粒子基础
           ========================= */

        .star-particle {
          position: absolute;
          z-index: 20;
          bottom: 45%;
          pointer-events: none;
          line-height: 1;
          opacity: 0;
          font-weight: 500;
        }

        /* 灰紫 · */
        .particle-purple {
          left: -1px;
          font-size: 10px;
          color: rgba(145, 123, 164, 0.95);
          text-shadow:
            0 0 4px rgba(145, 123, 164, 0.55),
            0 0 9px rgba(120, 101, 140, 0.28);
          animation: particle-left 1.8s ease-out infinite;
        }

        /* 香槟金 ˚ */
        .particle-gold {
          right: -2px;
          font-size: 10px;
          color: rgba(198, 170, 112, 0.95);
          text-shadow:
            0 0 4px rgba(198, 170, 112, 0.55),
            0 0 9px rgba(168, 139, 88, 0.28);
          animation: particle-right 1.95s ease-out infinite;
        }

        /* 灰紫 ✢ */
        .particle-cross-purple {
          left: 50%;
          font-size: 8px;
          color: rgba(145, 123, 164, 0.95);
          text-shadow:
            0 0 5px rgba(145, 123, 164, 0.55),
            0 0 11px rgba(120, 101, 140, 0.28);
          animation: particle-cross-left 2.15s ease-out infinite;
        }

        /* 香槟金 ✢ */
        .particle-cross-gold {
          left: 50%;
          font-size: 8px;
          color: rgba(198, 170, 112, 0.95);
          text-shadow:
            0 0 5px rgba(198, 170, 112, 0.55),
            0 0 11px rgba(168, 139, 88, 0.28);
          animation: particle-cross-right 2.35s ease-out infinite;
        }

        /* =========================
           紫色月尘
           ========================= */

        @keyframes particle-left {
          0% {
            transform: translate3d(0, 3px, 0) scale(0.7);
            opacity: 0;
          }

          12% {
            opacity: 1;
          }

          48% {
            transform: translate3d(-5px, -13px, 0) scale(1.25);
            opacity: 0.95;
          }

          78% {
            opacity: 0.65;
          }

          100% {
            transform: translate3d(-11px, -30px, 0) scale(1);
            opacity: 0;
          }
        }

        /* =========================
           金色月尘
           ========================= */

        @keyframes particle-right {
          0% {
            transform: translate3d(0, 3px, 0) scale(0.7);
            opacity: 0;
          }

          12% {
            opacity: 1;
          }

          48% {
            transform: translate3d(5px, -13px, 0) scale(1.25);
            opacity: 0.95;
          }

          78% {
            opacity: 0.65;
          }

          100% {
            transform: translate3d(12px, -29px, 0) scale(1);
            opacity: 0;
          }
        }

        /* =========================
           灰紫 ✢
           ========================= */

        @keyframes particle-cross-left {
          0% {
            transform: translate3d(-50%, 3px, 0) scale(0.65);
            opacity: 0;
          }

          12% {
            opacity: 1;
          }

          48% {
            transform: translate3d(calc(-50% + 7px), -15px, 0)
              scale(1.3);
            opacity: 1;
          }

          78% {
            opacity: 0.7;
          }

          100% {
            transform: translate3d(calc(-50% - 7px), -34px, 0)
              scale(0.95);
            opacity: 0;
          }
        }

        /* =========================
           香槟金 ✢
           ========================= */

        @keyframes particle-cross-right {
          0% {
            transform: translate3d(-50%, 3px, 0) scale(0.65);
            opacity: 0;
          }

          12% {
            opacity: 1;
          }

          48% {
            transform: translate3d(calc(-50% - 7px), -14px, 0)
              scale(1.3);
            opacity: 1;
          }

          78% {
            opacity: 0.7;
          }

          100% {
            transform: translate3d(calc(-50% + 8px), -32px, 0)
              scale(0.95);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}