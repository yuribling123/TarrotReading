"use client";

import { type FormEvent, useState } from "react";
import { toast } from "@/components/ui/toast";
import type { Language } from "@/lib/types";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input"

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
      toast.add({id: "empty-question", title: "Empty Question",timeout: 900});
      console.log("Empty Question");
      return;
    }
    if (submittedQuestion.length > maxQuestionLength) {
      toast.add({ title: "Question is too long" ,timeout: 1200});
      return;
    }
    router.push("/select");
    onSubmit(submittedQuestion);
  }

  return (
    <div>
          
    <form className="questionForm  -translate-y-40 " onSubmit={submitQuestion}>
      <label htmlFor="question"  >{label}</label>
      <div className="relative w-full">
      <Input id="question" value={question} onChange={(event) => setQuestion(event.target.value)} placeholder={placeholder} autoComplete="off" lang={language} className=" h-15 text-[16px]！ placeholder:text-[0.86rem] bg-white border-primary/70 text-primary  focus-visible:ring-0 focus-visible:border-primary" />
     
        {/* 强制16字体：输入时才不会自动放大 */}
        {/* <input
          className="text-[16px]! placeholder:text-[0.86rem]"
          id="question"
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          placeholder={placeholder}
          autoComplete="off"
          lang={language}
        />
        <button type="submit">{submitLabel}</button>
       */}
       <button type="submit" className="text-primary absolute right-4 top-1/2 -translate-y-1/2"> <p className="font-medium">{submitLabel}</p>  </button>
        </div>
        
      
    </form>
     
    </div>
  );
}
