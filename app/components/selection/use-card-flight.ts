"use client";

import { useCallback, useRef, useState } from "react";

import { getTarotCardImageSrc } from "@/lib/tarot/card-image";
import type { CardBounds, CardFlight, TarotCard } from "@/lib/types";

type UseCardFlightOptions = {
  onSelect: (card: TarotCard) => void;
  selectedCards: TarotCard[];
};

export function useCardFlight({ onSelect, selectedCards }: UseCardFlightOptions) {
  const [flight, setFlight] = useState<CardFlight | null>(null);
  const [flightFaceReady, setFlightFaceReady] = useState(false);
  const slotsRef = useRef<HTMLDivElement>(null);
  const selectionLockRef = useRef(false);
  const preparedImageRef = useRef<HTMLImageElement | null>(null);
  const flightMotionDoneRef = useRef(false);
  const flightFlipDoneRef = useRef(false);

  const finishFlight = useCallback(() => {
    setFlight(null);
    setFlightFaceReady(false);
    preparedImageRef.current = null;
    selectionLockRef.current = false;
  }, []);

  const finishFlightWhenReady = useCallback(() => {
    if (flightMotionDoneRef.current && flightFlipDoneRef.current) {
      finishFlight();
    }
  }, [finishFlight]);

  const completeFlightMotion = useCallback(() => {
    flightMotionDoneRef.current = true;
    finishFlightWhenReady();
  }, [finishFlightWhenReady]);

  async function selectFromFan(card: TarotCard, source: CardBounds) {
    if (selectionLockRef.current || flight || selectedCards.length >= 3) return;

    const slot = slotsRef.current?.querySelector<HTMLElement>(
      `[data-selected-slot="${selectedCards.length}"]`,
    );
    if (!slot) return;

    selectionLockRef.current = true;
    flightMotionDoneRef.current = false;
    flightFlipDoneRef.current = false;
    setFlightFaceReady(false);

    const preparedImage = new window.Image();
    preparedImage.src = getTarotCardImageSrc(card.name);
    preparedImageRef.current = preparedImage;

    const { top, left, width, height } = slot.getBoundingClientRect();
    setFlight({ card, source, target: { top, left, width, height } });
    onSelect(card);

    try {
      await preparedImage.decode();
    } catch {
      // Let the browser use its normal image fallback if explicit decoding fails.
    }

    setFlightFaceReady(true);
    const flipDuration = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? 0
      : 460;
    window.setTimeout(() => {
      flightFlipDoneRef.current = true;
      finishFlightWhenReady();
    }, flipDuration);
  }

  return {
    completeFlightMotion,
    flight,
    flightFaceReady,
    selectFromFan,
    slotsRef,
  };
}
