"use client";

import type { ReadingResponse } from "@/lib/types";
import { ReadingVerdict } from "./reading-verdict";
import { ReadingZodiac } from "./reading-zodiac";

type ReadingResultProps = {
  reading: ReadingResponse;
  summaryLabel: string;
  zodiac: string | null;
};

export function ReadingResult({
  reading,
  summaryLabel,
}: ReadingResultProps) {
  return (
    <div>
      <ReadingVerdict verdict={reading.verdict} />
      <section className="reading border-0!">
        {/* <p className="spreadLens ">{reading.spreadName}</p> */}
        <div className="readingGrid  ">
          {reading.cards.map((card, index) => {
            return (
              <article
                key={card.position}
                className={"border-b border-[#7f5b1f]/15! "}
              >
                <span className="font-semibold text-[#7f5b1f]!">{card.position}</span>

                <p className="font-semibold">
                  {card.title}
                  <span className="mx-1">·</span>
                  <span className="font-normal! text-[black]/80 ">
                    {card.orientation}
                  </span>
                </p>

                <p className="mt-3 text-[0.89rem]">
                  {card.message}
                </p>
              </article>
            );
          })}
        </div>
        <div className="synthesis border-b! border-[#7f5b1f]/15!">
          <h3 style={{ fontWeight: 620 }}>{summaryLabel}</h3>
          <p className="text-[0.89rem] leading-7!">{reading.answer}</p>
          <p className="text-[0.89rem] pt-2 pb-6 leading-7!">{reading.guidance}</p>
        </div>
      </section>

      {reading.zodiac && (

        <ReadingZodiac zodiac={reading.zodiac} />

      )}
    </div>
  );
}
