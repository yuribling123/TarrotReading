"use client";

import { useEffect, useRef, useState } from "react";
import { messages } from "@/lib/i18n";
import type { DivinationCatalyst, Language } from "@/lib/types";

type DivinationCatalystsProps = {
  language: Language;
  onActivate?: (catalyst: DivinationCatalyst) => void;
  onClear?: () => void;
};

export function DivinationCatalysts({
  language,
  onActivate,
  onClear,
}: DivinationCatalystsProps) {
  const [activeCatalyst, setActiveCatalyst] = useState<DivinationCatalyst | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const text = messages[language].catalysts;

  useEffect(() => {
    function clearFromBlankArea(event: PointerEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (sectionRef.current?.contains(target)) return;
      if (target.closest("button, a, input, textarea, select, [role='button'], [role='dialog']")) return;

      setActiveCatalyst(null);
      onClear?.();
    }

    document.addEventListener("pointerdown", clearFromBlankArea);
    return () => document.removeEventListener("pointerdown", clearFromBlankArea);
  }, [onClear]);

  useEffect(() => {
    if (!activeCatalyst) return;

    const timeout = window.setTimeout(() => setActiveCatalyst(null), 800);
    return () => window.clearTimeout(timeout);
  }, [activeCatalyst]);

  function activate(catalyst: DivinationCatalyst) {
    setActiveCatalyst(null);
    onActivate?.(catalyst);
    window.requestAnimationFrame(() => setActiveCatalyst(catalyst));
  }

  return (
    <section
      ref={sectionRef}
      aria-label={text.label}
      className="mx-auto mt-7 w-fit text-[#6f6a67] md:mt-9"
    >
      <p className="mb-3 text-center text-[10px] tracking-[0.16em] ">
        {text.prompt}
      </p>

      <div className="flex items-start justify-center gap-8 sm:gap-11">
        <button
          type="button"
          aria-pressed={activeCatalyst === "moonstone"}
          onClick={() => activate("moonstone")}
          className="group grid w-12 grid-rows-[44px_auto] place-items-center gap-2 rounded-full outline-none focus-visible:ring-1 focus-visible:ring-[#8a8680]/40 focus-visible:ring-offset-4"
        >
          <span className={`relative grid h-9 w-11 place-items-center overflow-hidden rounded-[58%_42%_53%_47%/48%_55%_45%_52%] border border-[#d8d0c3]/60 bg-[radial-gradient(circle_at_32%_25%,#ffffff_0%,#faf6ed_44%,#f0e8db_78%,#ded4c5_100%)] shadow-[inset_-3px_-3px_7px_rgba(132,111,82,0.08),0_0_10px_rgba(244,226,183,0.14),0_5px_12px_rgba(99,83,62,0.07)] transition duration-300 group-hover:-translate-y-0.5 motion-reduce:transition-none ${activeCatalyst === "moonstone" ? "shadow-[inset_-3px_-3px_7px_rgba(132,111,82,0.07),0_0_21px_rgba(243,222,172,0.50)]" : "group-hover:shadow-[inset_-3px_-3px_7px_rgba(132,111,82,0.07),0_0_16px_rgba(237,218,177,0.28)]"}`}>
            <span className="absolute inset-1 rounded-[inherit] bg-[radial-gradient(circle_at_56%_48%,rgba(255,249,234,0.72)_0%,rgba(248,235,204,0.30)_36%,transparent_68%)] blur-[1px]" />
            <span
              className={`absolute -inset-y-3 w-7 rounded-full bg-[radial-gradient(ellipse,rgba(255,255,255,0.94)_0%,rgba(243,222,172,0.50)_36%,transparent_72%)] blur-[3px] transition-transform duration-900 ease-in-out motion-reduce:transition-none ${
                activeCatalyst === "moonstone"
                  ? "translate-x-10"
                  : "-translate-x-10"
              }`}
            />
            <span className="absolute left-2.5 top-1.5 h-1.5 w-3 rotate-[-18deg] rounded-full bg-white/85 blur-[0.8px]" />
            <span className="absolute bottom-2 right-2 h-px w-4 -rotate-12 bg-[#e2c98f]/30" />
          </span>
          <span className="text-[10px] tracking-[0.12em] text-[#6f6a67]/72">
            {text.moonstone}
          </span>
        </button>

        <button
          type="button"
          aria-pressed={activeCatalyst === "candle"}
          onClick={() => activate("candle")}
          className="group grid w-12 grid-rows-[44px_auto] place-items-center gap-2 rounded-full outline-none focus-visible:ring-1 focus-visible:ring-[#8a8680]/40 focus-visible:ring-offset-4"
        >
          <span className={`relative flex size-11 items-end justify-center rounded-full border border-[#c9875a]/10 bg-[#fffaf5]/55 pb-2 shadow-[0_5px_14px_rgba(145,95,61,0.08)] transition duration-300 group-hover:-translate-y-0.5 motion-reduce:transition-none ${activeCatalyst === "candle" ? "shadow-[0_0_18px_rgba(200,155,69,0.25)]" : ""}`}>
            <span className="h-3 w-2 rounded-b-sm bg-[#e7d8c6]" />
            <span
              className={`absolute left-1/2 top-[7px] h-3.5 w-2 -translate-x-1/2 rounded-[70%_30%_65%_35%] bg-[#c9875a] shadow-[0_0_8px_rgba(201,135,90,0.34)] transition duration-500 origin-bottom motion-reduce:transition-none ${
                activeCatalyst === "candle"
                  ? "-rotate-12 scale-125 bg-[#e7a266] shadow-[0_0_14px_rgba(200,155,69,0.48)]"
                  : "rotate-3 scale-100"
              }`}
            />
          </span>
          <span className="text-[10px] tracking-[0.12em] text-[#6f6a67]/72">
            {text.candle}
          </span>
        </button>

        <button
          type="button"
          aria-pressed={activeCatalyst === "stardust"}
          onClick={() => activate("stardust")}
          className="group grid w-12 grid-rows-[44px_auto] place-items-center gap-2 rounded-full outline-none focus-visible:ring-1 focus-visible:ring-[#8a8680]/40 focus-visible:ring-offset-4"
        >
          <span className={`relative grid size-11 place-items-center transition duration-300 group-hover:-translate-y-0.5 motion-reduce:transition-none ${activeCatalyst === "stardust" ? "drop-shadow-[0_0_10px_rgba(151,130,174,0.50)]" : ""}`}>
            <span className={`relative mt-1 h-7 w-5 rounded-b-[7px] rounded-t-[3px] border border-[#c5c8c6]/85 bg-[linear-gradient(110deg,rgba(255,255,255,0.78),rgba(224,228,228,0.24)_44%,rgba(255,255,255,0.62))] shadow-[inset_1px_0_2px_rgba(255,255,255,0.75),0_4px_9px_rgba(79,91,105,0.09)] transition-transform duration-500 ${activeCatalyst === "stardust" ? "rotate-12" : "-rotate-6"}`}>
              <span className="absolute -top-1.5 left-1/2 h-2 w-3 -translate-x-1/2 rounded-t-sm border border-[#bcc1c0]/75 bg-[#f1f2ef]/85" />
              <span className="absolute inset-x-0.5 bottom-0.5 h-4 overflow-hidden rounded-b-[5px] bg-[linear-gradient(to_top,#655271,rgba(132,110,153,0.62)_68%,rgba(170,150,189,0.13))]">
                <span className="absolute left-1 top-1 size-0.5 rounded-full bg-[#eef0ed]" />
                <span className="absolute right-1 top-2 size-0.5 rounded-full bg-[#c0b2cf]" />
                <span className="absolute bottom-1 left-2 size-px rounded-full bg-white/80" />
              </span>
              <span className="absolute left-1 top-1 h-3 w-px rotate-12 bg-white/65" />
            </span>
            {[
              "left-[8px] top-[16px] -translate-x-1 -translate-y-3",
              "left-[17px] top-[8px] translate-x-1 -translate-y-3",
              "right-[7px] top-[17px] translate-x-1 -translate-y-4",
            ].map((position, index) => (
              <span
                key={position}
                className={`absolute rounded-full opacity-0 transition-all duration-1000 motion-reduce:transition-none ${index === 1 ? "size-1 bg-[#f0ebf4]" : "size-0.5 bg-[#c0b2cf]"} ${position} ${
                  activeCatalyst === "stardust" ? "opacity-80" : "translate-x-0 translate-y-0"
                }`}
                style={{ transitionDelay: `${index * 70}ms` }}
              />
            ))}
          </span>
          <span className="text-[10px] tracking-[0.12em] text-[#6f6a67]/72">
            {text.stardust}
          </span>
        </button>
      </div>
    </section>
  );
}
