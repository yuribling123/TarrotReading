import type { ZodiacSign } from "./zodiac-signs";

type ZodiacOptionProps = {
  isSelected: boolean;
  onSelect: () => void;
  sign: ZodiacSign;
};

export function ZodiacOption({ isSelected, onSelect, sign }: ZodiacOptionProps) {
  const Icon = sign.Icon;

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`relative h-14 w-14 rounded-[21px] border focus:outline-none focus-visible:outline-none focus-visible:ring-0 ${
        isSelected
          ? "border-[#b88a35]/70 bg-[radial-gradient(circle_at_50%_35%,rgba(240,211,135,0.38),rgba(255,255,255,0.28)_72%)] shadow-[0_0_0_3px_rgba(215,181,109,0.11),0_8px_20px_rgba(127,91,31,0.16)]"
          : "border-[#141005]/30 bg-white/20 hover:border-[#b88a35]/70"
      }`}
    >
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute -right-1 -top-1 text-[9px] text-[#c4963d] ${
          isSelected
            ? "opacity-100 [text-shadow:0_0_8px_rgba(196,150,61,0.55)]"
            : "opacity-0"
        }`}
      >
        ✦
      </span>
      <span
        className={`pointer-events-none absolute left-0 right-0 top-[6px] flex h-[12px] items-center justify-center ${
          isSelected ? "text-[#b48531]" : "text-[#141005]/30"
        }`}
      >
        <Icon aria-hidden="true" className="block h-[11px] w-[11px]" />
      </span>
      <span
        className={`pointer-events-none absolute bottom-[10px] left-0 right-0 whitespace-nowrap text-center text-[10px] leading-none ${
          isSelected ? "text-[#765218]" : "text-[#141005]/30"
        }`}
      >
        {sign.name}
      </span>
    </button>
  );
}
