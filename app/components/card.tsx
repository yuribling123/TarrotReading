"use client";

import type { CSSProperties } from "react";
import type { CardBounds, TarotCard } from "@/lib/types";
import { CardBack } from "@/app/components/card-back";
import { CardFront } from "@/app/components/card-front";

type CardProps = {
  card: TarotCard;
  index?: number;
  isSelected: boolean;
  disabled?: boolean;
  leaveEmptyWhenSelected?: boolean;
  onSelect: (card: TarotCard, source: CardBounds) => void | Promise<void>;
}

export function Card({
  card,
  index,
  isSelected,
  disabled = false,
  leaveEmptyWhenSelected = false,
  onSelect,
}: CardProps) {
  return (
    <button
      data-fan-card
      className={`cardBack ${isSelected ? "selected" : ""}`}
      aria-disabled={disabled || (isSelected && leaveEmptyWhenSelected)}
      disabled={isSelected && leaveEmptyWhenSelected}
      onClick={(event) => {
        if (disabled) return;
        const cardElement = event.currentTarget;
        if (leaveEmptyWhenSelected) cardElement.style.zIndex = "320";
        const rect = event.currentTarget.getBoundingClientRect();
        const width = event.currentTarget.offsetWidth;
        const height = event.currentTarget.offsetHeight;

        const selection = onSelect(card, {
          top: rect.top + (rect.height - height) / 2,
          left: rect.left + (rect.width - width) / 2,
          width,
          height,
        });

        void Promise.resolve(selection).finally(() => {
          cardElement.style.removeProperty("z-index");
        });
      }}
      type="button"
      style={
        {
          "--card-index": index,
        } as CSSProperties
      }
    >
      {isSelected && leaveEmptyWhenSelected ? (
        <span
          className="absolute inset-0.5 rounded-[inherit] border border-dashed border-[rgba(155,114,42,0.14)]"
          aria-hidden="true"
        />
      ) : (
        <span className="cardInner ">
          <CardBack />
          <CardFront card={isSelected ? card : undefined} />
        </span>
      )}
    </button>
  );
}
