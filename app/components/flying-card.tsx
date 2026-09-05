"use client";

import { useEffect, useRef } from "react";
import { CardBack } from "@/app/components/card-back";
import { CardFront } from "@/app/components/card-front";
import type { CardFlight } from "@/lib/types";

type FlyingCardProps = {
  flight: CardFlight;
  onApproach: () => void;
  onComplete: () => void;
};

const FLIGHT_DURATION_MS = 560;
const SLOT_HANDOFF_LEAD_MS = 70;

export function FlyingCard({ flight, onApproach, onComplete }: FlyingCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = cardRef.current;
    if (!element) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      onApproach();
      onComplete();
      return;
    }

    const deltaX = flight.target.left - flight.source.left;
    const deltaY = flight.target.top - flight.source.top;
    const scale = flight.target.width / flight.source.width;
    const animation = element.animate(
      [
        { transform: "translate3d(0, 0, 0) scale(1)" },
        { transform: `translate3d(${deltaX}px, ${deltaY}px, 0) scale(${scale})` },
      ],
      { duration: FLIGHT_DURATION_MS, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "forwards" },
    );

    const handoffTimer = window.setTimeout(
      onApproach,
      FLIGHT_DURATION_MS - SLOT_HANDOFF_LEAD_MS,
    );

    animation.finished.then(onComplete).catch(() => undefined);
    return () => {
      window.clearTimeout(handoffTimer);
      animation.cancel();
    };
  }, [flight, onApproach, onComplete]);

  return (
    <div
      ref={cardRef}
      className="flyingCard"
      style={{
        top: flight.source.top,
        left: flight.source.left,
        width: flight.source.width,
        height: flight.source.height,
      }}
      aria-hidden="true"
    >
      <span className="cardInner">
        <CardBack />
        <CardFront card={flight.card} />
      </span>
    </div>
  );
}
