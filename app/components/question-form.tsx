"use client";

import { type FormEvent, useState } from "react";
import { toast } from "@/components/ui/toast";
import type { Language } from "@/lib/types";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";

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
          
    <form className="questionForm " onSubmit={submitQuestion}>
      {/* <label htmlFor="question"  >{label}</label> */}
      <div className="relative w-full">
      <Input id="question" value={question} onBlur={() => window.scrollTo(0, 0)}  onChange={(event) => setQuestion(event.target.value)} placeholder={placeholder} autoComplete="off" lang={language} className="pr-21 h-17 text-[16px]!  bg-white border-primary/70 text-[#51485C]/70 focus-visible:ring-0 focus-visible:border-primary caret-[#c98f9f]" />
     
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
       <Button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 h-10 px-5 rounded-full border border-[#d8bc78]/60 bg-[#e6cb7e]/10 text-[#9b722a] shadow-none transition-all duration-300 hover:bg-[#e6cb7e]/35 hover:text-[#7d5b20] hover:border-[#d8bc78] active:scale-[0.97]"> <p className="font-medium">{submitLabel}</p>  </Button>
        </div>
        
      
    </form>
     
    </div>
  );
}
