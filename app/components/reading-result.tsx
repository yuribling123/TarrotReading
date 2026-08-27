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
              <p style={{ fontWeight: 600 }}>{card.title}</p>
              <p className="cardOrientation">{card.orientation}</p>
              <p className="text-[0.89rem]">{card.message}</p>
            </article>
          );
        })}
      </div>
      <div className="synthesis">
        <h3 style={{ fontWeight: 600 }}>{summaryLabel}</h3>
        <p className="text-[0.89rem]">{reading.answer}</p>
        <p className="text-[0.89rem] pt-2">{reading.guidance}</p>
      </div>
    </section>
  );
}
