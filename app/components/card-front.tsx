import type { TarotCard } from "@/lib/types";
import { getTarotCardImageSrc } from "@/lib/tarot/card-image";

type CardFrontProps = {
  card?: TarotCard;
};

export function TarotCardArtwork({ card }: { card: TarotCard }) {
  const imageSrc = getTarotCardImageSrc(card.name);

  return (
    <img
      src={imageSrc}
      alt={card.name}
      className={`h-full w-full rounded-xl object-fill ${card.orientation === "Reversed" ? "rotate-180" : ""}`}
    />
  );
}

export function CardFront({ card }: CardFrontProps) {
  if (!card) {
    return <span className="cardFrontFace" />;
  }

  return (
    <span className="cardFrontFace border! rounded-[13px] border-[#9d9890]/70">
      <TarotCardArtwork card={card} />

    </span>
  );
}
