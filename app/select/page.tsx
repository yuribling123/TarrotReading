"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CardReveal } from "@/app/components/card-reveal";
import { ReadingLoading } from "@/app/components/reading-loading";
import { useReadingSession } from "@/app/components/reading-session-provider";
import { messages } from "@/lib/i18n";
import { drawCards } from "@/lib/tarot";
import type { ReadingResponse } from "@/lib/types";

export default function SelectPage() {
  const router = useRouter();
  const [isRevealing, setIsRevealing] = useState(false);
  const [isReadingReady, setIsReadingReady] = useState(false);
  const {
    cards,
    error,
    isHydrated,
    language,
    question,
    selectedIndexes,
    setCards,
    setError,
    setIsLoading,
    setReading,
    setSelectedIndexes,
  } = useReadingSession();
  const text = messages[language];

  useEffect(() => {
    if (isHydrated && !question) {
      router.replace("/");
    }
  }, [isHydrated, question, router]);

  function toggleCard(cardIndex: number) {
    setError("");
    setSelectedIndexes((current) => {
      if (current.includes(cardIndex)) {
        return current;
      }

      return current.length >= 3 ? current : [...current, cardIndex];
    });
  }

  async function generateReading(nextCards = cards) {
    setError("");
    setIsReadingReady(false);
    setIsLoading(true);

    try {
      const response = await fetch("/api/reading", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, cards: nextCards, language }),
      });
      const payload = (await response.json()) as ReadingResponse & { error?: string };

      if (!response.ok) {
        throw new Error(payload.error ?? "The reading could not be completed.");
      }

      if (!payload.answer?.trim() || !payload.guidance?.trim()) {
        throw new Error(text.genericError);
      }

      setReading(payload);
      setIsReadingReady(true);
      await new Promise<void>((resolve) => window.setTimeout(resolve, 650));
      router.push("/reading");
    } catch (readingError) {
      setError(readingError instanceof Error ? readingError.message : text.genericError);
    } finally {
      setIsLoading(false);
    }
  }

  function revealCards() {
    if (selectedIndexes.length !== 3) {
      setError(text.incompleteSpread);
      return;
    }

    const nextCards = drawCards(selectedIndexes);
    setCards(nextCards);
    setReading(null);
    setError("");
    setIsRevealing(true);

    window.setTimeout(() => {
      void generateReading(nextCards);
    }, 1300);
  }

  if (!isHydrated || !question) {
    return null;
  }

  return (
    <div className={`content selectionContent ${isRevealing ? "ritualContent" : ""}`}>
      {isRevealing ? (
        <ReadingLoading
          cards={cards}
          complete={isReadingReady}
          error={error}
          onRetry={() => void generateReading()}
          retryLabel={text.retry}
          stages={text.loadingStages}
        />
      ) : (
        <CardReveal
          instructionFirstLine={text.selectionInstructionFirstLine}
          instructionSecondLine={text.selectionInstructionSecondLine}
          error={error}
          hint={text.chosenHint}
          onReveal={revealCards}
          onToggle={toggleCard}
          question={question}
          questionLabel={text.questionSummaryLabel}
          revealLabel={text.reveal}
          selectedIndexes={selectedIndexes}
        />
      )}
    </div>
  );
}
