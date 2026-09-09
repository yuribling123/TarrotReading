import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { CodeDialog } from "./dialog/code-dialog";

interface Props {
  onConfirm: (zodiac: string) => void;
}

export function ZodiacReadingOption(
  { onConfirm }: Props
) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        type="button"
        className="
        mx-auto flex items-center justify-center   rounded-full
        bg-transparent
        text-[11px] font-medium tracking-[0.08em]
        transition-all duration-300
      hover:text-[#d7b56d]
        active:scale-[0.96]
        active:shadow-[0_0_18px_rgba(215,181,109,0.35)]
        text-[#b89552]
      "
      >

        <span className="relative h-4 w-4">
          <span className="absolute inset-[1px] rounded-full border border-[#b89552]/65" />
          <span className="absolute -right-[3px]  top-[2px] size-[3px] rounded-full bg-[#b89552]/85" />
        </span>

      </button>
      <CodeDialog open={open} onOpenChange={setOpen} onConfirm={onConfirm} />


    </>
  );
}