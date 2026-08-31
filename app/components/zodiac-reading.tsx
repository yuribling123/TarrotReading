import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { CodeDialog } from "./code-dialog";

export function ZodiacReadingOption() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        type="button"
        className="
        group mx-auto flex items-center justify-center gap-2 mb-18 h-10 px-5 rounded-full
        bg-transparent
        text-[11px] font-medium tracking-[0.08em]
        transition-all duration-300
      hover:text-[#d7b56d]
        active:scale-[0.96]
        active:shadow-[0_0_18px_rgba(215,181,109,0.35)]
        text-[#b89552]
      "
      >
        <span
          className="
          inline-block
          text-[10px] text-[#7f5b1f]/70
          drop-shadow-[0_0_5px_rgba(215,181,109,0.7)]
          animate-[pulse_2.8s_ease-in-out_infinite]
        "
        >
          ✦
        </span>

        <span className="text-[#7f5b1f]

          animate-[pulse_2s_ease-in-out_1]">
          带上你的星座 · 让解读更靠近你
        </span>

        <span
          className="
          inline-block
          text-[8px] text-[#7f5b1f]/70
          drop-shadow-[0_0_4px_rgba(215,181,109,0.5)]
          animate-[pulse_5s_ease-in-out_1.2s_infinite]
        "
        >
          ✧
        </span>
      </button>
      <CodeDialog open={open} onOpenChange={setOpen} />


    </>
  );
}