import { CardFan } from "@/app/components/card-fan";
import { QuestionSummary } from "@/app/components/question-summary";
import { messages } from "@/lib/i18n";
import type { Language, TarotCard } from "@/lib/types";

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
      <section className="deckArea">

        <div className="deckHeader">
          <p>{text.selectionInstructionFirstLine}</p>
          <p className="opacity-60 translate-y-4">{text.selectionInstructionSecondLine}</p>
        </div>

        <CardFan
          deck={deck}
          selectedCards={selectedCards}
          onSelect={onSelect}
        />
        <button
          className="primaryAction"
          onClick={onReveal}
          type="button"
          disabled={!canReveal}
        >
          Reveal
        </button>

        {selectedCards.length > 0 && (

          <div style={{ color: "grey", textShadow: "0 1px 3px rgba(0, 0, 0, 0.35)", }}>
            {text.chosenHint.replace(
              "{count}",
              String(selectedCards.length)
            )}
          </div>

        )}

      </section>


    </div>
  );
}