"use client";

import { getMoonPhase } from "@/lib/moon/moon-phase";
import { Language } from "@/lib/types";

type Props = {
  language: Language;
  onClick?: () => void;
};

export function MoonIcon({ language, onClick }: Props) {
  const { phase } = getMoonPhase();

  return (

    <div className="">
      <button
        type="button"
        onClick={onClick}
        className="border-0 bg-transparent p-0 transition duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b89755]/35 focus-visible:ring-offset-4"
        aria-label={language === "zh" ? "阅读月亮的故事" : "Read the story of the moon"}
      >
        <div
          className={`moonIcon moon-${phase}  scale-200`}
          aria-hidden="true"
        />
      </button>
    </div>

    
  );
}
