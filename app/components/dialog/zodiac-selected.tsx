import { StarBackground } from "../ui/stars";

type SelectedZodiacProps = {
  zodiac: string;
};

export function SelectedZodiac({ zodiac }: SelectedZodiacProps) {
  const normalizedZodiac = zodiac.replace(/[\uFE0E\uFE0F]/g, "").trim();
  const match = normalizedZodiac.match(/^(.*?)[\s]*([♈-♓])$/);
  const name = match?.[1]?.trim() || normalizedZodiac;
  const symbol = match ? `${match[2]}\uFE0E` : "";

  return (
    <div className="relative text-[#7f5469]/88 mx-auto  mb-5 px-5 flex h-10 w-fit animate-in items-center justify-center gap-1 rounded-[15px]  before:absolute before:inset-[-7px] before:-z-10 before:rounded-full before:bg-[#69547f]/ before:blur-xl">
     
      <span className="text-[11px] tracking-[0.2em] ">
        今夜星象
      </span>

      <span className="font-serif text-[13px] pr-0.5  [text-shadow:0_0_8px_rgba(105,84,127,0.24)]">
        {symbol}
      </span>



      <span className="text-[11px] tracking-[0.2em] ]">
        {name}
      </span>


    </div>
  );
}
