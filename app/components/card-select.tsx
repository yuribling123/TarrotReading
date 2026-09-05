import { CardFan } from "@/app/components/card-fan";
import { QuestionSummary } from "@/app/components/question-summary";
import { messages } from "@/lib/i18n";
import type { Language, TarotCard } from "@/lib/types";
import { ZodiacReadingOption } from "./zodiac-reading";
import { Button } from "@/components/ui/button";
import { OpeningRitual } from "./ritual";
import { useCallback, useRef, useState } from "react";
import { SelectedZodiac } from "./dialog/zodiac-selected";
import { SelectedCardSlots } from "./selected-card-slots";
import { FlyingCard } from "./flying-card";
import type { CardBounds, CardFlight } from "@/lib/types";

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
  const [flight, setFlight] = useState<CardFlight | null>(null);
  const [flightApproaching, setFlightApproaching] = useState(false);
  const slotsRef = useRef<HTMLDivElement>(null);
  const canReveal = selectedCards.length === 3;
  const text = messages[language];

  const approachSlot = useCallback(() => setFlightApproaching(true), []);
  const completeFlight = useCallback(() => {
    setFlight(null);
    setFlightApproaching(false);
  }, []);

  function selectFromFan(card: TarotCard, source: CardBounds) {
    if (flight || selectedCards.length >= 3) return;

    const slot = slotsRef.current?.querySelector<HTMLElement>(
      `[data-selected-slot="${selectedCards.length}"]`,
    );
    if (!slot) return;

    const { top, left, width, height } = slot.getBoundingClientRect();
    setFlightApproaching(false);
    setFlight({ card, source, target: { top, left, width, height } });
    onSelect(card);
  }



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
      <section className="deckArea selectionDeckArea pt-45">
                  <p className=" text-center text-[12px] tracking-[0.08em] text-[#7f5b1f]">{text.selectionInstructionSecondLine}</p>
        <div className="selectionStars pt-5">
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

        <div>
          {zodiac ? (
            <SelectedZodiac zodiac={zodiac} />
          ) : (
            <ZodiacReadingOption onConfirm={setZodiac} />
          )}
        </div>

        <div ref={slotsRef}>
          <SelectedCardSlots
            cards={selectedCards}
            flyingCardName={flight && !flightApproaching ? flight.card.name : undefined}
          />
        </div>

        <div className="h-15 mt-15 flex items-center justify-center">
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

        <CardFan
          deck={deck}
          selectedCards={selectedCards}
          interactionLocked={Boolean(flight)}
          onSelect={selectFromFan}
        />

        {flight && (
          <FlyingCard
            flight={flight}
            onApproach={approachSlot}
            onComplete={completeFlight}
          />
        )}

      </section>


    </div>
  );
}
