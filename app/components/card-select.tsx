import { CardFan } from "@/app/components/card-fan";
import { QuestionSummary } from "@/app/components/question-summary";
import { messages } from "@/lib/i18n";
import type { Language, TarotCard } from "@/lib/types";
import { ZodiacReadingOption } from "./zodiac-reading";
import { Button } from "@/components/ui/button";

type CardSelectProps = {
  language: Language;
  deck: TarotCard[];
  selectedCards: TarotCard[];
  question: string;
  onSelect: (card: TarotCard) => void;
  onReveal: () => void;
};

export function CardSelect({
  language,
  deck,
  selectedCards,
  question,
  onSelect,
  onReveal,
}: CardSelectProps) {
  // Only reveal when three cards selected
  const canReveal = selectedCards.length === 3;

  const text = messages[language];

  return (
    <div >
      <section className="deckArea pt-35">
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
          <p className="tracking-[0.03em]">{text.selectionInstructionFirstLine}</p>
          <p className="opacity-60 translate-y-4 tracking-[0.03em]">{text.selectionInstructionSecondLine}</p>
        </div>

        <CardFan
          deck={deck}
          selectedCards={selectedCards}
          onSelect={onSelect}
        />

        <ZodiacReadingOption/>
        
        <Button
        
          variant="secondary"
          onClick={onReveal}
          disabled={!canReveal}
          className="mx-auto flex text-[14px] h-15 w-21 font-bold rounded-full shadow-[0_6px_18px_rgba(41,36,56,0.22)] hover:scale-105 active:scale-85 duration-300 transition-all tracking-[0.06em]"
        > 
          Reveal
        </Button>
   
      </section>


    </div>
  );
}