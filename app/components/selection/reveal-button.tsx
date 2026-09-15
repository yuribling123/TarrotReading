"use client";

import { useEffect, useId, useRef, useState } from "react";

type HoldToRevealButtonProps = {
  onComplete: () => void;
  label?: string;
  holdDuration?: number;
};

export function HoldToRevealButton({
  onComplete,
  label = "长按聚念 · 唤醒牌阵",
  holdDuration = 1800,
}: HoldToRevealButtonProps) {
  // 当前注入进度：0 = 空，1 = 满
  const [progress, setProgress] = useState(0);

  // 当前是否正在长按
  const [isHolding, setIsHolding] = useState(false);

  // 是否已经完成
  const [isComplete, setIsComplete] = useState(false);

  // 防止多个 SVG gradient id 冲突
  const gradientId = useId().replace(/:/g, "");

  // 保存实时 progress
  const progressRef = useRef(0);

  // requestAnimationFrame id
  const animationRef = useRef<number | null>(null);

  // 上一帧时间
  const lastFrameRef = useRef<number | null>(null);

  // 完成以后延迟 reveal
  const completeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /**
   * 松手：
   * 停止继续增加 progress，
   * 但是保留当前水位。
   */
  const stopHolding = () => {
    setIsHolding(false);
    lastFrameRef.current = null;

    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  };

  /**
   * 达到 100%。
   */
  const finish = () => {
    progressRef.current = 1;

    setProgress(1);
    setIsHolding(false);
    setIsComplete(true);

    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }

    completeTimerRef.current = setTimeout(() => {
      onComplete();
    }, 360);
  };

  /**
   * 长按核心逻辑。
   *
   * 每一帧根据经过的时间增加 progress。
   */
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

  /**
   * 开始长按。
   *
   * 如果之前已经有 progress，
   * 就从当前进度继续。
   */
  const startHolding = () => {
    if (isComplete || animationRef.current !== null) return;

    setIsHolding(true);
    lastFrameRef.current = null;

    animationRef.current = requestAnimationFrame(animate);
  };

  /**
   * Component 卸载时清理。
   */
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
    <div className="flex flex-col items-center gap-2 pt-24 md:pt-28 lg:pt-32">
      <div className="relative flex size-[64px] items-center justify-center">
        {/* 外围淡淡的光 */}
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute size-[62px] rounded-full bg-[#d5ae64]/14 blur-[10px] transition-all duration-500 ${isHolding ? "scale-110 opacity-100" : progress > 0 ? "scale-100 opacity-25" : "scale-90 opacity-0"}`}
        />

        {/*
          =============================
          水面冒出来的能量粒子
          =============================

          整组粒子的 bottom 跟着 progress 走，
          所以永远从当前水面冒出来。
        */}
        {isHolding && progress < 1 && (
          <div className="pointer-events-none absolute left-1/2 top-1/2 z-30 size-[52px] -translate-x-1/2 -translate-y-1/2 overflow-visible">
            <div
              className="absolute inset-x-0"
              style={{
                bottom: `${Math.min(progress * 52, 48)}px`,
              }}
            >
              {/* 紫色透明光泡 */}
              <span className="floating-particle bubble-purple float-left" />

              {/* 金色透明光泡 */}
              <span className="floating-particle bubble-gold float-right" />

              {/* 紫色星屑：和泡泡完全一样的移动方式 */}
              <span className="floating-symbol star-purple float-left">✧</span>

             

              {/* 月尘 */}
              <span className="moon-dust dust-purple">·</span>
              <span className="moon-dust dust-gold">˚</span>
              <span className="moon-dust dust-soft-purple">·</span>
            </div>
          </div>
        )}

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
          className={`relative z-10 size-[52px] touch-none select-none overflow-hidden rounded-full border bg-[#fffdf9] outline-none transition-[transform,border-color,box-shadow] duration-300 ${isHolding ? "scale-[0.97] border-[#ad7f35]/75 shadow-[0_0_17px_rgba(188,143,67,0.14)]" : "border-[#c8a766]/50 shadow-[0_4px_13px_rgba(132,94,30,0.07)]"}`}
        >
          {/*
            =============================
            水体
            =============================
          */}
          <span
            aria-hidden="true"
            className={`absolute inset-x-0 bottom-0 ${progress > 0 ? "opacity-100" : "opacity-0"}`}
            style={{
              height: `${progress * 100}%`,
            }}
          >
            {/* 主水体 */}
            <svg
              viewBox="0 0 240 120"
              preserveAspectRatio="none"
              className={`water-body pointer-events-none absolute -top-[7px] left-0 h-[calc(100%+7px)] w-[200%] ${isHolding ? "water-body-holding" : ""}`}
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
                    stopColor="#fff8e7"
                    stopOpacity="0.9"
                  />

                  <stop
                    offset="16%"
                    stopColor="#f5e2b4"
                    stopOpacity="0.78"
                  />

                  <stop
                    offset="36%"
                    stopColor="#ebcf91"
                    stopOpacity="0.67"
                  />

                  <stop
                    offset="58%"
                    stopColor="#dcb467"
                    stopOpacity="0.62"
                  />

                  <stop
                    offset="80%"
                    stopColor="#ca9845"
                    stopOpacity="0.7"
                  />

                  <stop
                    offset="100%"
                    stopColor="#ae7223"
                    stopOpacity="0.8"
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
              className={`water-highlight pointer-events-none absolute -top-[7px] left-0 h-[13px] w-[200%] ${isHolding ? "water-highlight-holding" : ""}`}
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
                stroke="rgba(255, 250, 232, 0.9)"
                strokeWidth="1.25"
              />
            </svg>

            {/* 水里面扫过的反光 */}
            <span className="water-shimmer pointer-events-none absolute inset-y-0 -left-[55%] w-[50%] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            {/* 中上部柔光 */}
            <span className="pointer-events-none absolute inset-x-[5px] top-[8%] h-[38%] rounded-[50%] bg-gradient-to-b from-white/16 via-[#fff0c2]/7 to-transparent blur-[4px]" />
          </span>

          {/* 完成以后出现 ✦ */}
          <span
            aria-hidden="true"
            className={`absolute inset-0 z-20 flex items-center justify-center text-[15px] text-[#805817] transition-all duration-300 ${isComplete ? "scale-100 opacity-100" : "scale-75 opacity-0"}`}
          >
            ✦
          </span>
        </button>
      </div>

      {/* 状态文案 */}
      <span className={`text-[11px] tracking-[0.12em] transition-colors duration-300 ${isHolding ? "text-[#72501b]" : "text-[#896a36]/80"}`}>
        {isComplete
          ? "心念已落定"
          : isHolding
            ? "聚念中 ···"
            : progress > 0
              ? "继续聚念"
              : label}
      </span>

      <style jsx>{`
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
           泡泡 + 星星共用的粒子逻辑
           ==================================================

           重点：
           星星和泡泡现在完全使用同一种运动。

           float-left：
           上浮 → 向右漂 → 再向左漂

           float-right：
           上浮 → 向左漂 → 再向右漂
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
           透明光泡
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
           ✦ 星屑

           和泡泡用完全一样的：
           float-left / float-right

           没有单独的 star keyframes。
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
           月尘 · ˚

           月尘更轻、更快一点。
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
      `}</style>
    </div>
  );
}