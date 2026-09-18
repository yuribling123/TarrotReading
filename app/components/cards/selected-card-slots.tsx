"use client";

import { useEffect, useRef } from "react";

import { CardBack } from "@/app/components/cards/card-back";
import { CardFront } from "@/app/components/cards/card-front";
import type { CardFlight, TarotCard } from "@/lib/types";

type SelectedCardSlotsProps = {
  cards: TarotCard[];
  flight: CardFlight | null;
  flightFaceReady: boolean;
  onFlightComplete: () => void;
  isChanneling?: boolean;
};

type SelectedSlotCardProps = {
  card: TarotCard;
  flight?: CardFlight;
  faceReady: boolean;
  onComplete: () => void;
  isChanneling?: boolean;
};

const FLIGHT_DURATION_MS = 560;


export function SelectedCardSlots({
  cards,
  flight,
  flightFaceReady,
  onFlightComplete,
  isChanneling = false,
}: SelectedCardSlotsProps) {
  return (
    <div
      className="flex justify-center gap-3"
      aria-label="Selected tarot cards"
    >
      {[0, 1, 2].map((index) => {
        const card = cards[index];

        const cardFlight =
          card?.name === flight?.card.name
            ? flight
            : undefined;

        return (
          <div
            key={index}
            data-selected-slot={index}
            className={`
              relative
              aspect-[701/1200]
              w-[var(--selection-card-width)]
              rounded-[7px]

              border
              border-dashed
              border-[rgba(155,114,42,0.22)]

              after:absolute
              after:left-1/2
              after:top-1/2
              after:-translate-x-1/2
              after:-translate-y-1/2
              after:text-[0.65rem]
              after:text-[rgba(155,114,42,0.24)]
              after:content-['✦']

              ${
                card
                  ? "border-solid shadow-[0_5px_16px_rgba(41,36,56,0.13)] after:hidden"
                  : ""
              }

              ${
                cardFlight || (card && isChanneling)
                  ? "overflow-visible"
                  : "overflow-hidden"
              }

              ${cardFlight ? "z-[1000]" : ""}
            `}
          >
            {card && (
              <>
                {/* 长按时牌后面的金色呼吸光 */}
                <div
                  aria-hidden="true"
                  className={`
                    pointer-events-none
                    absolute -inset-4 z-0
                    rounded-[12px]

                    bg-[radial-gradient(ellipse_at_center,rgba(227,195,109,0.75)_0%,rgba(215,181,109,0.40)_40%,rgba(215,181,109,0.12)_65%,transparent_78%)]

                    blur-xl
                    transition-opacity
                    duration-500
                    ease-out

                    ${
                      isChanneling
                        ? "opacity-0"
                        : "opacity-0"
                    }
                  `}
                />

                <SelectedSlotCard
                  card={card}
                  flight={cardFlight}
                  faceReady={!cardFlight || flightFaceReady}
                  onComplete={onFlightComplete}
                  isChanneling={isChanneling}
                />
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}


function SelectedSlotCard({
  card,
  flight,
  faceReady,
  onComplete,
  isChanneling,
}: SelectedSlotCardProps) {
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
        {
          transform: `translate3d(${deltaX}px, ${deltaY}px, 0) scale(${scale})`,
        },
        {
          transform: "translate3d(0, 0, 0) scale(1)",
        },
      ],
      {
        duration: FLIGHT_DURATION_MS,
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
        fill: "forwards",
      },
    );

    animation.finished
      .then(onComplete)
      .catch(() => undefined);

    return () => animation.cancel();
  }, [flight, onComplete]);

  return (
    <div
      ref={cardRef}
      className={`
        absolute inset-0 z-10
        h-full w-full
        origin-top-left
        rounded-[inherit]

        ${isChanneling ? "animate-pulse" : ""}
      `}
    >
      <span
        className="cardInner"
        style={{
          transform:
            !flight || faceReady
              ? "rotateY(180deg)"
              : "rotateY(0deg)",

          animation:
            flight && faceReady
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