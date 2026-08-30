"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Loading } from "./loading";

interface ReadingLimitDialogProps {
    isPending: boolean;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onResponse: () => void;
}

export function ReadingLimitDialog({
    isPending,
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
    w-65
    max-w-[85vw]
    rounded-[28px]
    border
    border-[#c9ad73]/25
    bg-[#fffdf9]/95
    pt-6
    text-center
    shadow-[0_18px_50px_rgba(45,38,55,0.16)]
    backdrop-blur-xl
  "
            >
                <DialogHeader className="items-center text-center">
        
                    <DialogTitle
                        className="
        text-center
        text-[12px]
        font-medium
        tracking-[0.02em]
        text-[#4f4659]/90
        pb-2
      "
                    >
                          今夜的牌已回应
                    </DialogTitle>

                    <DialogDescription
                        className="
        text-center
        text-[10px]
        text-[#756d67]
      "
                    >
                         ✦ 留下一点共鸣，再继续下一问
                    </DialogDescription>
                </DialogHeader>

                <Button
                    disabled={isPending}
                    onClick={onResponse}
                    variant="ghost"
                    className="
      mx-auto

      h-8
      w-14
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
      focus-visible:ring-0
      focus-visible:outline-none
      disabled:opacity-100
      disabled:bg-[#f8f2e8]/20
      disabled:border-[#1e1d1c]/35
      [-webkit-tap-highlight-color:transparent]
    "
                >
                    {isPending ? <Loading /> : "共鸣"}
                </Button>
            </DialogContent>

        </Dialog>
    );
}