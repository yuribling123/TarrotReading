"use client";

import type { CSSProperties } from "react";
import type { DrawnCard, TarotCard as TarotCardData } from "@/lib/types";

type TarotCardProps =
  | {
      mode: "back";
      cardIndex: number;
      card: TarotCardData;
      isSelected: boolean;
      onSelect: (cardIndex: number) => void;
    }
  | {
      mode: "revealed";
      card: DrawnCard;
      index: number;
      position?: string;
    };

export function TarotCard(props: TarotCardProps) {
  if (props.mode === "back") {
    const { cardIndex, card, isSelected, onSelect } = props;

    return (
      <button
        className={`cardBack ${isSelected ? "selected" : ""}`}
        onClick={() => onSelect(cardIndex)}
        style={
          {
            "--card-delay": `${cardIndex * 45}ms`,
            "--card-order": isSelected ? 100 + cardIndex : cardIndex,
            "--card-tilt": "0deg",
          } as CSSProperties
        }
        type="button"
        aria-label={`Card ${cardIndex + 1}${isSelected ? " selected" : ""}`}
      >
        <span className="cardInner">
          <span className="cardBackFace">
            <span className="cardMoon" />
            <span className="cardStar">✦</span>
          </span>
          <span className="cardFrontFace">
            {card.imageSrc && <img alt={card.name} className="cardArtwork" src={card.imageSrc} />}
          </span>
        </span>
      </button>
    );
  }

  const { card, index, position } = props;

  return (
    <article
      className={`tarotCard revealCard ${card.orientation === "Reversed" ? "reversed" : ""}`}
      style={{ "--reveal-delay": `${index * 260}ms` } as CSSProperties}
    >
      {position && <span className="position">{position}</span>}
      <div className="cardFace">
        {card.imageSrc && <img alt={card.name} className="cardArtwork" src={card.imageSrc} />}
      </div>
    </article>
  );
}
