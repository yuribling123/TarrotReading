"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

interface ReadingLimitDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onResponse: () => void;
}

export function ReadingLimitDialog({
  open,
  onOpenChange,
  onResponse,
}: ReadingLimitDialogProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >

        <DialogContent
  className="
    w-[88vw]
    max-w-70
    rounded-[28px]
    border
    border-[#c9ad73]/25
    bg-[#fffdf9]/95
    py-6
    text-center
    shadow-[0_18px_50px_rgba(45,38,55,0.16)]
    backdrop-blur-xl
  "
>
  <DialogHeader className="items-center text-center">
    <div className="mb-1 text-[13px] ">
      ☾
    </div>
    <DialogTitle
      className="
        text-center
        text-[12px]
        font-medium
        tracking-[0.02em]
        text-[#4f4659]/90
      "
    >
      三次占卜已经完成 
    </DialogTitle>

    <DialogDescription
      className="
        text-center
        text-[10px]
        text-[#756d67]
      "
    >
      牌也需要一点时间沉淀
    </DialogDescription>
  </DialogHeader>

  <Button
    onClick={onResponse}
    variant="ghost"
    className="
      mx-auto
      h-8
      w-auto
      rounded-full
      border
      border-[#1e1d1c]/35
      bg-[#f8f2e8]/20
      px-3
      text-[12px]
      font-semibold
      tracking-[0.08em]
      text-[#7f6230]
      shadow-none
      hover:bg-[#efe4d1]
      hover:text-[#6c5228]
    "
  >
    留下共鸣 
  </Button>
</DialogContent>
      
    </Dialog>
  );
}