"use client";

import { Card } from "@/app/components/cards/card";
import type { CardBounds, TarotCard } from "@/lib/types";
import { useCardFanLayout } from "./use-card-fan-layout";

type CardFanProps = {
  deck: TarotCard[];
  selectedCards: TarotCard[];
  interactionLocked?: boolean;
  onSelect: (card: TarotCard, source: CardBounds) => void | Promise<void>;
};

export function CardFan({
  deck,
  selectedCards,
  interactionLocked = false,
  onSelect,
}: CardFanProps) {
  const { isReady, viewportRef } = useCardFanLayout();

  return (
    <div
      ref={viewportRef}
      className="cardFanViewport max-w-full touch-pan-x overflow-x-auto overflow-y-hidden overscroll-x-contain  scrollbar-none mt-40 max-[520px]:w-full max-[520px]:mt-20 max-[1024px]:mt-30 "
    >
      <div
        className={`cardFan spreadOut flex w-max items-end transition-opacity duration-500 ease-out ${
          isReady ? "opacity-100" : "opacity-0"
        }`}
      >
        {deck.map((card, index) => (
          <Card
            key={card.name}
            card={card}
            index={index}
            disabled={interactionLocked}
            leaveEmptyWhenSelected
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
