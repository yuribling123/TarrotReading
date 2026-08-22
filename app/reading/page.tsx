"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { QuestionSummary } from "@/app/components/question-summary";
import { ReadingResult } from "@/app/components/reading-result";
import { TarotCard } from "@/app/components/tarot-card";
import { useReadingSession } from "@/app/components/reading-session-provider";
import { messages } from "@/lib/i18n";

export default function ReadingPage() {
  const router = useRouter();
  const { cards, isHydrated, language, question, reading } = useReadingSession();
  const text = messages[language];

  useEffect(() => {
    if (isHydrated && !reading) {
      router.replace(question ? "/select" : "/");
    }
  }, [isHydrated, question, reading, router]);

  if (!isHydrated || !reading) {
    return null;
  }

  return (
    <div className="content readingContent">
      <QuestionSummary label={text.questionSummaryLabel} question={question} showLabel={false} minimal />
      <div className="spreadPanel">
        <section className="spread" aria-label="Three card spread">
          {cards.map((card, index) => (
            <TarotCard
              key={card.id}
              mode="revealed"
              card={card}
              index={index}
              position={reading.cards[index]?.position}
            />
          ))}
        </section>
      </div>
      <ReadingResult
        reading={reading}
        summaryLabel={text.readingSummary}
      />
    </div>
  );
}
