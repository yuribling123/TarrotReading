import Image from "next/image";

export function CardBack() {
  return (
    <div className="cardFace">
      <img

        src="/images/cards/card-back.webp"
        alt="Tarot card"
        className="cardArtwork"

      />
    </div>
  );
}