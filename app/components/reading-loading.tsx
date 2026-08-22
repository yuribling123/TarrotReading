"use client";

import { useEffect, useState } from "react";
import { ReadingError } from "@/app/components/reading-error";
import { TarotCard } from "@/app/components/tarot-card";
import type { DrawnCard } from "@/lib/types";

type ReadingLoadingProps = {
  cards: DrawnCard[];
  complete: boolean;
  error: string;
  onRetry: () => void;
  retryLabel: string;
  stages: readonly string[];
};

export function ReadingLoading({ cards, complete, error, onRetry, retryLabel, stages }: ReadingLoadingProps) {
  const [stageIndex, setStageIndex] = useState(0);

  useEffect(() => {
    if (complete || stages.length < 2) {
      return;
    }

    const timer = window.setInterval(() => {
      setStageIndex((current) => (current + 1) % (stages.length - 1));
    }, 3200);

    return () => window.clearInterval(timer);
  }, [complete, stages.length]);

  return (
    <section className={`readingRitual ${complete ? "complete" : ""}`} aria-live="polite">
      <div className="ritualSky" aria-hidden="true">
        <span className="ritualMoon" />
        <span className="ritualStar ritualStarOne">✦</span>
        <span className="ritualStar ritualStarTwo">✧</span>
        <span className="ritualStar ritualStarThree">✦</span>
      </div>

      <p className="ritualStatus">{complete ? stages[stages.length - 1] : stages[stageIndex]}</p>

      <div className="ritualSpread">
        {cards.map((card, index) => (
          <TarotCard
            key={card.id}
            mode="revealed"
            card={card}
            index={index}
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

      <ReadingError actionLabel={retryLabel} message={error} onAction={onRetry} />
    </section>
  );
}
