import { TarotCardArtwork } from "@/app/components/card-front";
import type { TarotCard } from "@/lib/types";

type SelectedCardSlotsProps = {
  cards: TarotCard[];
  flyingCardName?: string;
};

export function SelectedCardSlots({
  cards,
  flyingCardName,
}: SelectedCardSlotsProps) {
  return (
    <div className="selectedCardSlots" aria-label="Selected tarot cards">
      {[0, 1, 2].map((index) => {
        const card = cards[index];
        const isFlying = card?.name === flyingCardName;

        return (
          <div key={index} className="selectedCardSlot" data-selected-slot={index}>
            {card && !isFlying && <TarotCardArtwork card={card} />}
          </div>
        );
      })}
    </div>
  );
}
