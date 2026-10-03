"use client";

import { useEffect, useRef, useState } from "react";

import { diceFaceIds, diceFaceNames } from "@/lib/dice/faces";
import { DieSymbol } from "./die-symbols";
import type { DiceFaceId } from "@/lib/types";

type StarDieProps = {
  initialFace?: DiceFaceId | null;
  playEntrance?: boolean;
  onRoll: (face: DiceFaceId) => void;
  onSettled: () => void;
};

const escapingStars = [
  "left-[calc(50%-22px)] top-[calc(50%+9px)] size-0.5 bg-[#f7efe3] shadow-[0_0_6px_#f7efe3] [--star-drift-x:-14px] [--star-rise:-34px] [animation-delay:-0.8s] [animation-duration:4.8s]",
  "left-[calc(50%+18px)] top-[calc(50%+4px)] size-px bg-[#d7b56d] shadow-[0_0_5px_#d7b56d] [--star-drift-x:11px] [--star-rise:-40px] [animation-delay:-3.1s] [animation-duration:5.4s]",
  "left-[calc(50%-9px)] top-[calc(50%-23px)] size-px bg-[#f7efe3] shadow-[0_0_5px_#f7efe3] [--star-drift-x:-8px] [--star-rise:-28px] [animation-delay:-2.2s] [animation-duration:4.5s]",
  "left-[calc(50%+12px)] top-[calc(50%-19px)] size-0.5 bg-[#d7b56d] shadow-[0_0_6px_#d7b56d] [--star-drift-x:15px] [--star-rise:-33px] [animation-delay:-4.5s] [animation-duration:5.8s]",
] as const;

const dieFaceGeometry: Record<DiceFaceId, { transform: string; x: number; y: number }> = {
  moonKingdom: { transform: "translateZ(calc(var(--die-size) / 2))", x: 0, y: 0 },
  fatedRomance: { transform: "rotateY(90deg) translateZ(calc(var(--die-size) / 2))", x: 0, y: -90 },
  absurdMonday: { transform: "rotateY(180deg) translateZ(calc(var(--die-size) / 2))", x: 0, y: -180 },
  neonGlitch: { transform: "rotateY(-90deg) translateZ(calc(var(--die-size) / 2))", x: 0, y: 90 },
  everyoneHasSecrets: { transform: "rotateX(90deg) translateZ(calc(var(--die-size) / 2))", x: -90, y: 0 },
  improvisedStory: { transform: "rotateX(-90deg) translateZ(calc(var(--die-size) / 2))", x: 90, y: 0 },
};

export function StarDie({ initialFace = null, playEntrance = false, onRoll, onSettled }: StarDieProps) {
  const [rotation, setRotation] = useState(() => {
    const face = initialFace ? dieFaceGeometry[initialFace] : null;
    return face ? { x: face.x - 14, y: face.y - 20 } : { x: -14, y: -20 };
  });
  const [selected, setSelected] = useState<DiceFaceId | null>(initialFace);
  const [isRolling, setIsRolling] = useState(false);
  const rollCount = useRef(0);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timeout.current) clearTimeout(timeout.current);
  }, []);

  function roll() {
    if (isRolling) return;
    const faceId = diceFaceIds[Math.floor(Math.random() * diceFaceIds.length)];
    const face = dieFaceGeometry[faceId];
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    rollCount.current += 1;
    setSelected(null);
    setIsRolling(true);
    onRoll(faceId);
    setRotation({
      x: (reduceMotion ? 0 : rollCount.current * 720) + face.x - 14,
      y: (reduceMotion ? 0 : rollCount.current * 720) + face.y - 20,
    });
    timeout.current = setTimeout(() => {
      setSelected(faceId);
      setIsRolling(false);
      onSettled();
    }, reduceMotion ? 0 : 1050);
  }

  return (
    <div className="group flex flex-col items-center pb-2">
      <div className="relative grid h-32 w-64 place-items-center [perspective:900px] sm:h-36">
        <div className="pointer-events-none absolute left-1/2 top-1/2 size-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(173,140,204,0.14),transparent_70%)]" aria-hidden="true" />
        {escapingStars.map((className) => (
          <span
            key={className}
            className={`pointer-events-none absolute rounded-full opacity-0 animate-[die-star-escape_5s_ease-in-out_infinite] motion-reduce:animate-none motion-reduce:opacity-30 ${className}`}
            aria-hidden="true"
          />
        ))}
        <div className={`relative size-[var(--die-size)] [--die-size:36px] transition-transform duration-300 ease-out group-has-[button:hover]:-translate-y-[3px] sm:[--die-size:44px] ${isRolling ? "animate-[die-toss_1050ms_ease-in-out_both]" : playEntrance ? "animate-[dice-enter_750ms_520ms_cubic-bezier(0.22,1,0.36,1)_both]" : ""} motion-reduce:animate-none motion-reduce:transition-none`}>
          <div
            className="absolute inset-0 [transform-style:preserve-3d] transition-transform duration-1000 ease-[cubic-bezier(0.18,0.72,0.18,1)] motion-reduce:transition-none"
            style={{ transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` }}
            aria-hidden="true"
          >
            {diceFaceIds.map((faceId) => (
              <div
                key={faceId}
                className="absolute inset-0 grid place-items-center border border-[#e9dfc9]/35 bg-[linear-gradient(135deg,rgba(218,201,232,0.12),rgba(128,100,152,0.05)_55%,rgba(205,193,225,0.10))] [backface-visibility:hidden] [clip-path:polygon(9%_0,91%_0,100%_9%,100%_91%,91%_100%,9%_100%,0_91%,0_9%)]"
                style={{ transform: dieFaceGeometry[faceId].transform }}
              >
                <div className="pointer-events-none absolute left-[10%] top-0 h-px w-[44%] bg-[#fff6df]/60" aria-hidden="true" />
                <div className="pointer-events-none absolute left-0 top-[13%] h-[26%] w-px bg-[#e4d9ec]/45" aria-hidden="true" />
                <div className="pointer-events-none absolute inset-px bg-[radial-gradient(ellipse_at_50%_45%,transparent_38%,rgba(108,84,137,0.18)_100%)] [clip-path:polygon(9%_0,91%_0,100%_9%,100%_91%,91%_100%,9%_100%,0_91%,0_9%)]" aria-hidden="true" />
                <div className="pointer-events-none absolute inset-1 bg-[radial-gradient(circle_at_25%_30%,rgba(204,184,224,0.10),transparent_38%),radial-gradient(circle_at_77%_72%,rgba(129,107,159,0.11),transparent_33%)]" aria-hidden="true" />
                <div className="pointer-events-none absolute left-[2%] top-[2%] size-[14%] bg-[#e7d9ed]/8 [clip-path:polygon(50%_0,100%_50%,0_100%)]" aria-hidden="true" />
                <div className="pointer-events-none absolute bottom-[2%] right-[2%] size-[14%] bg-[#1e1929]/18 [clip-path:polygon(100%_0,100%_100%,0_50%)]" aria-hidden="true" />
                {isRolling && (
                  <div className="pointer-events-none absolute inset-0 opacity-40" aria-hidden="true">
                    <span className="absolute left-[22%] top-[28%] size-1 rounded-full bg-white shadow-[0_0_8px_white] animate-[die-dust_750ms_ease-in-out_infinite_alternate]" />
                    <span className="absolute right-[25%] top-[42%] size-0.5 rounded-full bg-[#e9d8fc] shadow-[0_0_7px_#e9d8fc] animate-[die-dust_900ms_ease-in-out_infinite_alternate]" />
                    <span className="absolute bottom-[24%] left-[38%] size-0.5 rounded-full bg-white shadow-[0_0_7px_white] animate-[die-dust_800ms_ease-in-out_infinite_alternate]" />
                  </div>
                )}
                <DieSymbol face={faceId} />
              </div>
            ))}
          </div>
        </div>
        <div className={`pointer-events-none absolute left-1/2 top-[calc(50%+32px)] h-1 w-9 -translate-x-1/2 rounded-full bg-[#8d77ad]/20 blur-sm transition-transform duration-700 ${isRolling ? "scale-75" : "scale-100"}`} aria-hidden="true" />
      </div>

      {selected && (
        <p className="mt-2 text-center text-xs tracking-[0.08em] text-[#f7efe3]" aria-live="polite">
          {`平行世界：${diceFaceNames[selected]}`}
        </p>
      )}
      {!selected && <button
        type="button"
        onClick={roll}
        disabled={isRolling}
        className={`mt-1 rounded-full border border-[#f7efe3] px-5 py-3 text-sm font-medium text-[#f7efe3] transition-[background-color,border-color,box-shadow] hover:shadow-[0_0_20px_rgba(173,140,204,0.14)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f7efe3] disabled:cursor-wait disabled:opacity-60 ${playEntrance ? "animate-[dice-button-enter_650ms_1150ms_ease-out_both] motion-reduce:animate-none" : ""}`}
      >
        {isRolling ? "星星正在选择…" : "去另一个宇宙"}
      </button>}
    </div>
  );
}
