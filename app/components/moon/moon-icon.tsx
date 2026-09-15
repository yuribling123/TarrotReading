"use client";

import { getMoonPhase } from "@/lib/moon/moon-phase";
import type { Language } from "@/lib/types";

type MoonIconProps = {
  language: Language;
  onClick?: () => void;
};

export function MoonIcon({ language, onClick }: MoonIconProps) {
  const { phase } = getMoonPhase();

  return (
    <div className="relative mx-auto h-10 w-10">
      <span
        className="pointer-events-none absolute left-1/2 top-1/2 h-18 w-18 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(226,190,101,0.18)_0%,rgba(199,177,218,0.08)_42%,transparent_72%)] blur-md"
        aria-hidden="true"
      />
      <span
        className="pointer-events-none absolute left-1/2 top-5 h-20 w-14 -translate-x-1/2 bg-[linear-gradient(to_bottom,rgba(235,205,133,0.09),rgba(205,185,222,0.025)_55%,transparent)] blur-lg"
        aria-hidden="true"
      />
      <svg
        viewBox="0 0 92 64"
        className="pointer-events-none absolute left-1/2 top-1/2 z-[1] h-16 w-24 -translate-x-1/2 -translate-y-1/2 overflow-visible"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <filter id="moon-orbit-glow" x="-300%" y="-300%" width="700%" height="700%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <ellipse
          cx="46"
          cy="32"
          rx="38"
          ry="19"
          transform="rotate(-12 46 32)"
          pathLength="100"
          stroke="#b99a62"
          strokeWidth="0.9"
          strokeOpacity="0.12"
          strokeDasharray="72 28"
          strokeDashoffset="7"
          strokeLinecap="round"
        />

        <g transform="rotate(-12 46 32)" className="motion-reduce:hidden">
          <g filter="url(#moon-orbit-glow)">
            <animateMotion
              dur="22s"
              repeatCount="indefinite"
              path="M 8 32 a 38 19 0 1 0 76 0 a 38 19 0 1 0 -76 0"
            />
            <path
              d="M 0 -2.1 L 0.55 -0.55 L 2.1 0 L 0.55 0.55 L 0 2.1 L -0.55 0.55 L -2.1 0 L -0.55 -0.55 Z"
              fill="#d8b55f"
            >
              <animate
                attributeName="fill"
                values="#d8b55f;#8655b5;#d8b55f"
                dur="22s"
                repeatCount="indefinite"
              />
            </path>
            <circle r="0.65" fill="#fff9df" />
          </g>
        </g>
      </svg>
      <button
        type="button"
        onClick={onClick}
        className="relative z-[2] grid h-10 w-10 place-items-center rounded-full border-0 bg-transparent p-0 transition duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b89755]/35 focus-visible:ring-offset-4"
        aria-label={language === "zh" ? "阅读月亮的故事" : "Read the story of the moon"}
      >
        <div
          className={`moonIcon moon-${phase} scale-160`}
          aria-hidden="true"
        />
      </button>
    </div>
  );
}
