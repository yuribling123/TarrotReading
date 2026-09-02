"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

interface DailyLimitDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DailyLimitDialog({
  open,
  onOpenChange,
}: DailyLimitDialogProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent
        className="
          w-66
          max-w-[85vw]
          rounded-[28px]
          border
          border-[#c9ad73]/25
          bg-[#fffdf9]/70
          pt-8
          pb-5
          text-center
          shadow-[0_18px_50px_rgba(45,38,55,0.16)]
          backdrop-blur-xl
        "
      >
        <DialogHeader className="items-center text-center">
          <DialogTitle
            className="
              pb-2
              text-center
              text-[13px]
              tracking-[0.02em]
              text-[#232125]/88
            "
          >
                今夜的牌已落定 
          </DialogTitle>

          <DialogDescription
            className="
              pt-1
              text-center
              text-[11px]
              leading-[1.7]
              text-[#1b1a1c]/70
            "
          >
            明日再来
          </DialogDescription>
        </DialogHeader>

        <Button
          onClick={() => onOpenChange(false)}
          variant="secondary"
          className="
            mx-auto
            mt-2
            h-11
            w-20
            rounded-full
            border
            text-[12px]
            font-semibold
            tracking-[0.08em]
            shadow-none
            focus-visible:ring-0
            focus-visible:outline-none
            [-webkit-tap-highlight-color:transparent]
          "
        >
          知道了
        </Button>
      </DialogContent>
    </Dialog>
  );
}