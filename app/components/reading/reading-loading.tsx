"use client";

import { useEffect, useState } from "react";

import { ReadingCardSpread } from "@/app/components/cards/reading-card-spread";
import { ShootingStars } from "../shared/shooting-star";

import type { TarotCard } from "@/lib/types";

type ReadingLoadingProps = {
  cards: TarotCard[];
  complete: boolean;
  stages: readonly string[];
};

export function ReadingLoading({
  cards,
  complete,
  stages,
}: ReadingLoadingProps) {
  const [stageIndex, setStageIndex] = useState(0);

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
    <div className="relative min-h-[calc(100svh-76px)] w-full overflow-hidden">
      {/* 流星背景 */}
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        aria-hidden="true"
      >
        <ShootingStars active />
      </div>

      {/* 原本 Loading 内容 */}
      <section
        className={`readingRitual relative z-10 mx-auto flex w-full flex-col items-center px-6 pt-40 text-center ${complete ? "complete" : ""
          }`}
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

        <ReadingCardSpread
          cards={cards}
          className="pt-10"
        />

        <div className="ritualThread" aria-hidden="true">
          <span />
          <i />
          <span />
          <i />
          <span />
        </div>
      </section>
    </div>
  );
}