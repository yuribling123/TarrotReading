import { getMoonSign, getMoonSignMessage } from "@/lib/moon/moon-sign";

export function DailyZodiac() {
  const moonSign = getMoonSign();
  const moonSignMessage = getMoonSignMessage(moonSign)

  return (
  <button className="group  mx-auto -translate-y-30 flex w-fit flex-col items-center gap-1.5 rounded-full border border-white/15 bg-[#292438]/50 px-3.5 py-3.5 shadow-[0_5px_20px_rgba(20,16,30,0.18)] backdrop-blur-md transition-all duration-300 hover:bg-[#332c45] active:scale-[0.97] active:bg-[#332c45]">

  {/* 第一行 */}
  <div className="flex items-center gap-1.5 text-[#F4F0E8]/60">
    <span className="text-[11px] tracking-[0.12em] ">月亮正落在</span>
    <span className="text-[#E6CB7E]">✦</span>
    <span className="text-[11px] tracking-[0.12em]">{moonSign}</span>
  </div>

  {/* 第二行 */}
  <div className="flex items-center text-[#F4F0E8]/70 pt-0.5">
  
  <span className="text-[10px] tracking-[0.15em]">
   {moonSignMessage}
  </span>
  </div>

</button>
  );
}