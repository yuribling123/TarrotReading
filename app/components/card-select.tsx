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
import { SelectionShootingStars } from "./selection-shooting-stars";

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
  const [flightFaceReady, setFlightFaceReady] = useState(false);
  const slotsRef = useRef<HTMLDivElement>(null);
  const selectionLockRef = useRef(false);
  const preparedImageRef = useRef<HTMLImageElement | null>(null);
  const flightMotionDoneRef = useRef(false);
  const flightFlipDoneRef = useRef(false);
  const canReveal = selectedCards.length === 3;
  const text = messages[language];

  const finishFlight = useCallback(() => {
    setFlight(null);
    setFlightFaceReady(false);
    preparedImageRef.current = null;
    selectionLockRef.current = false;
  }, []);

  const finishFlightWhenReady = useCallback(() => {
    if (flightMotionDoneRef.current && flightFlipDoneRef.current) {
      finishFlight();
    }
  }, [finishFlight]);

  const completeFlightMotion = useCallback(() => {
    flightMotionDoneRef.current = true;
    finishFlightWhenReady();
  }, [finishFlightWhenReady]);

  async function selectFromFan(card: TarotCard, source: CardBounds) {
    if (selectionLockRef.current || flight || selectedCards.length >= 3) return;

    const slot = slotsRef.current?.querySelector<HTMLElement>(
      `[data-selected-slot="${selectedCards.length}"]`,
    );
    if (!slot) return;

    selectionLockRef.current = true;
    flightMotionDoneRef.current = false;
    flightFlipDoneRef.current = false;
    setFlightFaceReady(false);

    const preparedImage = new window.Image();
    preparedImage.src = getTarotCardImageSrc(card.name);
    preparedImageRef.current = preparedImage;

    const { top, left, width, height } = slot.getBoundingClientRect();
    setFlight({ card, source, target: { top, left, width, height } });
    onSelect(card);

    try {
      await preparedImage.decode();
    } catch {
      // Let the browser use its normal image fallback if explicit decoding fails.
    }

    setFlightFaceReady(true);
    const flipDuration = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? 0
      : 460;
    window.setTimeout(() => {
      flightFlipDoneRef.current = true;
      finishFlightWhenReady();
    }, flipDuration);
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
<section className="px-5 pt-60 [--selection-card-width:90px]  max-[860px]:[--selection-card-width:102px] max-[520px]:flex max-[520px]:h-[calc(100svh-76px)] max-[520px]:flex-col max-[520px]:pt-[clamp(52px,8svh,72px)]  max-[520px]:[--selection-card-width:clamp(50px,19vw,82px)]">
        <div className="flex h-11 items-start justify-center">
          {selectedCards.length === 0 ? (
            <p className="animate-in text-center text-[12px] tracking-[0.08em] text-[#7f5b1f] fade-in duration-300">
              {text.selectionInstructionSecondLine}
            </p>
          ) : (
            <SelectionShootingStars
              count={selectedCards.length}
              label={text.chosenHint.replace("{count}", String(selectedCards.length))}
            />
          )}
        </div>

        <div className="pt-6">
          {zodiac ? (
            <SelectedZodiac zodiac={zodiac} />
          ) : (
            <ZodiacReadingOption onConfirm={setZodiac} />
          )}
        </div>

        <div ref={slotsRef} className="pt-15 max-[520px]:pt-0  " >
          <SelectedCardSlots
            cards={selectedCards}
            flight={flight}
            flightFaceReady={flightFaceReady}
            onFlightComplete={completeFlightMotion}
          />
        </div>

        <div className="flex h-19 items-center justify-center  ">
          {canReveal && (
            <div className="relative animate-in fade-in slide-in-from-bottom-1 fill-mode-both [animation-delay:180ms] [animation-duration:520ms]">
              <span aria-hidden="true" className="pointer-events-none absolute inset-0 animate-[selection-reveal-ripple_3s_ease-out_infinite] rounded-full border border-[#c9a45a]/38 motion-reduce:hidden" />
              <span aria-hidden="true" className="pointer-events-none absolute inset-0 animate-[selection-reveal-ripple_3s_ease-out_1.5s_infinite] rounded-full border border-[#d8bd80]/28 motion-reduce:hidden" />
              <Button
                variant="secondary"
                onClick={onReveal}
                className="relative z-10 flex h-11 min-w-36 items-center gap-2 rounded-full border border-[#b58a3f]/42 bg-[#fffdf8]/92 px-6 text-[13px] font-medium tracking-[0.12em] text-[#6f501d]/90 shadow-[0_5px_18px_rgba(155,114,42,0.14)] backdrop-blur-sm transition-[transform,border-color,box-shadow,background-color] duration-200 hover:border-[#b58a3f]/60 hover:bg-[#fffdf8] active:scale-[0.97] active:bg-[#fff8e6] active:shadow-[0_0_0_5px_rgba(230,203,126,0.12),0_0_18px_rgba(201,154,69,0.30)]"
              >
                <span className="animate-in fade-in fill-mode-both [animation-delay:360ms] [animation-duration:420ms]">
                  {text.reveal}
                </span>
              </Button>
            </div>
          )}
        </div>

        <CardFan
          deck={deck}
          selectedCards={selectedCards}
          interactionLocked={Boolean(flight)}
          onSelect={selectFromFan}
        />

      </section>


    </div>
  );
}
