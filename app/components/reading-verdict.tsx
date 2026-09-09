type ReadingVerdictProps = {
  verdict: string;
};

export function ReadingVerdict({
  verdict,
}: ReadingVerdictProps) {
  const sentences = verdict.split("。").filter(Boolean);
  return (

    <div className=" mx-auto font-medium! text-[0.89rem] mt-12 max-w-130 text-center px-8">


      <p className=" tracking-[0.02em] leading-[1.65] text-[#342d3d]">
        <span className=" text-[#b89552]/70">☾ </span>{sentences[0]}
      </p>

      <p className="mt-1.5 tracking-[0.02em] text-[#342d3d]/65">
        {sentences[1]}
      </p>
      <div className="mt-3 flex items-center justify-center gap-2">
        <span className="h-px w-9 bg-[#d8c7a7]/40" />
        <span className="text-[9px] text-[#b99a62]/60">·</span>
        <span className="h-px w-9 bg-[#d8c7a7]/40" />
      </div>
    </div>

  );
}