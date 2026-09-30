"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type DiceDailyLimitDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function DiceDailyLimitDialog({ open, onOpenChange }: DiceDailyLimitDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-80 max-w-[85vw] rounded-[28px] border border-[#f6efe4] bg-[#17131f]/95 px-6 pt-8 pb-5 text-center text-[#f7efe3] shadow-[0_18px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl">
        <DialogHeader className="items-center text-center">
          <DialogTitle className="pb-2 text-center text-[13px] tracking-[0.02em] text-[#f7efe3]">
            今天的星骰已落定
          </DialogTitle>
          <DialogDescription className="pt-1 text-center text-[11px] leading-[1.7] text-[#cfc4d3]">
            每天只能投一次星骰，明天再开启新的故事。
          </DialogDescription>
        </DialogHeader>
        <button
          type="button"
          onClick={() => onOpenChange(false)}
          className="mx-auto mt-2 h-11 rounded-full border border-[#f6efe4] bg-transparent px-5 text-xs font-semibold tracking-[0.08em] text-[#f6efe4] transition-colors hover:bg-[#f6efe4]/8 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f6efe4]"
        >
          知道了
        </button>
      </DialogContent>
    </Dialog>
  );
}
