"use client";

import type { ReadingResponse } from "@/lib/types";

type ReadingResultProps = {
  reading: ReadingResponse;
  summaryLabel: string;
};

export function ReadingResult({
  reading,
  summaryLabel,
}: ReadingResultProps) {
  return (
    <section className="reading">
      <p className="spreadLens">{reading.spreadName}</p>
      <div className="readingGrid">
        {reading.cards.map((card) => {
          return (
            <article key={card.position}>
              <span>{card.position}</span>
              <h3>{card.title}</h3>
              <p className="cardOrientation">{card.orientation}</p>
              {card.message && <p>{card.message}</p>}
            </article>
          );
        })}
      </div>
      <div className="synthesis">
        <h3>{summaryLabel}</h3>
        {reading.answer && <p className="readingAnswer">{reading.answer}</p>}
        {reading.guidance && <p>{reading.guidance}</p>}
      </div>
    </section>
  );
}
