type QuestionSummaryProps = {

  question: string;

};

export function QuestionSummary({ question}: QuestionSummaryProps) {
  return (
    <div className="questionPanel pt-3">
      <p>{question}</p>
    </div>
  );
}
