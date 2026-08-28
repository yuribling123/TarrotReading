import { Button } from "@/components/ui/button"
import { useState } from "react";
import { toast } from "@/components/ui/toast";
import { useReadingSession } from "./reading-session-provider";

export function FeedBack() {
    const { feedback, setFeedback } = useReadingSession();
    const [isPending, setIsPending] = useState(false);



    async function handleOnClick() {
        setIsPending(true);
        setFeedback(true);
        const response = await fetch("/api/reading-feedback", { method: "POST", });
        try{
            if (response.ok){ //succeed
                setFeedback(true)
                toast.add({title:"月光记住了这份共鸣",timeout: 1200})
            }
        } finally {setIsPending(false);}
    }
    
    return (
        <div className="translate-y-8 font-bold">
            <Button size="lg" onClick={handleOnClick} variant="secondary" disabled={feedback || isPending}>
                {feedback ?  <p>已回应</p> :  <p> 有共鸣 </p> }
            </Button>

        </div>

    )

}