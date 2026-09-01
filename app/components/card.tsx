"use client";

import type { CSSProperties } from "react";
import type { TarotCard } from "@/lib/types";
import { CardBack } from "@/app/components/card-back";
import { CardFront } from "@/app/components/card-front";

type CardProps = {
  card: TarotCard;
  index?: number;
  isSelected: boolean;
  onSelect: (card: TarotCard) => void;
}

export function Card({
  card,
  index,
  isSelected,
  onSelect,
}: CardProps) {
  return (
    <button
      className={`cardBack ${isSelected ? "selected" : ""}`}
      onClick={() => onSelect(card)}
      type="button"
      style={
        {
          "--card-index": index,
        } as CSSProperties
      }
    >
      <span className="cardInner ">
        <CardBack />
        <CardFront card={isSelected ? card : undefined} />
      </span>
    </button>
  );
}