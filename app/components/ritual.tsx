"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type OpeningRitualProps = {
  onComplete: () => void;
};

export function OpeningRitual({
  onComplete,
}: OpeningRitualProps) {
  const [mounted, setMounted] = useState(false);
  const [entered, setEntered] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    setMounted(true);

    // 淡入：500 毫秒后执行 setEntered(true)
    const enterTimer = setTimeout(() => {
      setEntered(true);
    }, 500);

    // 开始淡出
    const fadeTimer = setTimeout(() => {
      setLeaving(true);
    }, 4000);

    // 淡出结束，告诉父组件,setRitualDone=True
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 5000);

    return () => {
      clearTimeout(enterTimer);
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  if (!mounted) return null;

  //让这个遮罩直接盖在整个网页最上面
  return createPortal(
    <div
      className={`
        fixed inset-0 z-99999
        h-svh w-screen
        overflow-hidden
        bg-[#12101a]

        transition-opacity
        duration-700
        ease-in-out

        ${
          !entered || leaving
            ? "opacity-0"
            : "opacity-100"
        }
      `}
    >
      {/* stars */}
      <span className="absolute left-[16%] top-[20%] text-[5px] text-white/45 animate-[pulse_3s_ease-in-out_infinite]">
        ✦
      </span>

      <span className="absolute right-[18%] top-[29%] text-[3px] text-[#d8ba77]/55">
        ✦
      </span>

      <span className="absolute left-[25%] bottom-[27%] text-[3px] text-white/35">
        ✦
      </span>

      <span className="absolute right-[27%] bottom-[20%] text-[5px] text-white/30 animate-[pulse_4s_ease-in-out_infinite]">
        ✦
      </span>

      <span className="absolute left-[10%] top-[54%] h-0.5 w-0.5 rounded-full bg-white/40" />

      <span className="absolute right-[12%] top-[58%] h-0.5 w-0.5 rounded-full bg-[#d8ba77]/50" />

      {/* center */}
      <div className="flex h-full flex-col items-center justify-center text-center">
        <p
          className="
            text-[13px]
            font-medium
            tracking-[0.16em]
            text-[#f5efe1]/80
          "
        >
          让思绪安静片刻
        </p>
      </div>
    </div>,
    document.body
  );
}