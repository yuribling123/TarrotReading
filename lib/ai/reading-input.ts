import type { TarotCard } from "@/lib/types";

export function toReadingInputCards(cards: TarotCard[]) {
  return cards.map((card, index) => ({
    order: index + 1,
    name: card.name,
    orientation: card.orientation,
  }));
}
