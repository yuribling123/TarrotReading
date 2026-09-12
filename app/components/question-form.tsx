"use client";

import { type FormEvent, useState } from "react";
import { toast } from "@/components/ui/toast";
import type { DivinationCatalyst, Language } from "@/lib/types";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loading } from "./loading";
import { Textarea } from "@/components/ui/textarea";

const maxQuestionLength = 250;

type QuestionFormProps = {
  language: Language;
  placeholder: string;
  submitLabel: string;
  initialQuestion?: string;
  onSubmit: (question: string) => Promise<boolean>;
  isPending: boolean;
  catalyst?: DivinationCatalyst | null;
};

const catalystGlow: Record<DivinationCatalyst, string> = {
  moonstone:
    "border-[#d8c49a]/70 shadow-[0_0_0_4px_rgba(240,226,194,0.16),0_0_24px_rgba(226,202,151,0.38)]",
  candle:
    "border-[#c9875a]/65 shadow-[0_0_0_4px_rgba(201,135,90,0.12),0_0_24px_rgba(218,139,84,0.38)]",
  stardust:
    "border-[#806a96]/55 shadow-[0_0_0_4px_rgba(128,106,150,0.10),0_0_25px_rgba(105,84,127,0.34)]",
};

export function QuestionForm({
  isPending,
  language,
  placeholder,
  submitLabel,
  initialQuestion = "",
  onSubmit,
  catalyst = null,
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

      <form className="questionForm mb-20" onSubmit={submitQuestion}>
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
          <div className="mt-6 flex items-center justify-between px-1">
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
              className={`
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
        ${catalyst ? catalystGlow[catalyst] : "shadow-none"}
      `}
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
