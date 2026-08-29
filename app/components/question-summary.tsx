type QuestionSummaryProps = {

  question: string;

};

export function QuestionSummary({ question}: QuestionSummaryProps) {
  return (
    <div className="questionPanel pt-10">
      <p>{question}</p>
    </div>
  );
}
