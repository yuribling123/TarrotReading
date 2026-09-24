"use client";

import { useEffect, useId, useRef, useState } from "react";

type HoldToRevealButtonProps = {
  onComplete: () => void;
  label?: string;
  holdDuration?: number;
  onHoldingChange?: (value: boolean) => void;
};

const INITIAL_PROGRESS = 0.1;

export function HoldToRevealButton({
  onHoldingChange,
  onComplete,
  label = "长按 · 唤醒星辰",
  holdDuration = 1800,
}: HoldToRevealButtonProps) {
  const [progress, setProgress] = useState(INITIAL_PROGRESS);
  const [isHolding, setIsHolding] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const gradientId = useId().replace(/:/g, "");

  const progressRef = useRef(INITIAL_PROGRESS);
  const animationRef = useRef<number | null>(null);
  const lastFrameRef = useRef<number | null>(null);
  const completeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const stopHolding = () => {
    setIsHolding(false);
    onHoldingChange?.(false);
    lastFrameRef.current = null;

    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  };

  const finish = () => {
    progressRef.current = 1;

    setProgress(1);
    setIsHolding(false);
    setIsComplete(true);
    onHoldingChange?.(false);

    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }

    completeTimerRef.current = setTimeout(() => {
      onComplete();
    }, 1000);
  };

  const animate = (time: number) => {
    if (lastFrameRef.current === null) {
      lastFrameRef.current = time;
    }

    const delta = time - lastFrameRef.current;
    lastFrameRef.current = time;

    const nextProgress = Math.min(
      1,
      progressRef.current + delta / holdDuration,
    );

    progressRef.current = nextProgress;
    setProgress(nextProgress);

    if (nextProgress >= 1) {
      finish();
      return;
    }

    animationRef.current = requestAnimationFrame(animate);
  };

  const startHolding = () => {
    if (isComplete || animationRef.current !== null) return;

    setIsHolding(true);
    onHoldingChange?.(true);
    lastFrameRef.current = null;

    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }

      if (completeTimerRef.current !== null) {
        clearTimeout(completeTimerRef.current);
      }
    };
  }, []);

  return (
    <div className="hold-reveal-enter flex flex-col items-center gap-2 pt-6">
      <div className="relative flex size-[72px] items-center justify-center">
        {/* ==================================================
            外围月晕
            ================================================== */}
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute size-[70px] rounded-full bg-[radial-gradient(circle,rgba(215,181,109,0.20)_0%,rgba(158,99,129,0.07)_43%,transparent_72%)] blur-[8px] transition-all duration-500 ${
            isHolding
              ? "scale-115 opacity-100"
              : progress > INITIAL_PROGRESS
                ? "scale-105 opacity-65"
                : "scale-95 opacity-35"
          }`}
        />

        {/* ==================================================
            长按时向外扩散的能量环
            ================================================== */}
        {isHolding && !isComplete && (
          <>
            <span
              aria-hidden="true"
              className="energy-ring pointer-events-none absolute size-[60px] rounded-full border border-[#d7b56d]/28"
            />

            <span
              aria-hidden="true"
              className="energy-ring energy-ring-delay pointer-events-none absolute size-[60px] rounded-full border border-[#b99ac8]/18"
            />
          </>
        )}

        {/* ==================================================
            外侧细金环
            首次出现时从 0.85 展开到 1
            ================================================== */}
        <span
          aria-hidden="true"
          className={`moon-ring-enter pointer-events-none absolute size-[63px] rounded-full border transition-[border-color,box-shadow] duration-500 ${
            isHolding
              ? "border-[#c99d4f]/48 shadow-[0_0_9px_rgba(201,157,79,0.10)]"
              : "border-[#d7b56d]/25"
          }`}
        />

        {/* ==================================================
            水面冒出的粒子
            ================================================== */}
        {isHolding && progress < 1 && (
          <div className="pointer-events-none absolute left-1/2 top-1/2 z-30 size-[56px] -translate-x-1/2 -translate-y-1/2 overflow-visible">
            <div
              className="absolute inset-x-0"
              style={{
                bottom: `${Math.min(progress * 56, 51)}px`,
              }}
            >
              <span className="floating-particle bubble-purple float-left" />

              <span className="floating-particle bubble-gold float-right" />

              <span className="floating-symbol star-purple float-left">
                ✧
              </span>

              <span className="moon-dust dust-purple">·</span>
              <span className="moon-dust dust-gold">˚</span>
              <span className="moon-dust dust-soft-purple">·</span>
            </div>
          </div>
        )}

        {/* ==================================================
            主按钮 / 月池
            ================================================== */}
        <button
          type="button"
          aria-label={label}
          onPointerDown={(event) => {
            if (event.button !== 0) return;

            event.currentTarget.setPointerCapture(event.pointerId);
            startHolding();
          }}
          onPointerUp={stopHolding}
          onPointerCancel={stopHolding}
          onLostPointerCapture={stopHolding}
          onContextMenu={(event) => event.preventDefault()}
          className={`relative z-10 size-[56px] touch-none select-none overflow-hidden rounded-full border outline-none transition-[transform,border-color,box-shadow] duration-300 ${
            isComplete
              ? "scale-100 border-[#b88938]/75 shadow-[0_0_20px_rgba(201,154,69,0.25),0_5px_15px_rgba(106,76,30,0.08)]"
              : isHolding
                ? "scale-[0.96] border-[#b98b3e]/75 shadow-[0_0_0_3px_rgba(215,181,109,0.07),0_0_20px_rgba(188,143,67,0.18),0_4px_12px_rgba(106,76,30,0.07)]"
                : "border-[#c9a45a]/55 shadow-[0_5px_15px_rgba(106,76,30,0.08)]"
          }`}
        >
          {/* 暖白月池底色 */}
          <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_40%_28%,#fffefa_0%,#fffaf1_50%,#f6ecdf_100%)]" />

          {/* ==================================================
              水体
              ================================================== */}
          <span
            aria-hidden="true"
            className={`absolute inset-x-0 bottom-0 transition-opacity duration-300 ${
              progress > 0 ? "opacity-100" : "opacity-0"
            }`}
            style={{
              height: `${progress * 100}%`,
            }}
          >
            {/* 主水体 */}
            <svg
              viewBox="0 0 240 120"
              preserveAspectRatio="none"
              className={`water-body pointer-events-none absolute -top-[7px] left-0 h-[calc(100%+7px)] w-[200%] ${
                isHolding ? "water-body-holding" : ""
              }`}
            >
              <defs>
                <linearGradient
                  id={gradientId}
                  gradientUnits="userSpaceOnUse"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="120"
                >
                  <stop
                    offset="0%"
                    stopColor="#fff1c9"
                    stopOpacity="0.96"
                  />

                  <stop
                    offset="16%"
                    stopColor="#f6dfaa"
                    stopOpacity="0.86"
                  />

                  <stop
                    offset="36%"
                    stopColor="#ebcb84"
                    stopOpacity="0.76"
                  />

                  <stop
                    offset="58%"
                    stopColor="#dcb05d"
                    stopOpacity="0.72"
                  />

                  <stop
                    offset="80%"
                    stopColor="#c8923c"
                    stopOpacity="0.78"
                  />

                  <stop
                    offset="100%"
                    stopColor="#aa6d20"
                    stopOpacity="0.88"
                  />
                </linearGradient>
              </defs>

              <path
                d="
                  M0 10
                  C10 5 20 5 30 10
                  C40 15 50 15 60 10
                  C70 5 80 5 90 10
                  C100 15 110 15 120 10
                  C130 5 140 5 150 10
                  C160 15 170 15 180 10
                  C190 5 200 5 210 10
                  C220 15 230 15 240 10
                  L240 120
                  L0 120
                  Z
                "
                fill={`url(#${gradientId})`}
              />
            </svg>

            {/* 水面高光 */}
            <svg
              viewBox="0 0 240 24"
              preserveAspectRatio="none"
              className={`water-highlight pointer-events-none absolute -top-[7px] left-0 h-[13px] w-[200%] ${
                isHolding ? "water-highlight-holding" : ""
              }`}
            >
              <path
                d="
                  M0 10
                  C10 5 20 5 30 10
                  C40 15 50 15 60 10
                  C70 5 80 5 90 10
                  C100 15 110 15 120 10
                  C130 5 140 5 150 10
                  C160 15 170 15 180 10
                  C190 5 200 5 210 10
                  C220 15 230 15 240 10
                "
                fill="none"
                stroke="rgba(255,250,232,0.95)"
                strokeWidth="1.3"
              />
            </svg>

            {/* 水中反光 */}
            <span className="water-shimmer pointer-events-none absolute inset-y-0 -left-[55%] w-[50%] bg-gradient-to-r from-transparent via-white/25 to-transparent" />

            {/* 水体内部柔光 */}
            <span className="pointer-events-none absolute inset-x-[5px] top-[8%] h-[38%] rounded-[50%] bg-gradient-to-b from-white/20 via-[#fff0c2]/8 to-transparent blur-[4px]" />
          </span>

          {/* ==================================================
              完成 ✦
              ================================================== */}
          <span
            aria-hidden="true"
            className={`complete-star absolute inset-0 z-40 flex items-center justify-center text-[17px] text-[#fffdf8] transition-all duration-500 ${
              isComplete
                ? "scale-100 opacity-100"
                : "scale-50 opacity-0"
            }`}
          >
            ✦
          </span>
        </button>
      </div>

      {/* ==================================================
          状态文案
          ================================================== */}
      <span
        className={`text-[11px] tracking-[0.12em] transition-colors duration-300 ${
          isComplete
            ? "text-[#8c6525]"
            : isHolding
              ? "text-[#72501b]"
              : "text-[#9e6381]"
        }`}
      >
        {isComplete
          ? "心念已落定"
          : isHolding
            ? "唤醒中 ···"
            : progress > INITIAL_PROGRESS
              ? "继续"
              : label}
      </span>

      <style jsx>{`
        /* ==================================================
           整体入场
           轻轻从牌阵下方浮起
           ================================================== */

        .hold-reveal-enter {
          animation: hold-reveal-enter 3000ms
            cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        @keyframes hold-reveal-enter {
          from {
            opacity: 0;
            transform: translateY(8px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* ==================================================
           外侧金环入场
           0.85 → 1
           ================================================== */

        .moon-ring-enter {
          animation: moon-ring-enter 680ms
            cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        @keyframes moon-ring-enter {
          from {
            transform: scale(0.85);
            opacity: 0;
          }

          45% {
            opacity: 0.3;
          }

          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        /* ==================================================
           水体
           ================================================== */

        .water-body {
          animation: water-flow 3s linear infinite;
        }

        .water-body-holding {
          animation-duration: 1.25s;
        }

        .water-highlight {
          animation: highlight-flow 3.8s linear infinite;
        }

        .water-highlight-holding {
          animation-duration: 1.55s;
        }

        .water-shimmer {
          animation: shimmer-flow 3.4s ease-in-out infinite;
        }

        @keyframes water-flow {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }

        @keyframes highlight-flow {
          from {
            transform: translateX(-50%);
          }

          to {
            transform: translateX(0);
          }
        }

        @keyframes shimmer-flow {
          0% {
            transform: translateX(0) skewX(-16deg);
            opacity: 0;
          }

          18% {
            opacity: 0;
          }

          30% {
            opacity: 0.65;
          }

          55% {
            opacity: 0.3;
          }

          75% {
            opacity: 0;
          }

          100% {
            transform: translateX(310%) skewX(-16deg);
            opacity: 0;
          }
        }

        /* ==================================================
           长按能量环
           ================================================== */

        .energy-ring {
          animation: energy-ring-expand 1.8s ease-out infinite;
        }

        .energy-ring-delay {
          animation-delay: 0.9s;
        }

        @keyframes energy-ring-expand {
          0% {
            transform: scale(0.9);
            opacity: 0;
          }

          20% {
            opacity: 0.65;
          }

          100% {
            transform: scale(1.35);
            opacity: 0;
          }
        }

        /* ==================================================
           泡泡 + 星屑
           ================================================== */

        .floating-particle,
        .floating-symbol {
          position: absolute;
          bottom: 0;
          pointer-events: none;
        }

        .float-left {
          animation: float-left-rise 1.9s ease-out infinite;
        }

        .float-right {
          animation: float-right-rise 2.1s ease-out infinite;
        }

        @keyframes float-left-rise {
          0% {
            transform: translate3d(0, 2px, 0) scale(0.55);
            opacity: 0;
          }

          18% {
            opacity: 0.85;
          }

          52% {
            transform: translate3d(3px, -13px, 0) scale(1);
            opacity: 0.65;
          }

          100% {
            transform: translate3d(-2px, -28px, 0) scale(0.72);
            opacity: 0;
          }
        }

        @keyframes float-right-rise {
          0% {
            transform: translate3d(0, 2px, 0) scale(0.55);
            opacity: 0;
          }

          18% {
            opacity: 0.82;
          }

          52% {
            transform: translate3d(-3px, -14px, 0) scale(1);
            opacity: 0.62;
          }

          100% {
            transform: translate3d(2px, -27px, 0) scale(0.72);
            opacity: 0;
          }
        }

        /* ==================================================
           光泡
           ================================================== */

        .bubble-purple {
          left: 13px;
          width: 5px;
          height: 5px;
          border-radius: 9999px;
          border: 1px solid rgba(157, 134, 181, 0.58);
          background: rgba(224, 212, 235, 0.12);
          box-shadow:
            0 0 5px rgba(157, 134, 181, 0.3),
            inset 0 0 2px rgba(255, 255, 255, 0.75);
          animation-delay: 0s;
        }

        .bubble-gold {
          right: 12px;
          width: 4px;
          height: 4px;
          border-radius: 9999px;
          border: 1px solid rgba(201, 154, 69, 0.56);
          background: rgba(255, 239, 197, 0.13);
          box-shadow:
            0 0 5px rgba(201, 154, 69, 0.28),
            inset 0 0 2px rgba(255, 255, 255, 0.75);
          animation-delay: 0.65s;
        }

        /* ==================================================
           星屑
           ================================================== */

        .floating-symbol {
          line-height: 1;
        }

        .star-purple {
          left: 24px;
          font-size: 4px;
          color: rgba(172, 152, 194, 0.84);
          text-shadow: 0 0 5px rgba(157, 134, 181, 0.4);
          animation-delay: 0.85s;
        }

        /* ==================================================
           月尘
           ================================================== */

        .moon-dust {
          position: absolute;
          bottom: 0;
          line-height: 1;
          pointer-events: none;
          animation: dust-rise 1.5s ease-out infinite;
        }

        .dust-purple {
          left: 8px;
          font-size: 8px;
          color: rgba(157, 134, 181, 0.7);
          animation-delay: 0.35s;
        }

        .dust-gold {
          left: 31px;
          font-size: 8px;
          color: rgba(221, 185, 105, 0.74);
          animation-delay: 0.95s;
        }

        .dust-soft-purple {
          right: 6px;
          font-size: 7px;
          color: rgba(194, 172, 210, 0.68);
          animation-delay: 1.35s;
        }

        @keyframes dust-rise {
          0% {
            transform: translate3d(0, 2px, 0) scale(0.7);
            opacity: 0;
          }

          25% {
            opacity: 0.7;
          }

          60% {
            transform: translate3d(2px, -11px, 0) scale(0.9);
            opacity: 0.5;
          }

          100% {
            transform: translate3d(-1px, -21px, 0) scale(0.75);
            opacity: 0;
          }
        }

        /* ==================================================
           完成星光
           ================================================== */

        .complete-star {
          text-shadow:
            0 0 5px rgba(255, 250, 226, 0.9),
            0 0 11px rgba(255, 236, 184, 0.55);
        }

        /* ==================================================
           Reduced motion
           ================================================== */

        @media (prefers-reduced-motion: reduce) {
          .hold-reveal-enter,
          .moon-ring-enter {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}