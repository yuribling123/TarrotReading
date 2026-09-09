"use client"
import { messages } from "@/lib/i18n";

import { getMoonSign, getMoonSignMessage } from "@/lib/moon/moon-sign";

export function DailyZodiac() {
  const text = messages["zh"];

  const moonSign = getMoonSign();

  const now = new Date();
  const date = `${String(now.getMonth() + 1).padStart(2, "0")} · ${String(
    now.getDate()
  ).padStart(2, "0")}`;

  // 0 = 周日，5 = 周五，6 = 周六
  const day = now.getDay();
  const isZodiacOpen = day === 5 || day === 6 || day === 0;


  return (
    <button className="group  mx-auto pb-10 pt-7 text-[#7f5b1f] flex w-fit flex-col items-center gap-1.5 rounded-[28px] border border-white/15   ">
      <div className="flex items-center pt-0.5 tracking-widest">
        <span className="text-[12px] ">
          {date}
        </span>
      </div>

      {/* 第一行 */}
      <div className="flex items-center gap-1.5 ">

        <span className="text-[13px] tracking-[0.12em] ">    月亮在{moonSign}</span>

      </div>

      {/* 周五 / 周六 / 周日限定 */}

      {isZodiacOpen && (

        <div className="mt-2 flex items-center gap-1.5 text-[#8f6f98]">
          <span className="text-[9px]">
            ·
          </span>

          <span className="text-[10px] tracking-[0.1em] ">
            今夜星象加读已开放
          </span>
          <span className="text-[9px] ">
            ·
          </span>

        </div>

      )}

      {/* 第二行 */}
      {/* <div className="flex items-center pt-0.5 pb-0.5">

        <span className="text-[10px] tracking-[0.13em]">
          {moonSignMessage}
        </span>
      </div> */}

    </button>
  );
}