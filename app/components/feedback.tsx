import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react";
import { toast } from "@/components/ui/toast";
import { useReadingSession } from "./reading-session-provider";

export function FeedBack() {
    const { feedback, setFeedback } = useReadingSession();
    const [isPending, setIsPending] = useState(false);
    const [count, setCount] = useState(0);
    useEffect(
        () => {
            async function loadFeedback() {
                const response = await fetch("/api/reading-feedback");
                const data = await response.json();
                setCount(data.count)
            }
            loadFeedback()
        }, []
    )


    async function handleOnClick() {
        setIsPending(true);
        const response = await fetch("/api/reading-feedback", { method: "POST", });
        try {
            if (response.ok) { //succeed
                const data = await response.json();
                toast.add({ title: "月光记住了这份共鸣", timeout: 1300 })
                setFeedback(true);
                setIsPending(false);
                setCount(data.count);
            }
        } finally { setIsPending(false); }
    }

    return (
        <div className="mt-8 flex flex-col items-center ">
            <Button size="lg" onClick={handleOnClick} variant="secondary" disabled={feedback || isPending} className="w-20 self-center">
                {feedback ? <p>已回应</p> : <p>留下共鸣</p>}
            </Button>
            <p className="mt-3.5 text-[10px] text-[#595858]/80 self-center">听说，共鸣过的牌会更灵一点 ···</p>
            <p className="mt-8  text-[9px] font-medium text-[#b89552]/90 self-center">月光下已有 {count} 份共鸣</p>

        </div>

    )

}