"use client";

import { useEffect, useRef, useState } from "react";
import { Card } from "@/app/components/card";
import type { CardBounds, TarotCard } from "@/lib/types";

type CardFanProps = {
  deck: TarotCard[];
  selectedCards: TarotCard[];
  interactionLocked?: boolean;
  onSelect: (card: TarotCard, source: CardBounds) => void;
};

const CENTER_ACTIVATION_DISTANCE = 0.12;
const CENTER_HAPTIC_MS = 8;
const CENTER_HAPTIC_INTERVAL_MS = 90;

export function CardFan({
  deck,
  selectedCards,
  interactionLocked = false,
  onSelect,
}: CardFanProps) {
  const [spread, setSpread] = useState(false);
  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    let activeCard: HTMLElement | null = null;
    let lastHapticAt = 0;

    const positionCards = (allowHaptic = false) => {
      const viewportCenter = viewport.clientWidth / 2;
      const curveRadius = Math.max(viewport.clientWidth * 0.58, 220);
      const cards = viewport.querySelectorAll<HTMLElement>("[data-fan-card]");
      let nearestCard: HTMLElement | null = null;
      let nearestDistance = Number.POSITIVE_INFINITY;

      cards.forEach((card) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2 - viewport.scrollLeft;
        const normalized = Math.max(-1.35, Math.min(1.35, (cardCenter - viewportCenter) / curveRadius));
        const distance = Math.abs(normalized);

        card.style.setProperty("--fan-y", `${Math.pow(distance, 1.75) * 118}px`);
        card.style.setProperty("--fan-angle", `${normalized * 34}deg`);
        card.style.setProperty("--fan-layer", `${200 - Math.round(distance * 100)}`);

        if (distance < nearestDistance) {
          nearestCard = card;
          nearestDistance = distance;
        }
      });

      const nextActiveCard: HTMLElement | null = nearestDistance <= CENTER_ACTIVATION_DISTANCE
        ? (nearestCard as HTMLElement | null)
        : null;

      if (nextActiveCard !== activeCard) {
        activeCard?.removeAttribute("data-center-active");
        nextActiveCard?.setAttribute("data-center-active", "true");

        const now = performance.now();
        if (
          allowHaptic &&
          activeCard &&
          nextActiveCard &&
          now - lastHapticAt >= CENTER_HAPTIC_INTERVAL_MS &&
          "vibrate" in navigator
        ) {
          navigator.vibrate(CENTER_HAPTIC_MS);
          lastHapticAt = now;
        }

        activeCard = nextActiveCard;
      }
    };

    const handleScroll = () => positionCards(true);

    const observer = new ResizeObserver(() => positionCards());
    observer.observe(viewport);
    viewport.addEventListener("scroll", handleScroll, { passive: true });

    const timer = window.setTimeout(() => {
      viewport.scrollLeft = (viewport.scrollWidth - viewport.clientWidth) / 2;
      positionCards();
      setSpread(true);
    }, 250);

    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
      viewport.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div ref={viewportRef} className="cardFanViewport pt-12 pb-16">
      <div className={`cardFan ${spread ? "spreadOut" : "stacked"}`}>
        {deck.map((card, index) => (
          <Card
            key={card.name}
            card={card}
            index={index}
            disabled={interactionLocked}
            leaveEmptyWhenSelected
            isSelected={selectedCards.some(
              (selectedCard) => selectedCard.name === card.name
            )}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}
