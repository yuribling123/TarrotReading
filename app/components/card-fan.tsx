"use client";

import { useEffect, useRef, useState } from "react";
import { Card } from "@/app/components/card";
import type { CardBounds, TarotCard } from "@/lib/types";

type CardFanProps = {
  deck: TarotCard[];
  selectedCards: TarotCard[];
  interactionLocked?: boolean;
  onSelect: (card: TarotCard, source: CardBounds) => void | Promise<void>;
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
  const [isReady, setIsReady] = useState(false);
  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    let activeCard: HTMLElement | null = null;
    let lastHapticAt = 0;
    let hasUserMovedFan = false;

    const centerInitialCard = () => {
      const cards = viewport.querySelectorAll<HTMLElement>("[data-fan-card]");
      if (!cards.length) return;

      const rightMiddleIndex = Math.floor(cards.length / 2);
      const rightMiddleCard = cards[rightMiddleIndex];
      const leftMiddleCard = cards[Math.max(0, rightMiddleIndex - 1)];
      const leftCenter = leftMiddleCard.offsetLeft + leftMiddleCard.offsetWidth / 2;
      const rightCenter = rightMiddleCard.offsetLeft + rightMiddleCard.offsetWidth / 2;
      const deckCenter = cards.length % 2 === 0
        ? (leftCenter + rightCenter) / 2
        : rightCenter;

      viewport.scrollLeft = deckCenter - viewport.clientWidth / 2;
    };

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

        if (!card.classList.contains("selected") && distance < nearestDistance) {
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

    const observer = new ResizeObserver(() => {
      if (!hasUserMovedFan) centerInitialCard();
      positionCards();
    });
    observer.observe(viewport);
    viewport.addEventListener("scroll", handleScroll, { passive: true });
    const markAsUserMoved = () => {
      hasUserMovedFan = true;
    };
    viewport.addEventListener("pointerdown", markAsUserMoved, { passive: true });
    viewport.addEventListener("wheel", markAsUserMoved, { passive: true });

    const frame = window.requestAnimationFrame(() => {
      centerInitialCard();
      positionCards();
      setIsReady(true);
    });

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      viewport.removeEventListener("scroll", handleScroll);
      viewport.removeEventListener("pointerdown", markAsUserMoved);
      viewport.removeEventListener("wheel", markAsUserMoved);
    };
  }, []);

  return (
    <div
      ref={viewportRef}
      className="cardFanViewport max-w-full touch-pan-x overflow-x-auto overflow-y-hidden overscroll-x-contain  scrollbar-none mt-40 max-[520px]:w-full max-[520px]:mt-10 max-[1024px]:mt-30 "
    >
      <div
        className={`cardFan spreadOut flex w-max items-end transition-opacity duration-500 ease-out ${
          isReady ? "opacity-100" : "opacity-0"
        }`}
      >
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
