import Image from "next/image";

export function CardBack() {
  return (
    <span className="cardBackFace">
      <img

        src="/images/cards/card-back-2.jpg"
        alt="Tarot card"
        className="h-full w-full rounded-xl object-fill"

      />
    </span>
  );
}
