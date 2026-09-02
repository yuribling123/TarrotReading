import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react";
import { toast } from "@/components/ui/toast";
import { useReadingSession } from "./reading-session-provider";
import { getVisitorId } from "@/lib/visitor/visitor-id";

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
        try {
            const visitorId = getVisitorId();

            const [feedbackResponse, resonanceResponse] = await Promise.all([
                fetch("/api/reading-feedback", {
                    method: "POST",
                }),
                fetch(`/api/reading-limit/${visitorId}/resonance`, {
                    method: "POST",
                }),
            ]);

            if (feedbackResponse.ok && resonanceResponse.ok) {
                const data = await feedbackResponse.json();

                toast.add({
                    title: "月光记住了这份共鸣",
                    timeout: 2600,
                });

                setFeedback(true);
                setCount(data.count);
            }
        } finally {
            setIsPending(false);
        }
    }

    return (
        <div className=" flex flex-col items-center mt-4 ">
            <p className="mt-4 text-[10px] text-[#595858]/80 self-center">听说留下共鸣的人，牌意更容易被宇宙收到 ✦</p>
            <Button size="lg" onClick={handleOnClick} variant="secondary" disabled={feedback || isPending} className="mt-4 w-22 self-center">
                {feedback ? <p>已收下</p> : <p>♡ 留下共鸣</p>}
            </Button>

            <p className="mt-4  text-[9px] font-medium text-[#383140]/90 self-center">已有 {count} 份共鸣</p>

        </div>

    )

}