"use client";

import { useEffect, useState } from "react";

import { ReadingError } from "@/app/components/reading-error";
import { Card } from "@/app/components/card";
import type { TarotCard } from "@/lib/types";

type ReadingLoadingProps = {
  cards: TarotCard[];
  complete: boolean;
  onRetry: () => void;
  retryLabel: string;
  stages: readonly string[];
};

export function ReadingLoading({
  cards,
  complete,
  onRetry,
  retryLabel,
  stages,
}: ReadingLoadingProps) {
  const [stageIndex, setStageIndex] = useState(0);

  // Cycle through loading messages until the reading is complete.
  useEffect(() => {
    if (complete || stages.length < 2) {
      return;
    }

    const timer = window.setInterval(() => {
      setStageIndex(
        (current) => (current + 1) % (stages.length - 1)
      );
    }, 3200);

    return () => window.clearInterval(timer);
  }, [complete, stages.length]);

  return (
    <section
      className={`readingRitual translate-y-10 ${complete ? "complete" : ""}`}
      aria-live="polite"
    >
      <div className="ritualSky" aria-hidden="true">
        <span className="ritualMoon" />
        <span className="ritualStar ritualStarOne">✦</span>
        <span className="ritualStar ritualStarTwo">✧</span>
        <span className="ritualStar ritualStarThree">✦</span>
      </div>

      <p className="ritualStatus">
        {complete
          ? stages[stages.length - 1]
          : stages[stageIndex]}
      </p>

      <div className="spread">
        {cards.map((card) => (
          <Card
            key={card.name}
            card={card}
            isSelected
            onSelect={() => {}}
          />
        ))}
      </div>

      <div className="ritualThread" aria-hidden="true">
        <span />
        <i />
        <span />
        <i />
        <span />
      </div>

    </section>
  );
}