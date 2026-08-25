"use client";

import {getMoonPhase,} from "@/lib/moon/moon-phase";
import { moonMessages } from "@/lib/types/moon";
export function MoonMessage() {

  const { phase } = getMoonPhase();

  return (
    <div className="fixed bottom-6 right-6 z-50 rounded-2xl border border-[#b89552]/25 bg-white/80 px-4 py-3 shadow-md backdrop-blur-sm animate-in fade-in duration-18000">
      <p className="text-xs text-[#6f675d]">
        {moonMessages[phase]}
      </p>
    </div>
  );
}