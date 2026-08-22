import {
  CHINESE_MAJOR_NAMES,
  CHINESE_MINOR_RANKS,
  CHINESE_MINOR_SUITS,
} from "@/lib/tarot/constants";
import type { Language } from "@/lib/types";

export function localizeTarotName(name: string, language: Language) {
  if (language === "en") {
    return name;
  }

  if (CHINESE_MAJOR_NAMES[name]) {
    return CHINESE_MAJOR_NAMES[name];
  }

  const match = name.match(
    /^(Ace|Two|Three|Four|Five|Six|Seven|Eight|Nine|Ten|Page|Knight|Queen|King) of (Wands|Cups|Swords|Pentacles)$/,
  );

  if (!match) {
    return name;
  }

  return `${CHINESE_MINOR_SUITS[match[2]]}${CHINESE_MINOR_RANKS[match[1]]}`;
}
