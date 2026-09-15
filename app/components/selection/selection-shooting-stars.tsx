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
      className="block text-[#c89b45] drop-shadow-[0_0_3px_rgba(200,155,69,0.36)]"
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
            {/* 原本飞进来的 comet */}
            <span
              className="absolute left-1/2 top-1/2 animate-[selection-comet-arrive_1050ms_cubic-bezier(0.22,1,0.36,1)_both] motion-reduce:hidden"
              style={{
                animationDelay: `${position.delay}ms`,
              }}
            >
              <span className="absolute right-1 top-1/2 h-px w-9 -translate-y-1/2 bg-gradient-to-l from-[#dbb760]/70 via-[#d6b25f]/24 to-transparent blur-[0.3px]" />

              <span className="block size-1.5 rotate-45 bg-[#e1c276] shadow-[0_0_8px_rgba(218,181,96,0.72)]" />
            </span>

            {/* 星星 settle 到最终位置 */}
            <span
              className="absolute left-1/2 top-1/2 animate-[selection-star-settle_1050ms_ease-out_both] motion-reduce:animate-none motion-reduce:-translate-x-1/2 motion-reduce:-translate-y-1/2 motion-reduce:opacity-100"
              style={{
                animationDelay: `${position.delay}ms`,
              }}
            >
              {/*
                这一层负责：
                1. 周围粒子
                2. 主星呼吸

                外层 settle 动画不动，
                所以不会和呼吸的 transform 打架。
              */}
              <span className="relative flex items-center justify-center">
                {/* 长按时释放粒子 */}
                {isChanneling && (
                  <>
                    {/* 紫色月尘 */}
                    <span
                      className="star-particle particle-purple"
                      style={{
                        animationDelay: `${index * 180}ms`,
                      }}
                    >
                      ·
                    </span>

                    {/* 金色月尘 */}
                    <span
                      className="star-particle particle-gold"
                      style={{
                        animationDelay: `${500 + index * 180}ms`,
                      }}
                    >
                      ˚
                    </span>

                    {/* 紫色十字碎光 */}
                    <span
                      className="star-particle particle-cross-purple"
                      style={{
                        animationDelay: `${950 + index * 220}ms`,
                      }}
                    >
                      ✢
                    </span>

                    {/* 金色十字碎光 */}
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
                  className={`star-core ${isChanneling ? "star-core-channeling" : ""
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
        drop-shadow(0 0 3px rgba(200, 155, 69, 0.45))
        drop-shadow(0 0 6px rgba(225, 187, 101, 0.2));
    }

    50% {
      transform: scale(1.14);
      opacity: 1;
      filter:
        drop-shadow(0 0 5px rgba(245, 207, 116, 0.95))
        drop-shadow(0 0 10px rgba(227, 179, 78, 0.72))
        drop-shadow(0 0 16px rgba(205, 151, 48, 0.42));
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

  /* 紫色 · */
  .particle-purple {
    left: -1px;
    font-size: 10px;
    color: rgba(178, 137, 207, 1);
    text-shadow:
      0 0 4px rgba(178, 137, 207, 0.95),
      0 0 9px rgba(166, 127, 194, 0.55);
    animation: particle-left 1.8s ease-out infinite;
  }

  /* 金色 ˚ */
  .particle-gold {
    right: -2px;
    font-size: 10px;
    color: rgba(235, 193, 99, 1);
    text-shadow:
      0 0 4px rgba(235, 193, 99, 0.95),
      0 0 9px rgba(211, 165, 77, 0.55);
    animation: particle-right 1.95s ease-out infinite;
  }

  /* 紫色 ✢ */
  .particle-cross-purple {
    left: 50%;
    font-size: 8px;
    color: rgba(145, 123, 164, 0.95);
    text-shadow:
      0 0 5px rgba(145, 123, 164, 0.55),
      0 0 11px rgba(120, 101, 140, 0.28);
    animation: particle-cross-left 2.15s ease-out infinite;
  }

  /* 金色 ✢ */
  .particle-cross-gold {
    left: 50%;
    font-size: 8px;
    color: rgba(230, 181, 82, 1);
    text-shadow:
      0 0 5px rgba(230, 181, 82, 0.95),
      0 0 11px rgba(205, 151, 48, 0.58);
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
     紫色 ✢
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
     金色 ✢
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