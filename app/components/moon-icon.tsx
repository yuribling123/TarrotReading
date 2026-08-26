"use client";

import { useState } from "react";
import { getMoonPhase } from "@/lib/moon/moon-phase";
import { Language } from "@/lib/types";
import { MoonPhase } from "./moon-phase";

type Props = {
  language: Language;
};

export function MoonIcon({ language }: Props) {
  const [showDetails, setShowDetails] = useState(false);

  const { phase } = getMoonPhase();

  return (

    <div className="moon flex items-center gap-1">
      <button
        type="button"
        className="moonPhaseHeader"
        onClick={() => setShowDetails((current) => !current)}
      >
        <div
          className={`moonIcon moon-${phase}`}
          aria-hidden="true"
        />
      </button>
    {(showDetails || phase=="fullMoon") && (<MoonPhase language={language}/>)}
    </div>

    
  );
}