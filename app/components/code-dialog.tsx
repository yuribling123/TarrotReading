import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "@/components/ui/toast";
import { useState } from "react";
import { Loading } from "./loading";


interface ZodiacUnlockDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function CodeDialog({
    open,
    onOpenChange,
}: ZodiacUnlockDialogProps) {
    const [code, setCode] = useState("");
    const [isPending, setIsPending] = useState(false);

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

            const data = await response.json();

            if (!response.ok) {
                toast.add({ id: "invalid-redeem-code", title: "兑换码无效" });
                return;
            }

            // 兑换成功
            toast.add({ title: "已开启 ✦ " });
            onOpenChange(false);
        }
        finally {
            setIsPending(false);
        }
    }


    return (

        <Dialog open={open} onOpenChange={onOpenChange}>
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
          font-medium
          tracking-[0.02em]
          text-[#232125]/88
        "
                    >
                        输入月光兑换码
                    </DialogTitle>

                </DialogHeader>

                <input
                    onChange={(e) => setCode(e.target.value)}
                    type="text"
                    placeholder="输入兑换码"
                    className="
        mx-auto
        mt-2
        h-10
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
        caret-[#b89552]
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
            </DialogContent>
        </Dialog>



    )
}

