import { localizeTarotName } from "@/lib/tarot";
import type { DrawnCard, Language, ReadingResponse } from "@/lib/types";

function localizeOrientation(orientation: DrawnCard["orientation"], language: Language) {
  return language === "zh" ? (orientation === "Upright" ? "正位" : "逆位") : orientation;
}

export function createFallbackReading(cards: DrawnCard[], language: Language): ReadingResponse {
  const positions =
    language === "zh"
      ? ["当前状况", "隐藏影响", "行动指引"]
      : ["Current situation", "Hidden influence", "Guidance"];

  return {
    spreadName: positions.join(" · "),
    cards: cards.map((card, index) => ({
      position: positions[index],
      title: localizeTarotName(card.name, language),
      orientation: localizeOrientation(card.orientation, language),
      message: "",
    })),
    answer: "",
    guidance: "",
  };
}
