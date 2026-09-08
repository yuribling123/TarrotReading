"use client";

import { useEffect } from "react";

type MoonLoreProps = {
  open: boolean;
  onClose: () => void;
};

export function MoonLore({ open, onClose }: MoonLoreProps) {
  useEffect(() => {
    if (!open) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [onClose, open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center bg-transparent px-4 pb-8 pt-40 animate-in fade-in duration-300 sm:px-6 sm:pt-[140px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="moon-lore-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <article className="relative max-h-[72svh] w-full max-w-[540px] overflow-y-auto rounded-[28px] border border-white/55 bg-white/[0.12] px-7 py-9 text-[#514657] shadow-[0_24px_70px_rgba(64,49,73,0.13),inset_0_1px_0_rgba(255,255,255,0.65)] ring-1 ring-[#8f7b99]/10 backdrop-blur-[16px] backdrop-saturate-150 scrollbar-none animate-in fade-in slide-in-from-bottom-2 duration-500 sm:px-12 sm:py-11">


        <div className="mx-auto mb-7 flex w-fit items-center gap-3" aria-hidden="true">
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#c2a15e]/45" />
          <span className="size-1.5 rounded-full bg-[#d0ae64] shadow-[0_0_12px_rgba(208,174,100,0.4)]" />
          <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#c2a15e]/45" />
        </div>


        <div className="mt-8 space-y-5 text-[12px] leading-[3] tracking-[0.055em] sm:text-[13px]">
          <p>
            月亮并不只属于这个世界。<br />在无数个彼此平行的宇宙里，有些命运因一次选择而改变，有些世界从一开始便遵循着不同的规则。<br />
            牌面是它投下的倒影，星象是它辨认你的方式，触媒决定月光以何种形态回应你；而偶尔抵达的信件，则来自月光照见的彼岸。<br />
            月亮不会替你决定未来。它只能从无数种可能中，指出那些反复出现的征兆。
            你最终走向哪里，仍由你选择。
          </p>

          <div className="flex justify-center py-1" aria-hidden="true">
            <span className="size-1 rounded-full bg-[#967ca1]/45" />
          </div>


        </div>
      </article>
    </div>
  );
}
