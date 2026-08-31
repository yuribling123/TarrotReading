"use client"
import { messages } from "@/lib/i18n";
import { getMoonPhase } from "@/lib/moon/moon-phase";
import { getMoonSign, getMoonSignMessage } from "@/lib/moon/moon-sign";

export function DailyZodiac() {
  const text = messages["zh"];
  const { phase } = getMoonPhase();
  const moonSign = getMoonSign();
  const moonSignMessage = getMoonSignMessage(moonSign)
  const now = new Date();
  const date = `${String(now.getMonth() + 1).padStart(2, "0")} · ${String(
    now.getDate()
  ).padStart(2, "0")}`;
  

  return (
    <button className="group  mx-auto -translate-y-40 flex w-fit flex-col items-center gap-1.5 rounded-[28px] border border-white/15 bg-[#292438]/50 px-5 py-3.5 shadow-[0_5px_20px_rgba(20,16,30,0.18)] backdrop-blur-[4px] transition-all duration-300 hover:bg-[#332c45]/40 active:scale-[0.97] active:bg-[#332c45]/40  ">
      <div className="flex items-center text-[#F4F0E8]/60 pt-0.5 tracking-[0.10em]">
        <span className="text-[10px] ">
         {date} 
        </span>
      </div>

      {/* 第一行 */}
      <div className="flex items-center gap-1.5 text-[#F4F0E8]/85">

        <span className="text-[11px] tracking-[0.12em] ">    月亮行至{moonSign}</span>

      </div>

      {/* 第二行 */}
      <div className="flex items-center text-[#F4F0E8]/60 pt-0.5 pb-0.5">

        <span className="text-[10px] tracking-[0.13em]">
          {moonSignMessage}
        </span>
      </div>

    </button>
  );
}