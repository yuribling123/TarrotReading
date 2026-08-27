"use client";

import { useRouter } from "next/navigation";
import { QuestionForm } from "@/app/components/question-form";
import { useReadingSession } from "@/app/components/reading-session-provider";
import { messages } from "@/lib/i18n";
import { tarotDeck } from "@/lib/tarot/constants";
import { TarotPreloader } from "./components/image-preload";
import { FeatureInterest } from "./components/feature-interest";

export default function LandingPage() {
  const router = useRouter();
  const { language, setError, setQuestion } = useReadingSession();
  const text = messages[language];
  const deck = tarotDeck


  function handleQuestion(question: string) {
    setQuestion(question);
    setError("");
  }

  return (
    <>
      <TarotPreloader deck={deck} />
      <div className="landingBackdrop" aria-hidden="true" />
      <div className="content landingContent"> 
       
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
        
      <FeatureInterest language={language} />
    </>
  );
}
