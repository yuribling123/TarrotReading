import { getMoonPhase } from "@/lib/moon/moon-phase";
import { messages } from "@/lib/i18n";
import { Language } from "@/lib/types";

type Props = {
  language: Language;
};

export function MoonPhase({ language }: Props) {
  const text = messages[language];
  const { phase, age } = getMoonPhase();
  const daysUntilFullMoon =
    age <= 14.8
      ? Math.ceil(14.8 - age)
      : Math.ceil(29.53 - age + 14.8);
  const roundedAge = Math.round(age)
return (
  <div className="">
  <div className="inline-flex items-center gap-1 rounded-full  bg-white/70 px-1.5 py-1.5 backdrop-blur-sm">
    <span className="text-xs text-[#7f5b1f]/80">
      {text.moonPhases[phase]}
    </span>
    {phase=="fullMoon"&&
    <span className="text-xs text-[#7f5b1f]/40">
           {text.moonAge(roundedAge)}
    </span>
    }
    
    {phase!="fullMoon"&&
    <span className="text-xs text-[#7f5b1f]/40">
      {text.fullMoonDays.fullMoonIn(daysUntilFullMoon)}
    </span>
    }
  </div>

  </div>
);
}