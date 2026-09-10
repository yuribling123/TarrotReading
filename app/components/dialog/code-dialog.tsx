import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/toast";
import { useState } from "react";
import { Loading } from "../loading";
import { ZodiacSelector } from "./zodiac-selector";

interface ZodiacUnlockDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (zodiac: string) => void;
}

export function CodeDialog({
  onConfirm,
  open,
  onOpenChange,
}: ZodiacUnlockDialogProps) {
  const [code, setCode] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  async function handleRedeem() {
    try {
      setIsPending(true);

      const response = await fetch("/api/redeem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });

      await response.json();

      if (!response.ok) {
        toast.add({
          id: "invalid-redeem-code",
          title: "兑换码无效",
          timeout: 1200
        });
        return;
      }

      toast.add({ title: "已开启 ✦", timeout: 1200 });
      setUnlocked(true);
    } finally {
      setIsPending(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="
          w-[60vw]
          max-w-[60vw]
          rounded-[28px]
          border
          border-[#c9ad73]/25
          bg-[#fffdf9]/70
          pt-10
          pb-6
          px-12
          text-center
          shadow-[0_18px_50px_rgba(45,38,55,0.16)]
          backdrop-blur-xl
        "
      >
        {unlocked ? (
          <div className="mx-auto w-fit">

            <ZodiacSelector onConfirm={onConfirm} />

          </div>

        ) : (
          <>
            <DialogHeader className="items-center text-center">
              <DialogTitle
                className="
             
                  text-center
                  text-[13px]
                  font-medium
                  tracking-[0.02em]
                  text-[#232125]/70
                "
              >
                今夜星象暂歇
              </DialogTitle>

              <DialogDescription

                className="
      text-center
      text-[11px]
      text-[#232125]/50
    "
              >

                开放时间：每周五至周日

              </DialogDescription>
            </DialogHeader>

            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              type="text"
              placeholder="凭月光码提前开启"
              className="
                mx-auto
                
                h-12
                w-45
                rounded-full
                border
                border-[#c9ad73]/25
                bg-white/45
                px-4
                text-center
                text-[16px]!
                tracking-[0.08em]
                text-[#232125]/88
                caret-[#7f5b1f]
                outline-none
                transition
                placeholder:text-[12px]
                placeholder:tracking-normal
                placeholder:text-[#756d67]/45
                focus:border-[#c9ad73]/50
                focus:bg-white/60
              "
            />

            <Button
              onClick={handleRedeem}
              variant="secondary"
              disabled={isPending}
              className="
                mx-auto
                mt-2
                h-11
                w-16
                rounded-full
                border
                text-[12px]
                font-semibold
                tracking-[0.08em]
                shadow-none
                focus-visible:outline-none
                focus-visible:ring-0
                [-webkit-tap-highlight-color:transparent]
              "
            >
              {isPending ? <Loading /> : "开启"}
            </Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}