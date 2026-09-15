import { CardFan } from "@/app/components/cards/card-fan";
import { messages } from "@/lib/i18n";
import type { Language, TarotCard } from "@/lib/types";
import { ZodiacReadingOption } from "@/app/components/zodiac/zodiac-reading";
import { Button } from "@/components/ui/button";
import { OpeningRitual } from "./ritual";
import { useEffect, useState } from "react";
import { SelectedZodiac } from "@/app/components/zodiac/zodiac-selected";
import { SelectedCardSlots } from "@/app/components/cards/selected-card-slots";
import { SelectionShootingStars } from "./selection-shooting-stars";
import { StarBackground } from "@/app/components/shared/stars";
import { useCardFlight } from "./use-card-flight";
import { ShootingStars } from "../shared/shooting-star";
import { HoldToRevealButton } from "./reveal-button";

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
  const [isChanneling, setIsChanneling] = useState(false);
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
      <section className="px-5 pt-60 [--selection-card-width:90px]  max-[860px]:[--selection-card-width:102px] max-[520px]:flex max-[520px]:h-[calc(100svh-76px)] max-[520px]:flex-col max-[520px]:pt-20  max-[520px]:[--selection-card-width:clamp(50px,19vw,82px)]">

        <div className="relative flex h-11 shrink-0 items-start justify-center overflow-visible">
          {selectedCards.length === 0 ? (
            <p className="animate-in text-center text-[12px] tracking-[0.08em] text-[#7f5b1f] fade-in duration-300">
              {text.selectionInstructionSecondLine}
            </p>
          ) : (
            <SelectionShootingStars
              isChanneling={isChanneling}
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
        
        <div className="mt-12 flex h-12 shrink-0 items-start justify-center md:mt-28 lg:mt-32">
          {canReveal && (
            <HoldToRevealButton
              onComplete={onReveal}
              holdDuration={2500}
              onHoldingChange={setIsChanneling}
            />
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
