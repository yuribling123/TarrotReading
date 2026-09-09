type ReadingVerdictProps = {
    verdict: string;
};

export function ReadingVerdict({
    verdict,
}: ReadingVerdictProps) {
    const sentences = verdict.split("。").filter(Boolean);
    return (

 <div className=" mt-12 max-w-130 text-center mx-10 ">
  

  <p className="text-[0.92rem] tracking-[0.02em] leading-[1.65] text-[#342d3d]">
    <span className=" text-[#b89552]/70">☾ </span>{sentences[0]}
  </p>

  <p className="mt-1.5 text-[0.92rem] tracking-[0.02em] text-[#342d3d]/65">
    {sentences[1]}
  </p>
</div>

    );
}