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
import type { CardBounds, CardFlight } from "@/lib/types";
import { getTarotCardImageSrc } from "@/lib/tarot/card-image";

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
  const [isPreparingCard, setIsPreparingCard] = useState(false);
  const slotsRef = useRef<HTMLDivElement>(null);
  const selectionLockRef = useRef(false);
  const preparedImageRef = useRef<HTMLImageElement | null>(null);
  const canReveal = selectedCards.length === 3;
  const text = messages[language];

  const completeFlight = useCallback(() => {
    setFlight(null);
    preparedImageRef.current = null;
    selectionLockRef.current = false;
  }, []);

  async function selectFromFan(card: TarotCard, source: CardBounds) {
    if (selectionLockRef.current || flight || selectedCards.length >= 3) return;

    const slot = slotsRef.current?.querySelector<HTMLElement>(
      `[data-selected-slot="${selectedCards.length}"]`,
    );
    if (!slot) return;

    selectionLockRef.current = true;
    setIsPreparingCard(true);

    const preparedImage = new window.Image();
    preparedImage.src = getTarotCardImageSrc(card.name);
    preparedImageRef.current = preparedImage;

    try {
      await preparedImage.decode();
    } catch {
      // Continue with the browser's normal image fallback if decoding fails.
    }

    const { top, left, width, height } = slot.getBoundingClientRect();
    setIsPreparingCard(false);
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
      <section className="translate-y-10 px-5 [--selection-card-width:90px] max-[860px]:[--selection-card-width:102px] max-[520px]:flex max-[520px]:h-[calc(100svh-76px)] max-[520px]:translate-y-0 max-[520px]:flex-col max-[520px]:pt-[clamp(52px,8svh,72px)] max-[520px]:pb-0 max-[520px]:[--selection-card-width:clamp(50px,19vw,82px)]">
        <p className="text-center text-[12px] tracking-[0.08em] text-[#7f5b1f] max-[520px]:pb-[22px]">{text.selectionInstructionSecondLine}</p>
        <div className="flex -translate-y-5 items-center justify-center gap-5 pt-5">
          {[0, 1, 2].map((index) => (
            <span
              key={index}
              className={`text-base transition-[color,transform,text-shadow] duration-300 ${
                index < selectedCards.length
                  ? "scale-100 text-[#d7b56d] [text-shadow:0_0_8px_rgba(215,181,109,0.5)]"
                  : "scale-[0.85] text-[rgba(155,114,42,0.18)]"
              }`}
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
            flight={flight}
            onFlightComplete={completeFlight}
          />
        </div>

        <div className="h-15  flex items-center justify-center">
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
        mt-20
      "
            >
              Reveal
            </Button>
          )}
        </div>

        <CardFan
          deck={deck}
          selectedCards={selectedCards}
          interactionLocked={Boolean(flight) || isPreparingCard}
          onSelect={selectFromFan}
        />

      </section>


    </div>
  );
}
