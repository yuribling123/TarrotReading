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
    <button className="group  mx-auto pb-15 pt-7 text-[#7f5b1f] flex w-fit flex-col items-center gap-1.5 rounded-[28px] border border-white/15   ">
      <div className="flex items-center pt-0.5 tracking-widest">
        <span className="text-[12px] ">
         {date} 
        </span>
      </div>

      {/* 第一行 */}
      <div className="flex items-center gap-1.5 ">

        <span className="text-[13px] tracking-[0.12em] ">    月亮在{moonSign}</span>

      </div>

      {/* 第二行 */}
      {/* <div className="flex items-center pt-0.5 pb-0.5">

        <span className="text-[10px] tracking-[0.13em]">
          {moonSignMessage}
        </span>
      </div> */}

    </button>
  );
}