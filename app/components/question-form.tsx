"use client";

import { type FormEvent, useState } from "react";
import { toast } from "@/components/ui/toast";
import type { Language } from "@/lib/types";
import { useRouter } from "next/navigation";

const maxQuestionLength = 180;

type QuestionFormProps = {
  language: Language;
  label: string;
  placeholder: string;
  submitLabel: string;
  emptyQuestionMessage: string;
  questionTooLongMessage: string;
  initialQuestion?: string;
  onSubmit: (question: string) => void;
};

export function QuestionForm({
  language,
  label,
  placeholder,
  submitLabel,
  initialQuestion = "",
  onSubmit,
}: QuestionFormProps) {
  const [question, setQuestion] = useState(initialQuestion);
  const router = useRouter();

  function submitQuestion(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const submittedQuestion = question.trim();

    if (!submittedQuestion) {
      toast.add({ title: "Empty Question"});
      console.log("Empty Question");
      return;
    }
    if (submittedQuestion.length > maxQuestionLength) {
      toast.add({ title: "Question is too long" });
      return;
    }
    router.push("/select");
    onSubmit(submittedQuestion);
  }

  return (
    <div>
          
    <form className="questionForm overflow-hidden " onSubmit={submitQuestion}>
      <label htmlFor="question" >{label}</label>
      <div className="inputRow">
        <input
          id="question"
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          placeholder={placeholder}
          autoComplete="off"
          lang={language}
        />
        <button type="submit">{submitLabel}</button>
      </div>

      
    </form>
     
    </div>
  );
}
