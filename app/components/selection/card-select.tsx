import { CardFan } from "@/app/components/cards/card-fan";
import { messages } from "@/lib/i18n";
import type { Language, TarotCard } from "@/lib/types";
import { ZodiacReadingOption } from "@/app/components/zodiac/zodiac-reading";
import { Button } from "@/components/ui/button";
import { OpeningRitual } from "./ritual";
import { useState } from "react";
import { SelectedZodiac } from "@/app/components/zodiac/zodiac-selected";
import { SelectedCardSlots } from "@/app/components/cards/selected-card-slots";
import { SelectionShootingStars } from "./selection-shooting-stars";
import { StarBackground } from "@/app/components/shared/stars";
import { useCardFlight } from "./use-card-flight";

type CardSelectProps = {
  language: Language;
  deck: TarotCard[];
  selectedCards: TarotCard[];
  onSelect: (card: TarotCard) => void;
  onReveal: () => void;
  zodiac: string | null;
  setZodiac: (zodiac: string) => void;
  zodiacOpen: boolean;
  setZodiacOpen: (open: boolean) => void;
};

export function CardSelect({
  zodiacOpen,
  setZodiacOpen,
  zodiac,
  setZodiac,
  language,
  deck,
  selectedCards,
  onSelect,
  onReveal,
}: CardSelectProps) {
  // Only reveal when three cards selected
  const [ritualDone, setRitualDone] = useState(false);
  const canReveal = selectedCards.length === 3;
  const text = messages[language];
  const {
    completeFlightMotion,
    flight,
    flightFaceReady,
    selectFromFan,
    slotsRef,
  } = useCardFlight({ onSelect, selectedCards });



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
      <section className="px-5 pt-60 [--selection-card-width:90px]  max-[860px]:[--selection-card-width:102px] max-[520px]:flex max-[520px]:h-[calc(100svh-76px)] max-[520px]:flex-col max-[520px]:pt-30  max-[520px]:[--selection-card-width:clamp(50px,19vw,82px)]">
        <div className="relative flex h-11 shrink-0 items-start justify-center overflow-visible">
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



        <div ref={slotsRef} className="pt-15 max-[520px]:pt-0  " >
          <SelectedCardSlots
            cards={selectedCards}
            flight={flight}
            flightFaceReady={flightFaceReady}
            onFlightComplete={completeFlightMotion}
          />
        </div>

        <div className="flex h-19 items-center justify-center pt-6 ">
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
        <div className="flex justify-center pt-0 -translate-y-4 ">
          {zodiac ? (
            <div >
              <StarBackground />
              <SelectedZodiac zodiac={zodiac} />
            </div>
          ) : (
            <ZodiacReadingOption
              zodiacOpen={zodiacOpen}
              setZodiacOpen={setZodiacOpen}
              onConfirm={setZodiac}
            />
          )}
        </div>

      </section>


    </div>
  );
}
