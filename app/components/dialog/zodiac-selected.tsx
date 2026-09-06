type SelectedZodiacProps = {
  zodiac: string;
};

export function SelectedZodiac({ zodiac }: SelectedZodiacProps) {
  const normalizedZodiac = zodiac.replace(/[\uFE0E\uFE0F]/g, "").trim();
  const match = normalizedZodiac.match(/^(.*?)[\s]*([♈-♓])$/);
  const name = match?.[1]?.trim() || normalizedZodiac;
  const symbol = match ? `${match[2]}\uFE0E` : "";

  return (
    <div className="relative mx-auto  mb-5 px-5 flex h-10 w-fit animate-in items-center justify-center gap-1 rounded-full bg-[#fffdf8]/65  shadow-[0_5px_18px_rgba(127,91,31,0.10)] backdrop-blur-sm fade-in zoom-in-90 duration-500 before:absolute before:inset-[-7px] before:-z-10 before:rounded-full before:bg-[#69547f]/24 before:blur-xl">
      <span className="text-[11px] tracking-[0.2em] text-[#69547f]/88">
        今夜星象
      </span>

      <span className="text-[11px] px-2  text-[#806a96] [text-shadow:0_0_8px_rgba(105,84,127,0.24)]">
        ✦
      </span>

      <span className="text-[11px] tracking-[0.2em] text-[#69547f]">
        {name}
      </span>

      {symbol && (
        <span className="font-serif text-[13px]  text-[#69547f] [text-shadow:0_0_8px_rgba(105,84,127,0.24)]">
          {symbol}
        </span>
      )}
    </div>
  );
}
