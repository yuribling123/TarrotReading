import { CardFan } from "@/app/components/card-fan";
import { QuestionSummary } from "@/app/components/question-summary";
import { messages } from "@/lib/i18n";
import type { Language, TarotCard } from "@/lib/types";
import { ZodiacReadingOption } from "./zodiac-reading";
import { Button } from "@/components/ui/button";
import { OpeningRitual } from "./ritual";
import { useState } from "react";
import { SelectedZodiac } from "./dialog/zodiac-selected";

type CardSelectProps = {
  language: Language;
  deck: TarotCard[];
  selectedCards: TarotCard[];
  question: string;
  onSelect: (card: TarotCard) => void;
  onReveal: () => void;
  zodiac: string | null;
  setZodiac: (zodiac: string) => void;
};

export function CardSelect({
  zodiac,
  setZodiac,
  language,
  deck,
  selectedCards,
  question,
  onSelect,
  onReveal,
}: CardSelectProps) {
  // Only reveal when three cards selected
  const [ritualDone, setRitualDone] = useState(false);
  const canReveal = selectedCards.length === 3;
  const text = messages[language];



  // 仪式还没结束：只显示仪式
  if (!ritualDone) {
    return (
      <OpeningRitual
        onComplete={() => setRitualDone(true)}
      />
    );
  }

  return (
    <div >
      <section className="deckArea pt-45">
        <div className="selectionStars">
          {[0, 1, 2].map((index) => (
            <span
              key={index}
              className={
                index < selectedCards.length
                  ? "selectionStar active"
                  : "selectionStar"
              }
            >
              ★
            </span>
          ))}
        </div>

        <div className="deckHeader">

          <p className="translate-y-4 tracking-[0.03em] text-[#7f5b1f]">{text.selectionInstructionSecondLine}</p>
        </div>

        <CardFan
          deck={deck}
          selectedCards={selectedCards}
          onSelect={onSelect}
        />

        {zodiac ? (
          <SelectedZodiac zodiac={zodiac} />): (
          <ZodiacReadingOption onConfirm={setZodiac} />
        )}

        <div className="h-15 mt-4 flex items-center justify-center">
          {canReveal && (
            <Button
              variant="secondary"
              onClick={onReveal}
              className="
        flex
        text-[14px] h-15 w-21
        font-bold rounded-full
        tracking-[0.06em]
        shadow-[0_6px_18px_rgba(41,36,56,0.22)]
        hover:scale-105
        active:scale-85
        animate-in fade-in zoom-in-90
        duration-800
        delay-800
        fill-mode-both
      "
            >
              Reveal
            </Button>
          )}
        </div>

      </section>


    </div>
  );
}