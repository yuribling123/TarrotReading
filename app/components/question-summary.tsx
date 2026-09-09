type QuestionSummaryProps = {
  question: string;
};

export function QuestionSummary({ question }: QuestionSummaryProps) {
  return (
    <>
      <div className="mt-16 flex justify-center sm:mt-24 lg:mt-32">
        <span className="text-[0.82rem]  font-medium drop-shadow-[0_1px_1px_rgba(60,55,50,0.28)]  tracking-[0.28em] text-[#70627D]">
          今夜所问
        </span>
      </div>

      <div
        className="
    
    w-full
    max-w-[60%]
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
            pt-2
            text-center
            text-[0.82rem]
            font-medium
            tracking-[0.06em]
            text-[#342d3d]/85
            [text-shadow:0_1px_8px_rgba(184,149,82,0.10)]
          "
        >
          {question}
        </p>

      </div>
      {/* <div className="mt-1 h-px w-8 bg-[#b89552]/25" /> */}
    </>
  );
}
