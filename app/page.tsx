"use client";

import { QuestionForm } from "@/app/components/home/question-form";
import { useReadingSession } from "@/app/components/reading/reading-session-provider";
import { messages } from "@/lib/i18n";
import { tarotDeck } from "@/lib/tarot/constants";
import { TarotPreloader } from "@/app/components/cards/tarot-preloader";
import { DailyZodiac } from "@/app/components/moon/moon-sign-daily";
import { HomeBackground } from "@/app/components/home/home-background";
import { MoonIcon } from "@/app/components/moon/moon-icon";
import { DivinationCatalysts } from "@/app/components/home/divination-catalysts";
import { MoonlitPostcard } from "@/app/components/postcards/moonlit-postcard";
import { MoonLore } from "@/app/components/moon/moon-lore";

import { useEffect, useState } from "react";
import type { DivinationCatalyst } from "@/lib/types";
import { getVisitorId } from "@/lib/visitor/visitor-id";
import { toast } from "@/components/ui/toast";
import { ReadingLimitDialog } from "@/app/components/limits/reading-limit-dialog";
import { DailyLimitDialog } from "@/app/components/limits/daily-limit-dialog";
import { ShootingStars } from "./components/shared/shooting-star";

//用户增加共鸣换取次数
export default function LandingPage() {
  const [shootingStarsActive, setShootingStarsActive] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [dailyLimitOpen, setDailyLimitOpen] = useState(false);
  const [readingLimitOpen, setReadingLimitOpen] = useState(false);
  const [selectedCatalyst, setSelectedCatalyst] = useState<DivinationCatalyst | null>(null);
  const [moonLoreOpen, setMoonLoreOpen] = useState(false);

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

  useEffect(() => {

    const interval = setInterval(() => {

      setShootingStarsActive(true);

      setTimeout(() => {

        setShootingStarsActive(false);

      }, 10000);

    }, 20000);

    return () => clearInterval(interval);

  }, []);

  return (
    <>
      <TarotPreloader deck={deck} />
      <HomeBackground />
      <div
        className="pointer-events-none absolute inset-0 z-10 overflow-hidden"
        aria-hidden="true"
      >
        <ShootingStars active={shootingStarsActive} />
      </div>
      <MoonlitPostcard />
      <MoonLore open={moonLoreOpen} onClose={() => setMoonLoreOpen(false)} />
      <div className="landingContent absolute! inset-x-0 top-[calc(76px+5svh)] z-[1] mx-auto w-full max-w-[1120px] text-center text-[#f7f3e8] md:top-[calc(76px+10vh)]">
        <div className="overlapMoon mx-auto ">
          <MoonIcon language={language} onClick={() => setMoonLoreOpen(true)} />
        </div>
        <DailyZodiac />
        <QuestionForm
          language={language}
          placeholder={text.questionPlaceholder}
          submitLabel={text.enter}
          onSubmit={handleQuestion}
          isPending={isPending}
          catalyst={selectedCatalyst}
        />
        <DivinationCatalysts
          language={language}
          onActivate={setSelectedCatalyst}
          onClear={() => setSelectedCatalyst(null)}
        />
      </div>


      <ReadingLimitDialog
        isPending={isPending}
        open={readingLimitOpen}
        onOpenChange={setReadingLimitOpen}
        onResponse={handleResponse}

      />

      <DailyLimitDialog
        open={dailyLimitOpen}
        onOpenChange={setDailyLimitOpen}
      />

    </>
  );
}
