import { CardFan } from "@/app/components/card-fan";
import { QuestionSummary } from "@/app/components/question-summary";
import { ReadingError } from "@/app/components/reading-error";
import { SelectionInstructions } from "@/app/components/selection-instructions";

type CardRevealProps = {
  instructionFirstLine: string;
  instructionSecondLine: string;
  error: string;
  hint: string;
  onReveal: () => void;
  onToggle: (cardIndex: number) => void;
  question: string;
  questionLabel: string;
  revealLabel: string;
  selectedIndexes: number[];
};

export function CardReveal({
  instructionFirstLine,
  instructionSecondLine,
  error,
  hint,
  onReveal,
  onToggle,
  question,
  questionLabel,
  revealLabel,
  selectedIndexes,
}: CardRevealProps) {
  const canReveal = selectedIndexes.length === 3;

  return (
    <>
      <QuestionSummary label={questionLabel} question={question} showLabel={false} minimal />

      <section className="deckArea" aria-label={`${instructionFirstLine}. ${instructionSecondLine}`}>
        <div className="deckHeader">
          <SelectionInstructions firstLine={instructionFirstLine} secondLine={instructionSecondLine} />
        </div>
        <CardFan selectedIndexes={selectedIndexes} onToggle={onToggle} />
        <button className="primaryAction" onClick={onReveal} type="button" disabled={!canReveal}>
          {revealLabel}
        </button>
      </section>

      <ReadingError message={error} />

      {selectedIndexes.length > 0 && <p className="selectedHint">{hint.replace("{count}", String(selectedIndexes.length))}</p>}
    </>
  );
}
