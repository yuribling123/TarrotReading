import Image from "next/image";

export function CardBack() {
  return (
    <div className="cardFace">
      <Image
        src="/images/cards/card-back.webp"
        alt="Tarot card"
        fill
        className="cardArtwork"
        sizes="160px"
      />
    </div>
  );
}