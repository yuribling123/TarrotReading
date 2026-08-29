"use client";

import { useRouter } from "next/navigation";
import { QuestionForm } from "@/app/components/question-form";
import { useReadingSession } from "@/app/components/reading-session-provider";
import { messages } from "@/lib/i18n";
import { tarotDeck } from "@/lib/tarot/constants";
import { TarotPreloader } from "./components/image-preload";
import { FeatureInterest } from "./components/feature-interest";
import { DailyZodiac } from "./components/moon-sign-daily";
import { ReadingLimitDialog } from "./components/reading-limit-dialog";
import { useState } from "react";
import { getVisitorId } from "@/lib/visitor/visitor-id";
import { toast } from "@/components/ui/toast";


export default function LandingPage() {
  const [open, setDialogOpen] = useState(false);
  const { language, setError, setQuestion } = useReadingSession();
  const text = messages[language];
  const deck = tarotDeck

  async function handleResponse() {
    try {
      // 留下共鸣 +1
      const feedbackResponse = await fetch("/api/reading-feedback", {method: "POST",});
      if (!feedbackResponse.ok) {throw new Error("Failed to add feedback");}
      //redis 限制清0
      const visitorId = getVisitorId();
      const response = await fetch(`/api/reading-limit/${visitorId}`, { method: "DELETE", });
      if (!response.ok) {throw new Error("Failed to reset reading limit");}
      // 清零成功后再关闭弹窗
      toast.add({ title: "月光记住了这份共鸣", timeout: 2600 })
      setDialogOpen(false);
    } catch (error) {
      console.error("Failed to reset reading limit:", error);
    }
  }

  async function handleQuestion(question: string) {
    try {
      // 查redis次数
      const visitorId = getVisitorId();
      const response = await fetch(
        `/api/reading-limit/${visitorId}`
      );

      if (!response.ok) {
        throw new Error("Failed to check reading limit");
      }
      const data = await response.json();

      if (!data.allowed) {
        setDialogOpen(true);
        return false;
      }
    } catch (error) {
      console.error("Failed to check reading limit:", error);
    }
    setQuestion(question);
    setError("");
    return true;
  }

  return (
    <>
      <TarotPreloader deck={deck} />
      <div className="landingBackdrop" aria-hidden="true" />
      <div className="content landingContent -translate-y-30"> 
        <DailyZodiac/>
        <QuestionForm 
          language={language}
          label={text.questionLabel}
          placeholder={text.questionPlaceholder}
          submitLabel={text.enter}
          emptyQuestionMessage={text.emptyQuestion}
          questionTooLongMessage={text.questionTooLong}
          onSubmit={handleQuestion}
        />
        </div>



      <ReadingLimitDialog

        open={open}

        onOpenChange={setDialogOpen}

        onResponse={handleResponse}

      />
        
      <FeatureInterest language={language} />
    </>
  );
}
