type QuestionSummaryProps = {
  question: string;
};

export function QuestionSummary({ question }: QuestionSummaryProps) {
  return (
    <>
      <div className="mt-20 lg:mt-35 flex justify-center">
        <span className="text-[9px]  font-medium drop-shadow-[0_1px_1px_rgba(60,55,50,0.28)]  tracking-[0.28em] text-[#9b722a]/60">
          今夜所问
        </span>
      </div>

      <div
        className="
    mt-5
    w-full
    max-w-[80%]
    min-w-0
    overflow-x-auto
    overflow-y-hidden
    whitespace-nowrap
    text-center
    text-[1rem]
    font-normal
    leading-[1.7]
    tracking-[0.06em]
    text-[#3f352c]
    scrollbar-none
    [text-shadow:0_1px_3px_rgba(63,53,44,0.3)]
    [&::-webkit-scrollbar]:hidden
  "
      >
        <p
          className="
            text-center
            text-[1rem]
            font-medium
            tracking-[0.06em]
            text-[#342d3d]/85
            [text-shadow:0_1px_8px_rgba(184,149,82,0.10)]
          "
        >
          {question}
        </p>

      </div>
      <div className="mt-3 h-px w-8 bg-[#b89552]/25" />
    </>
  );
}