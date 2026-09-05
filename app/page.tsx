"use client";

import { useRouter } from "next/navigation";
import { QuestionForm } from "@/app/components/question-form";
import { useReadingSession } from "@/app/components/reading-session-provider";
import { messages } from "@/lib/i18n";
import { tarotDeck } from "@/lib/tarot/constants";
import { TarotPreloader } from "./components/image-preload";
import { FeatureInterest } from "./components/feature-interest";
import { DailyZodiac } from "./components/moon-sign-daily";
import { HomeBackground } from "./components/home-background";
import { MoonIcon } from "./components/moon-icon";

import { useState } from "react";
import { getVisitorId } from "@/lib/visitor/visitor-id";
import { toast } from "@/components/ui/toast";
import { ReadingLimitDialog } from "./components/dialog/reading-limit-dialog";
import { DailyLimitDialog } from "./components/dialog/daily-limit-dialog";

//用户增加共鸣换取次数
export default function LandingPage() {
  const [isPending, setIsPending] = useState(false);
  const [dailyLimitOpen, setDailyLimitOpen] = useState(false);
  const [ReadingLimitOpen, setReadingLimitOpen] = useState(false);

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
      setReadingLimitOpen(false);
    } catch (error) {
      console.error("Failed to add resonance:", error);
    } finally {
      setIsPending(false);
    }
  }
  //用户提交问题
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
        if (data.reason === "daily_limit") {
          setDailyLimitOpen(true);
        } else if (data.reason === "resonance_required") {
          setReadingLimitOpen(true);
        }

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
      <HomeBackground />
      <div className="content landingContent absolute! inset-x-0 top-[calc(76px+5svh)] md:top-[calc(76px+10vh)]">
        <div className="overlapMoon mx-auto ">
          <MoonIcon language={language} />
        </div>
        <DailyZodiac />
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
        open={ReadingLimitOpen}
        onOpenChange={setReadingLimitOpen}
        onResponse={handleResponse}

      />

      <DailyLimitDialog
        open={dailyLimitOpen}
        onOpenChange={setDailyLimitOpen}
      />

      {/* <FeatureInterest language={language} /> */}
    </>
  );
}
