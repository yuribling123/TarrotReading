"use client";

import { useEffect, useRef, useState } from "react";

import { diceFaces, type DiceFaceId } from "@/lib/dice/faces";
import { DieSymbol } from "./die-symbols";

type StarDieProps = {
  labels: Record<DiceFaceId, string>;
  rollLabel: string;
  rollingLabel: string;
  resultLabel: string;
  initialFace?: DiceFaceId | null;
  onRoll: (face: DiceFaceId) => void;
  onSettled: () => void;
};

export function StarDie({ labels, rollLabel, rollingLabel, resultLabel, initialFace = null, onRoll, onSettled }: StarDieProps) {
  const [rotation, setRotation] = useState(() => {
    const face = diceFaces.find((item) => item.id === initialFace);
    return face ? { x: face.x - 8, y: face.y - 12 } : { x: -8, y: -12 };
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
    const face = diceFaces[Math.floor(Math.random() * diceFaces.length)];
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    rollCount.current += 1;
    setSelected(null);
    setIsRolling(true);
    onRoll(face.id);
    setRotation({
      x: (reduceMotion ? 0 : rollCount.current * 720) + face.x - 8,
      y: (reduceMotion ? 0 : rollCount.current * 720) + face.y - 12,
    });
    timeout.current = setTimeout(() => {
      setSelected(face.id);
      setIsRolling(false);
      onSettled();
    }, reduceMotion ? 0 : 1050);
  }

  return (
    <div className="flex flex-col items-center">
      <div className="relative grid h-64 place-items-center [perspective:900px] sm:h-72">
        <div className={`relative size-[var(--die-size)] [--die-size:144px] sm:[--die-size:176px] ${isRolling ? "animate-[die-toss_1050ms_ease-in-out_both]" : "animate-[die-float_3s_ease-in-out_infinite]"} motion-reduce:animate-none`}>
          <div className="pointer-events-none absolute -left-5 -top-5 -z-10 size-28 rounded-full bg-[#e5d7f0]/20 blur-2xl" aria-hidden="true" />
          <div
            className="absolute inset-0 [transform-style:preserve-3d] transition-transform duration-1000 ease-[cubic-bezier(0.18,0.72,0.18,1)] motion-reduce:transition-none"
            style={{ transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` }}
            aria-hidden="true"
          >
            {diceFaces.map((face) => (
              <div
                key={face.id}
                className="absolute inset-0 grid place-items-center overflow-hidden rounded-[16px] border-[3px] border-[#fff9ec] bg-[linear-gradient(145deg,#fffaf0_0%,#f1ecec_55%,#ccc5d5_100%)] text-[#40384d] shadow-[inset_4px_4px_12px_rgba(255,255,255,0.95),inset_-7px_-9px_18px_rgba(126,113,147,0.28)] [backface-visibility:hidden]"
                style={{ transform: face.transform }}
              >
                {isRolling && (
                  <div className="pointer-events-none absolute inset-0 opacity-40" aria-hidden="true">
                    <span className="absolute left-[22%] top-[28%] size-1 rounded-full bg-white shadow-[0_0_8px_white] animate-[die-dust_750ms_ease-in-out_infinite_alternate]" />
                    <span className="absolute right-[25%] top-[42%] size-0.5 rounded-full bg-[#e9d8fc] shadow-[0_0_7px_#e9d8fc] animate-[die-dust_900ms_ease-in-out_infinite_alternate]" />
                    <span className="absolute bottom-[24%] left-[38%] size-0.5 rounded-full bg-white shadow-[0_0_7px_white] animate-[die-dust_800ms_ease-in-out_infinite_alternate]" />
                  </div>
                )}
                <DieSymbol face={face.id} />
              </div>
            ))}
          </div>
        </div>
        <div className={`pointer-events-none absolute mt-52 h-5 w-32 rounded-full bg-[#c8bbda]/20 blur-lg transition-transform duration-700 ${isRolling ? "scale-75" : "scale-100"}`} aria-hidden="true" />
      </div>

      <p className="mt-2 min-h-7 text-center text-sm text-[#f7efe3]" aria-live="polite">
        {selected ? `${resultLabel}：${labels[selected]}` : isRolling ? rollingLabel : "\u00a0"}
      </p>
      {!selected && <button
        type="button"
        onClick={roll}
        disabled={isRolling}
        className="mt-8 rounded-full border border-[#f7efe3] bg-transparent px-7 py-3 text-sm font-medium text-[#f7efe3] transition-colors hover:bg-[#f7efe3]/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f7efe3] disabled:cursor-wait disabled:opacity-60"
      >
        {isRolling ? rollingLabel : rollLabel}
      </button>}
    </div>
  );
}
