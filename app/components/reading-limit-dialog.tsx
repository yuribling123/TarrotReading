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
        text-center
        text-[13px]
       
        tracking-[0.02em]
        text-[#1b1a1c]/85
        pb-2
      "
                    >
                          今夜的牌已回应
                    </DialogTitle>

                    <DialogDescription
                        className="
        text-center
        text-[11px]
        text-[#1b1a1c]/70
      "
                    >
                         ✦ 留下一点共鸣，再继续下一问
                    </DialogDescription>
                </DialogHeader>

                <Button
                    disabled={isPending}
                    onClick={onResponse}
                    variant="secondary"
                    className="
      mx-auto
      h-11
      w-16
      rounded-full
      border
      mt-2
      text-[12px]
      font-semibold
      tracking-[0.08em]
      shadow-none
      focus-visible:ring-0
      focus-visible:outline-none
      disabled:opacity-100! 
      [-webkit-tap-highlight-color:transparent]
    "
                >
                    {isPending ? <Loading /> : "共鸣"}
                </Button>
            </DialogContent>

        </Dialog>
    );
}