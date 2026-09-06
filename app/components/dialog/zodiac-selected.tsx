type SelectedZodiacProps = {
  zodiac: string;
};

export function SelectedZodiac({ zodiac }: SelectedZodiacProps) {
  const [firstPart, ...remainingParts] = zodiac.split(" ");
  const hasSymbol = /^[♈-♓]$/.test(firstPart);
  const symbol = hasSymbol ? firstPart : "✦";
  const name = hasSymbol ? remainingParts.join(" ") : zodiac;

  return (
    <div className="relative mx-auto mb-5  flex h-10 w-fit animate-in items-center justify-center gap-2 pl-1 rounded-full  bg-[#fffdf8]/65 px-3 shadow-[0_5px_18px_rgba(127,91,31,0.10)] backdrop-blur-sm fade-in zoom-in-90 duration-500 before:absolute before:inset-[-6px] before:-z-10 before:rounded-full before:bg-[#d6ad58]/20 before:blur-xl">
      <span
        aria-hidden="true"
        className="text-[8px] text-[#c19643] [text-shadow:0_0_7px_rgba(193,150,67,0.4)]"
      >
       
      </span>

      <span className="text-[9px] tracking-[0.16em] text-[#7f5b1f]/90">
        今夜星象
      </span>

      <span
        aria-hidden="true"
        className="size-0.5 rounded-full bg-[#7f5b1f]/90"
      />

      <span className="text-[15px] leading-none text-[#b18332] [text-shadow:0_0_8px_rgba(177,131,50,0.22)]">
        {symbol}
      </span>

      <span className="text-[11px] font-medium tracking-[0.08em] text-[#765218]">
        {name}
      </span>
    </div>
  );
}
