"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { messages } from "@/lib/i18n";
import { QuestionSummary } from "@/app/components/question-summary";
import { ReadingResult } from "@/app/components/reading-result";
import { ReadingCardSpread } from "@/app/components/reading-card-spread";
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
    <div className="content readingContent flex flex-col items-center">
      <QuestionSummary 
        question={question}
      />

      <div
        className="
          mt-8 w-full max-w-[780px] rounded-xl bg-white px-3 py-2
          sm:py-4 sm:px-5
          lg:px-8 lg:py-7
        "
      >
        <ReadingCardSpread cards={cards} />
      </div>

      <ReadingResult   zodiac={reading.zodiac} reading={reading} summaryLabel={text.readingSummary}/>

    

      <FeedBack/>
    </div>
  );
}
