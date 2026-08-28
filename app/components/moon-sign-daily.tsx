import { getMoonSign } from "@/lib/moon/moon-sign";

export function DailyZodiac() {
  const moonSign = getMoonSign();

  return (
    <button className="group mx-auto -translate-y-30 flex w-fit items-center gap-1.5 rounded-full border border-white/15 bg-[#292438]/50 px-2.5 py-2.5 shadow-[0_5px_20px_rgba(20,16,30,0.18)] backdrop-blur-md transition-all duration-300 hover:bg-[#332c45] active:scale-[0.97] active:bg-[#332c45] ">
      <span className="text-[11px] tracking-[0.12em] text-white/60">
        今夜幸运星座
      </span>

      <span className="text-[#E6CB7E]">✦{ }</span>

      <span className="text-[11px] tracking-[0.12em] text-white/60">
        {moonSign}
      </span>
    </button>
  );
}