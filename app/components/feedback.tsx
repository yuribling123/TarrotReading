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
        setFeedback(true);
        const response = await fetch("/api/reading-feedback", { method: "POST", });
        try {
            if (response.ok) { //succeed
                const data = await response.json();
                setFeedback(true)
                setCount(data.count);
                toast.add({ title: "月光记住了这份共鸣", timeout: 1200 })
            }
        } finally { setIsPending(false); }
    }

    return (
        <div className="translate-y-8  flex flex-col">
            <Button size="lg" onClick={handleOnClick} variant="secondary" disabled={feedback || isPending}>
                {feedback ? <p>已回应</p> : <p> 有共鸣 </p>}
            </Button>
            <p className="mt-5 text-[#51485c]/30 ">月光下已有 {count} 份共鸣</p>

        </div>

    )

}