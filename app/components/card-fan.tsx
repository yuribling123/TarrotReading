"use client";
import { Card } from "@/app/components/card";
import type { TarotCard } from "@/lib/types";

type CardFanProps = {
  deck: TarotCard[];
  selectedCards: TarotCard[];
  onSelect: (card: TarotCard) => void;
};

export function CardFan({
  deck,
  selectedCards,
  onSelect,
}: CardFanProps) {
  return (
    <div className="cardFanViewport">
      <div className="cardFan">
        {deck.map((card) => (
          <Card
            key={card.name}
            card={card}
            isSelected={selectedCards.some(
              (selectedCard) => selectedCard.name === card.name
            )}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}