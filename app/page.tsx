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
  const [isPending, setIsPending] = useState(false);
  const [open, setDialogOpen] = useState(false);
  const { language, setError, setQuestion } = useReadingSession();
  const text = messages[language];
  const deck = tarotDeck

async function handleResponse() {
  setIsPending(true);
  try {
    const visitorId = getVisitorId();
    // 全站共鸣总数 +1
    const feedbackResponse = await fetch(
      "/api/reading-feedback",
      { method: "POST" }
    );
    if (!feedbackResponse.ok) {
      throw new Error("Failed to add feedback");
    }
    // 当前 visitor 的 resonance +1
    const resonanceResponse = await fetch(
      `/api/reading-limit/${visitorId}/resonance`,
      { method: "POST" }
    );
    if (!resonanceResponse.ok) {
      throw new Error("Failed to add resonance");
    }

    toast.add({
      title: "月光记住了这份共鸣",
      timeout: 2600,
    });
    setDialogOpen(false);
  } catch (error) {
    console.error("Failed to add resonance:", error);
  } finally {
    setIsPending(false);
  }
}

async function handleQuestion(question: string) {
  setIsPending(true);
  try {
    // 查 Redis 次数
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
    setQuestion(question);
    setError("");
    return true;

  } catch (error) {
    // Redis 出错时 fail-open，不影响正常占卜
    console.error("Failed to check reading limit:", error);

    setQuestion(question);
    setError("");
    return true;

  } finally {
    setIsPending(false);
  }
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
          isPending={isPending}
        />
        </div>


      <ReadingLimitDialog
        isPending={isPending}
        open={open}

        onOpenChange={setDialogOpen}

        onResponse={handleResponse}

      />
        
      <FeatureInterest language={language} />
    </>
  );
}
