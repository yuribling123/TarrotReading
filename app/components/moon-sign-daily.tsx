export function DailyZodiac() {
  return (
    <button className="group mx-auto -translate-y-60 flex w-fit items-center gap-2.5 rounded-full border border-[#d7b56d]/25 bg-white/75  py-2.5 shadow-[0_5px_20px_rgba(50,38,60,0.07)]  transition-all duration-300 hover:-translate-y-0.5 ">
      <span className="text-[10px] text-[#c39a47]">✦</span>

      <span className="text-[11px] tracking-[0.12em] text-[#493B55]">
        今夜幸运星座
      </span>

      <span className="h-3.5 w-px bg-[#d7b56d]/30" />



      <span className="text-[11px] font-medium tracking-[0.04em] text-[#493B55]">
        双鱼座
      </span>

      <span className="text-[11px] text-[#9b722a]/60">›</span>
    </button>
  );
}