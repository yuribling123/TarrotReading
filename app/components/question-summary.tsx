type QuestionSummaryProps = {

  question: string;

};

export function QuestionSummary({ question}: QuestionSummaryProps) {
  return (
    <div className="questionPanel">
      <p>{question}</p>
    </div>
  );
}
