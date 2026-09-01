import type { TarotCard } from "@/lib/types";

type CardFrontProps = {
  card?: TarotCard;
};

export function CardFront({ card }: CardFrontProps) {
  if (!card) {
    return <span className="cardFrontFace" />;
  }

  const imageName = card.name.replaceAll(" ", "_");
  const imageSrc = `/images/cards/rider-waite/${imageName}.webp`;

  return (
    <span className="cardFrontFace border! rounded-[13px] border-[#9d9890]/70">
      <img
        src={imageSrc}
        alt={card.name}
        className={`cardArtwork ${card.orientation === "Reversed" ? "reversed" : ""
          }`}
      />

    </span>
  );
}