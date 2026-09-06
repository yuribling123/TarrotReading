"use client";

import { useEffect, useRef } from "react";
import { CardBack } from "@/app/components/card-back";
import { CardFront } from "@/app/components/card-front";
import type { CardFlight, TarotCard } from "@/lib/types";

type SelectedCardSlotsProps = {
  cards: TarotCard[];
  flight: CardFlight | null;
  onFlightComplete: () => void;
};

const FLIGHT_DURATION_MS = 560;

function SelectedSlotCard({
  card,
  flight,
  onComplete,
}: {
  card: TarotCard;
  flight?: CardFlight;
  onComplete: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = cardRef.current;
    if (!element || !flight) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onComplete();
      return;
    }

    const deltaX = flight.source.left - flight.target.left;
    const deltaY = flight.source.top - flight.target.top;
    const scale = flight.source.width / flight.target.width;
    const animation = element.animate(
      [
        { transform: `translate3d(${deltaX}px, ${deltaY}px, 0) scale(${scale})` },
        { transform: "translate3d(0, 0, 0) scale(1)" },
      ],
      {
        duration: FLIGHT_DURATION_MS,
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
        fill: "forwards",
      },
    );

    animation.finished.then(onComplete).catch(() => undefined);
    return () => animation.cancel();
  }, [flight, onComplete]);

  return (
    <div
      ref={cardRef}
      className="absolute inset-0 h-full w-full origin-top-left rounded-[inherit]"
    >
      <span
        className="cardInner"
        style={{
          transform: "rotateY(180deg)",
          animation: flight
            ? "selected-card-flip 460ms cubic-bezier(0.22, 1, 0.36, 1) forwards"
            : undefined,
        }}
      >
        <CardBack />
        <CardFront card={card} />
      </span>
    </div>
  );
}

export function SelectedCardSlots({
  cards,
  flight,
  onFlightComplete,
}: SelectedCardSlotsProps) {
  return (
    <div
      className="flex justify-center gap-3 max-[520px]:mt-[clamp(30px,4.5svh,42px)]"
      aria-label="Selected tarot cards"
    >
      {[0, 1, 2].map((index) => {
        const card = cards[index];
        const cardFlight = card?.name === flight?.card.name ? flight : undefined;

        return (
          <div
            key={index}
            className={`
              relative aspect-[701/1200] w-[var(--selection-card-width)] rounded-[7px]
              border border-dashed border-[rgba(155,114,42,0.22)]
              after:absolute after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2
              after:text-[0.65rem] after:text-[rgba(155,114,42,0.24)] after:content-['✦']
              ${card ? "border-solid shadow-[0_5px_16px_rgba(41,36,56,0.13)] after:hidden" : ""}
              ${cardFlight ? "z-[1000] overflow-visible" : "overflow-hidden"}
            `}
            data-selected-slot={index}
          >
            {card && (
              <SelectedSlotCard
                card={card}
                flight={cardFlight}
                onComplete={onFlightComplete}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
