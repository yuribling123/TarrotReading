"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { CardSelect } from "@/app/components/card-select";
import { ReadingLoading } from "@/app/components/reading-loading";
import { useReadingSession } from "@/app/components/reading-session-provider";
import { messages } from "@/lib/i18n";
import { shuffleDeck } from "@/lib/tarot/deck";
import type { ReadingResponse, TarotCard } from "@/lib/types";
import { toast } from "@/components/ui/toast";

export default function SelectPage() {
  const router = useRouter();

  // Shuffle once. Card order and orientation stay fixed for this reading.
  const [deck] = useState(() => shuffleDeck());
  const [selectedCards, setSelectedCards] = useState<TarotCard[]>([]);
  const [isRevealing, setIsRevealing] = useState(false);
  const [isReadingReady, setIsReadingReady] = useState(false);

  const {
    error,
    isHydrated,
    language,
    question,
    setCards,
    setError,
    setReading,
  } = useReadingSession();

  const text = messages[language];

  // A question is required before selecting cards.
  useEffect(() => {
    if (isHydrated && !question) {
      router.replace("/");
    }
  }, [isHydrated, question, router]);

  function selectCard(card: TarotCard) {
    setError("");

    setSelectedCards((selected) => {
      if (
        selected.length >= 3 ||
        selected.some((item) => item.name === card.name)
      ) {
        return selected;
      }

      return [...selected, card];
    });
  }

  async function generateReading(cards: TarotCard[]) {
    setError("");
    setIsReadingReady(false);

    try {
      const response = await fetch("/api/reading/deepseek", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question,
          cards,
          language,
        }),
      });
      const reading = (await response.json()) as ReadingResponse 
      setReading(reading);
      setIsReadingReady(true);
      // Let the completion animation finish.
      await new Promise((resolve) => setTimeout(resolve, 650));
      router.push("/reading");
    } catch (error) {
      router.push("/error");
    }
  }

  function revealCards() {
    if (selectedCards.length !== 3) {
      setError(text.incompleteSpread);
      return;
    }

    // These cards are already fully determined by the shuffle + selection.
    setCards(selectedCards);
    setReading(null);
    setError("");
    setIsRevealing(true);

    setTimeout(() => {
      void generateReading(selectedCards);
    }, 1300);
  }

  if (!isHydrated || !question) {
    return null;
  }

  return (
    <div
      className={`content selectionContent ${isRevealing ? "ritualContent" : ""
        }`}
    >
      {isRevealing ? (
        <ReadingLoading
          cards={selectedCards}
          complete={isReadingReady}
          onRetry={() => void generateReading(selectedCards)}
          retryLabel={text.retry}
          stages={text.loadingStages}
        />
      ) : (
        <CardSelect
          language={language}
          deck={deck}
          selectedCards={selectedCards}
          question={question}
          onSelect={selectCard}
          onReveal={revealCards}
        />
      )}
    </div>
  );
}