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
import { isZodiacReadingAvailable } from "@/lib/zodiac/availability";

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
  const zodiacAvailable = isZodiacReadingAvailable();
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
    // 星象开放时打开选择窗口
    useEffect(() => {
    if (canReveal && zodiacAvailable && zodiac==null){
      setZodiacOpen(true)
    }
  }, [canReveal]);


  // 仪式还没结束：只显示仪式
  if (!ritualDone) {
    return (
      <OpeningRitual
        onComplete={() => setRitualDone(true)}
      />
    );
  }
  
  return (
    <div>
      <section className=" relative overflow-hidden  px-1  pt-16 [--selection-card-width:90px] max-[860px]:[--selection-card-width:102px] max-[520px]:flex  max-[520px]:flex-col  max-[520px]:[--selection-card-width:clamp(50px,19vw,82px)]">

        {/* 长按时：四周慢慢暗下来 */}
        <div
          aria-hidden="true"
          className={`pointer-events-none fixed inset-0 z-10 transition-opacity duration-700 ease-out ${isChanneling ? "opacity-100" : "opacity-0"}`}
       
        />

        {/* 三颗金星：在暗场上面 */}
        <div className="relative z-20 flex h-11 shrink-0 items-start justify-center overflow-visible">
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

        {/* 三张已选中的牌：保持亮 */}
        <div ref={slotsRef} className="relative z-20 pt-15 max-[520px]:pt-0">
          <SelectedCardSlots
            cards={selectedCards}
            flight={flight}
            flightFaceReady={flightFaceReady}
            onFlightComplete={completeFlightMotion}
          />
        </div>

        {/* 长按按钮：保持亮 */}
        <div className="relative z-20 mt-10 flex h-0 justify-center md:mt-28 lg:mt-32">
          {canReveal && (
            <div className="absolute top-0 z-20">
              <HoldToRevealButton
                onComplete={onReveal}
                holdDuration={2500}
                onHoldingChange={setIsChanneling}
              />
            </div>
          )}
        </div>

        {/* 牌堆：暗场下面 */}
        <div className="relative z-0">
          <CardFan
            deck={deck}
            selectedCards={selectedCards}
            interactionLocked={Boolean(flight)}
            onSelect={selectFromFan}
          />
        </div>

        {/* 星座：暗场下面 */}
        <div className="relative z-0 h-0">
          <div className="absolute inset-x-0 top-0 flex -translate-y-20 justify-center">
            {zodiac ? (
              <div className="relative">
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
        </div>

      </section>
    </div>
  );
}
