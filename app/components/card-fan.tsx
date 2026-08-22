"use client";

import { tarotDeck } from "@/lib/tarot";
import { TarotCard } from "@/app/components/tarot-card";

type CardFanProps = {
  selectedIndexes: number[];
  onToggle: (cardIndex: number) => void;
};

export function CardFan({ selectedIndexes, onToggle }: CardFanProps) {
  return (
    <div className="cardFanViewport">
      <div className="cardFan">
        {tarotDeck.map((card, cardIndex) => (
          <TarotCard
            key={cardIndex}
            mode="back"
            cardIndex={cardIndex}
            card={card}
            isSelected={selectedIndexes.includes(cardIndex)}
            onSelect={onToggle}
          />
        ))}
      </div>
    </div>
  );
}
