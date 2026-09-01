"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { messages } from "@/lib/i18n";
import { QuestionSummary } from "@/app/components/question-summary";
import { ReadingResult } from "@/app/components/reading-result";
import { Card } from "@/app/components/card";
import { useReadingSession } from "@/app/components/reading-session-provider";
import { FeedBack } from "../components/feedback";

export default function ReadingPage() {
  const router = useRouter();
  const {
    language,
    cards,
    isHydrated,
    question,
    reading,
  } = useReadingSession();
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
      <QuestionSummary 
        question={question}
      />

      <div className="spreadPanel">
        <section
          className="spread"
          aria-label="Three card spread"
        >
          {cards.map((card) => (
            <Card
              key={card.name}
              card={card}
              isSelected
              onSelect={() => {}}
            />
          ))}
        </section>
      </div>

      <ReadingResult reading={reading} summaryLabel={text.readingSummary}/>

      <FeedBack/>
    </div>
  );
}