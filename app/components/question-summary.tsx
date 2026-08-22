type QuestionSummaryProps = {
  label: string;
  question: string;
  showLabel?: boolean;
  minimal?: boolean;
};

export function QuestionSummary({ label, question, showLabel = true, minimal = false }: QuestionSummaryProps) {
  return (
    <div className={`questionPanel${minimal ? " questionPanelMinimal" : ""}`}>
      {showLabel ? <span>{label}</span> : null}
      <p>{question}</p>
    </div>
  );
}
