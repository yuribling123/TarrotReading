"use client";

import { useEffect, useState } from "react";
import { messages } from "@/lib/i18n";
import type { Language } from "@/lib/types";

type Catalyst = "moonstone" | "candle" | "stardust";

type DivinationCatalystsProps = {
  language: Language;
};

export function DivinationCatalysts({ language }: DivinationCatalystsProps) {
  const [activeCatalyst, setActiveCatalyst] = useState<Catalyst | null>(null);
  const text = messages[language].catalysts;

  useEffect(() => {
    if (!activeCatalyst) return;

    const timeout = window.setTimeout(() => setActiveCatalyst(null), 1800);
    return () => window.clearTimeout(timeout);
  }, [activeCatalyst]);

  function activate(catalyst: Catalyst) {
    setActiveCatalyst(null);
    window.requestAnimationFrame(() => setActiveCatalyst(catalyst));
  }

  return (
    <section
      aria-label={text.label}
      className="mx-auto mt-7 w-fit text-[#7f5b1f] md:mt-9"
    >
      <p className="mb-3 text-center text-[10px] tracking-[0.16em] text-[#7f5b1f]/45">
        {text.prompt}
      </p>

      <div className="flex items-start justify-center gap-8 sm:gap-11">
        <button
          type="button"
          aria-pressed={activeCatalyst === "moonstone"}
          onClick={() => activate("moonstone")}
          className="group flex w-12 flex-col items-center gap-2 rounded-full outline-none focus-visible:ring-1 focus-visible:ring-[#b58a3f]/50 focus-visible:ring-offset-4"
        >
          <span className="relative grid size-9 place-items-center overflow-hidden rounded-full border border-[#b58a3f]/25 bg-[radial-gradient(circle_at_35%_28%,#fffdf8_0%,#f3e8cf_48%,#d9bd82_100%)] shadow-[0_5px_14px_rgba(127,91,31,0.10)] transition duration-300 group-hover:-translate-y-0.5 group-hover:shadow-[0_6px_18px_rgba(127,91,31,0.18)] motion-reduce:transition-none">
            <span
              className={`absolute -inset-y-2 w-3 -skew-x-12 bg-white/70 blur-[2px] transition-transform duration-1000 ease-in-out motion-reduce:transition-none ${
                activeCatalyst === "moonstone"
                  ? "translate-x-8"
                  : "-translate-x-8"
              }`}
            />
            <span className="size-2.5 rounded-full border border-white/80 bg-white/25" />
          </span>
          <span className="text-[10px] tracking-[0.12em] text-[#7f5b1f]/60">
            {text.moonstone}
          </span>
        </button>

        <button
          type="button"
          aria-pressed={activeCatalyst === "candle"}
          onClick={() => activate("candle")}
          className="group flex w-12 flex-col items-center gap-2 rounded-full outline-none focus-visible:ring-1 focus-visible:ring-[#b58a3f]/50 focus-visible:ring-offset-4"
        >
          <span className="relative grid size-9 place-items-end rounded-full border border-[#b58a3f]/20 bg-white/35 pb-1.5 shadow-[0_5px_14px_rgba(127,91,31,0.08)] transition duration-300 group-hover:-translate-y-0.5 motion-reduce:transition-none">
            <span className="h-3 w-2 rounded-b-sm bg-[#d8c39a]/80" />
            <span
              className={`absolute left-1/2 top-[7px] h-3.5 w-2 -translate-x-1/2 rounded-[70%_30%_65%_35%] bg-[#d8a643] shadow-[0_0_8px_rgba(216,166,67,0.42)] transition duration-500 origin-bottom motion-reduce:transition-none ${
                activeCatalyst === "candle"
                  ? "-rotate-12 scale-125 bg-[#efc76e] shadow-[0_0_14px_rgba(216,166,67,0.72)]"
                  : "rotate-3 scale-100"
              }`}
            />
          </span>
          <span className="text-[10px] tracking-[0.12em] text-[#7f5b1f]/60">
            {text.candle}
          </span>
        </button>

        <button
          type="button"
          aria-pressed={activeCatalyst === "stardust"}
          onClick={() => activate("stardust")}
          className="group flex w-12 flex-col items-center gap-2 rounded-full outline-none focus-visible:ring-1 focus-visible:ring-[#b58a3f]/50 focus-visible:ring-offset-4"
        >
          <span className="relative grid size-9 place-items-center rounded-full border border-[#b58a3f]/20 bg-white/35 shadow-[0_5px_14px_rgba(127,91,31,0.08)] transition duration-300 group-hover:-translate-y-0.5 motion-reduce:transition-none">
            <span className="text-[14px] text-[#bd9143] transition-transform duration-500 group-hover:rotate-12">✦</span>
            {[
              "left-[8px] top-[16px] -translate-x-1 -translate-y-3",
              "left-[17px] top-[8px] translate-x-1 -translate-y-3",
              "right-[7px] top-[17px] translate-x-1 -translate-y-4",
            ].map((position, index) => (
              <span
                key={position}
                className={`absolute size-1 rounded-full bg-[#d5ae60] opacity-0 transition-all duration-1000 motion-reduce:transition-none ${position} ${
                  activeCatalyst === "stardust" ? "opacity-80" : "translate-x-0 translate-y-0"
                }`}
                style={{ transitionDelay: `${index * 70}ms` }}
              />
            ))}
          </span>
          <span className="text-[10px] tracking-[0.12em] text-[#7f5b1f]/60">
            {text.stardust}
          </span>
        </button>
      </div>
    </section>
  );
}
