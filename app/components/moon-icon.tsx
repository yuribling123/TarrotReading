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

    <div className="pb-20">
      <button
        type="button"
      >
        <div
          className={`moonIcon moon-${phase}  scale-200`}
          aria-hidden="true"
        />
      </button>
    {/* {(showDetails) && (<MoonPhase language={language}/>)} */}
    </div>

    
  );
}