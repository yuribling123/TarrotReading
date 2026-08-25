import type { Language, MoonPhase } from "@/lib/types";


export function getMoonPhase(date = new Date()) {
  let phase: MoonPhase;
  const knownNewMoon = new Date("2000-01-06T18:14:00Z");
  const lunarCycle = 29.53058867;
  const daysSince =
    (date.getTime() - knownNewMoon.getTime()) /
    (1000 * 60 * 60 * 24);
  const moonAge =
    ((daysSince % lunarCycle) + lunarCycle) % lunarCycle;
  const progress = moonAge / lunarCycle;
  if (progress < 0.0625 || progress >= 0.9375)
    phase = "newMoon";
  else if (progress < 0.1875)
    phase = "waxingCrescent";
  else if (progress < 0.3125)
    phase = "firstQuarter";
  else if (progress < 0.4375)
    phase = "waxingGibbous";
  else if (progress < 0.5625)
    phase = "fullMoon";
  else if (progress < 0.6875)
    phase = "waningGibbous";
  else if (progress < 0.8125)
    phase = "lastQuarter";
  else
    phase = "waningCrescent";

  return {
    phase,
    age: moonAge,
    progress,
  };
}