import Image from "next/image";
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
    <span className="cardFrontFace">
      <Image
        src={imageSrc}
        alt={card.name}
        fill
        sizes="160px"
        className={`cardArtwork ${card.orientation === "Reversed" ? "reversed" : ""

          }`}
      />
    </span>
  );
}