type SelectedZodiacProps = {
  zodiac: string;
};

export function SelectedZodiac({ zodiac }: SelectedZodiacProps) {
  const [firstPart, ...remainingParts] = zodiac.split(" ");
  const hasSymbol = /^[♈-♓]$/.test(firstPart);
  const symbol = hasSymbol ? firstPart : "✦";
  const name = hasSymbol ? remainingParts.join(" ") : zodiac;

  return (
    <div className="relative mx-auto mb-5 flex h-10 w-fit animate-in items-center justify-center gap-2 rounded-full bg-[#fffdf8]/65 px-3 pl-1 shadow-[0_5px_18px_rgba(127,91,31,0.10)] backdrop-blur-sm fade-in zoom-in-90 duration-500 before:absolute before:inset-[-7px] before:-z-10 before:rounded-full before:bg-[#69547f]/24 before:blur-xl">
      <span
        aria-hidden="true"
        className="text-[8px] text-[#c19643] [text-shadow:0_0_7px_rgba(193,150,67,0.4)]"
      >
       
      </span>

      <span className="text-[11px] tracking-[0.08em] text-[#69547f]/88">
        今夜星象
      </span>

      <span
        aria-hidden="true"
        className="size-0.5 rounded-full bg-[#69547f]/72"
      />

      <span className="text-[15px] leading-none text-[#806a96] [text-shadow:0_0_8px_rgba(105,84,127,0.24)]">
        {symbol}
      </span>

      <span className="text-[11px] font-medium tracking-[0.08em] text-[#69547f]">
        {name}
      </span>
    </div>
  );
}
