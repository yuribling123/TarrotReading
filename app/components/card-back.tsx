import Image from "next/image";

export function CardBack() {
  return (
    <div className="cardFace">
      <img

        src="/images/cards/card-back-2.jpg"
        alt="Tarot card"
        className="cardArtwork"

      />
    </div>
  );
}