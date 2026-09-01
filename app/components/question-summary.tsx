type QuestionSummaryProps = {

  question: string;

};

export function QuestionSummary({ question }: QuestionSummaryProps) {

  return (

    <div className="questionPanel pt-2 flex flex-col items-center">

      

      <span className="mb-2 text-[9px] tracking-[0.28em] text-[#9b722a]/60">

        今夜所问

      </span>

      <p className="

        text-center

        text-[1rem]

        font-medium

        tracking-[0.06em]

        text-[#342d3d]/85

        [text-shadow:0_1px_8px_rgba(184,149,82,0.10)]

      ">

        {question}

      </p>

      <div className="mt-3 h-px w-8 bg-[#b89552]/25" />

    </div>

  );

}