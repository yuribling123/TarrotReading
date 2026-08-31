"use client";

import { type FormEvent, useState } from "react";
import { toast } from "@/components/ui/toast";
import type { Language } from "@/lib/types";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { Loading } from "./loading";

const maxQuestionLength = 180;

type QuestionFormProps = {
  language: Language;
  label: string;
  placeholder: string;
  submitLabel: string;
  emptyQuestionMessage: string;
  questionTooLongMessage: string;
  initialQuestion?: string;
  onSubmit: (question: string) => Promise<boolean>;
  isPending: boolean;
};

export function QuestionForm({
  isPending,
  language,
  label,
  placeholder,
  submitLabel,
  initialQuestion = "",
  onSubmit,
}: QuestionFormProps) {
  const [question, setQuestion] = useState(initialQuestion);
  const router = useRouter();


  async function submitQuestion(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const submittedQuestion = question.trim();
    if (!submittedQuestion) {
      toast.add({ id: "empty-question", title: "Empty Question", timeout: 900 });
      console.log("Empty Question");
      return;
    }
    if (submittedQuestion.length > maxQuestionLength) {
      toast.add({ title: "Question is too long", timeout: 1200 });
      return;
    }
    // wait for redis to check limit
    const allowed = await onSubmit(submittedQuestion);
    if (!allowed) { return; }
    router.push("/select");
  }

  return (
    <div>

      <form className="questionForm" onSubmit={submitQuestion}>
        {/* <label htmlFor="question"  >{label}</label> */}
        <div className="relative w-full">
          <Input id="question" value={question} onBlur={() => window.scrollTo(0, 0)} onChange={(event) => setQuestion(event.target.value)} placeholder={placeholder} autoComplete="off" lang={language} className="pr-21 pl-5 h-17 text-[16px]!  bg-white border-primary/70 text-[#342d3d]/80 focus-visible:ring-0 focus-visible:border-primary caret-[#7f5b1f]/80" />

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
          <Button disabled={isPending} variant="secondary" type="submit" className="disabled:opacity-100!  absolute w-16 right-3 top-1/2 -translate-y-1/2 h-13 px-5 rounded-full  shadow-none transition-all duration-300 active:scale-[0.76] active:shadow-[0_0_0_5px_rgba(230,203,126,0.10),0_0_22px_rgba(201,154,69,0.32)]"><p className="font-medium">{isPending ? <Loading /> :submitLabel}</p></Button>
        </div>


      </form>

    </div>
  );
}
