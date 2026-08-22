"use client";

import type { TarotCard } from "@/lib/types";
import { CardBack } from "@/app/components/card-back";
import { CardFront } from "@/app/components/card-front";

type CardProps = {
  card: TarotCard;
  isSelected: boolean;
  onSelect: (card: TarotCard) => void;
};

export function Card({
  card,
  isSelected,
  onSelect,
}: CardProps) {
  return (
    <button
      className={`cardBack ${isSelected ? "selected" : ""}`}
      onClick={() => onSelect(card)}
      type="button"
    >
      <span className="cardInner">
        <CardBack />
        <CardFront card={isSelected ? card : undefined} />
      </span>
    </button>
  );
}