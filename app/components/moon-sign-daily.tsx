"use client";
import { useMemo } from "react";
// import { getMoonSign } from "@/lib/moon-sign";


export function DailyMoonSign() {
//   const moon = useMemo(() => getMoonSign(), []);


return (
  <div className="mx-auto flex flex-col items-center text-center">

    {/* 吊线 */}
    <div className="h-8 w-px bg-gradient-to-b from-transparent via-[#d7b56d]/60 to-[#d7b56d]/90" />

    {/* 月亮圆 */}
    <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#d7b56d]/50 bg-[#f2dfb3]/90 shadow-[0_0_18px_rgba(215,181,109,0.28)]">
      <span className="text-[12px] text-[#7d5a24]">
        ♓
      </span>
    </div>

    {/* 小连接线 */}
    <div className="h-3 w-px bg-[#d7b56d]/45" />

    {/* 标题 */}
    <div className="flex items-center gap-2 text-[10px] tracking-[0.22em] text-[#d7b56d]">
      <span>✦</span>
      <span>今日星象</span>
    </div>

    {/* Moon sign */}
    <p className="mt-2 text-sm font-medium tracking-[0.08em] text-[#fff3d9] drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
      月亮在双鱼
    </p>

    {/* Message */}
    <p className="mt-2 max-w-[250px] text-[11px] leading-5 text-[#f7e2ba]/90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
      有些答案 更适合先感受 而不是急着追问
    </p>

  </div>
);
}