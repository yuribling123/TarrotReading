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
  stages,
}: ReadingLoadingProps) {
  const [stageIndex, setStageIndex] = useState(0); //记录现在显示第几句话

  // Cycle through loading messages until the reading is complete.
  useEffect(() => {
    if (complete || stages.length < 2) {
      return;
    }
    //每 3.2 秒换一次加载句子
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
      {/* 星月背景 */}
      <div className="ritualSky" aria-hidden="true">
        <span className="ritualMoon" />
        <span className="ritualStar ritualStarOne">✦</span>
        <span className="ritualStar ritualStarTwo">✧</span>
        <span className="ritualStar ritualStarThree">✦</span>
      </div>
      {/* 加载句子 */}
      <p className="ritualStatus">
        {complete
          ? stages[stages.length - 1]
          : stages[stageIndex]}
      </p>
      {/* 卡片 */}
      <div className="spread pt-10">
        {cards.map((card) => (
          <Card
            key={card.name}
            card={card}
            isSelected
            onSelect={() => {}}
          />
        ))}
      </div>
      {/* 卡牌下的装饰 */}
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