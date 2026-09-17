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
      <section className="mt-2 w-full max-w-[780px] rounded-xl border-0! bg-white px-8 py-7 max-[520px]:px-[14px] max-[520px]:py-[18px]">
        <div className="grid grid-cols-3 items-stretch gap-4 max-[860px]:grid-cols-1 max-[860px]:gap-2">
          {reading.cards.map((card) => {
            return (
              <article
                key={card.position}
                className="min-h-0 overflow-visible border-b border-[#7f5b1f]/15! bg-white px-5 py-5 leading-[1.65] max-[860px]:px-4 max-[860px]:py-[14px]"
              >
                <span className=" text-[#7f5b1f]!">{card.position}</span>

                <p className="font-medium max-[860px]:[overflow-wrap:anywhere] max-[860px]:whitespace-normal text-black/75 ">
                  {card.title}
                  <span className="mx-1">·</span>
                  <span className=" text-[black]/50 ">
                    {card.orientation}
                  </span>
                </p>

                <p className="mt-3 text-[0.89rem] text-black/75 max-[860px]:[overflow-wrap:anywhere] max-[860px]:whitespace-normal">
                  {card.message}
                </p>
              </article>
            );
          })}
        </div>
        <div className="mt-4 border-b! border-[#7f5b1f]/15! bg-white px-5 py-5 leading-[1.65]">
          <h3 className="text-black/75 my-[6px] overflow-hidden text-ellipsis whitespace-nowrap text-[1rem]" style={{ fontWeight: 520 }}>{summaryLabel}</h3>
          <p className="text-[0.89rem] leading-7! text-black/75">{reading.answer}</p>
          <p className="text-[0.89rem] pt-2 pb-6 leading-7! text-black/75">{reading.guidance}</p>
        </div>
      </section>

      {reading.zodiac && (

        <ReadingZodiac zodiac={reading.zodiac} />

      )}
    </div>
  );
}
