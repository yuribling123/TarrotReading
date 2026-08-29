"use client";

import { useEffect, useState } from "react";
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
  const [spread, setSpread] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setSpread(true);
    }, 250);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="cardFanViewport pt-9 pb-8 ">
      <div className={`cardFan ${spread ? "spreadOut" : "stacked"}`}>
        {deck.map((card, index) => (
          <Card
            key={card.name}
            card={card}
            index={index}
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