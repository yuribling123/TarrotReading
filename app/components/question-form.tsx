"use client";

import { type FormEvent, useState } from "react";
import { toast } from "@/components/ui/toast";
import type { Language } from "@/lib/types";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { Loading } from "./loading";
import { Textarea } from "@/components/ui/textarea";

const maxQuestionLength = 250;

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
        <div className="w-full opacity-80">
          <Textarea
            id="question"
            value={question}
            maxLength={250}
            onBlur={() => window.scrollTo(0, 0)}
            onChange={(event) => setQuestion(event.target.value)}
            placeholder={placeholder}
            autoComplete="off"
            lang={language}
            className="
      h-40
      resize-none
      overflow-y-auto

      pl-5
      pt-3
      text-[16px]!
      leading-8
      tracking-[0.02em]
      bg-white
      border-primary/70
      text-[#342d3d]

      focus-visible:ring-0
      focus-visible:border-primary

      caret-[#7f5b1f]/80
      placeholder:text-[#342d3d]/25
    "
          />

          {/* 字数 + 开始 */}
          <div className="mt-2 flex items-center justify-between px-1">
            <span
              className={`
        text-[10px]
        tracking-[0.06em]
        transition-colors
        ${question.length >= 230
                  ? "text-[#9b722a]/65"
                  : "text-[#342d3d]/30"
                }
      `}
            >
              {question.length} / 250
            </span>

            <Button
              disabled={isPending}
              variant="secondary"
              type="submit"
              className="
        h-11
        min-w-16
        rounded-full
        px-5

        shadow-none
        disabled:opacity-100!

        transition-all
        duration-300

        active:scale-[0.86]
        active:shadow-[0_0_0_5px_rgba(230,203,126,0.10),0_0_22px_rgba(201,154,69,0.32)]
      "
            >
              <p className="font-medium">
                {isPending ? <Loading /> : submitLabel}
              </p>
            </Button>
          </div>
        </div>

      </form>

    </div>
  );
}
