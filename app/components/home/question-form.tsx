"use client";

import { type FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { Loading } from "@/app/components/shared/loading";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import { messages } from "@/lib/i18n";
import { hasMinimumQuestionLength } from "@/lib/question/min-length";
import type { DivinationCatalyst, Language } from "@/lib/types";

const maxQuestionLength = 250;

type QuestionFormProps = {
  language: Language;
  placeholder: string;
  submitLabel: string;
  hint?: string;
  initialQuestion?: string;
  onSubmit: (question: string) => Promise<boolean>;
  isPending: boolean;
  catalyst?: DivinationCatalyst | null;
  destination?: string;
  storyMode?: boolean;
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
  hint,
  initialQuestion = "",
  onSubmit,
  catalyst = null,
  destination = "/select",
  storyMode = false,
}: QuestionFormProps) {
  const [question, setQuestion] = useState(initialQuestion);
  const router = useRouter();


  async function submitQuestion(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const submittedQuestion = question.trim();
    if (!submittedQuestion) {
      toast.add({
        id: "empty-question",
        title: storyMode ? messages[language].dice.emptyStory : "Empty Question",
        timeout: 1200,
      });
      return;
    }
    if (!hasMinimumQuestionLength(submittedQuestion)) {
      toast.add({
        id: "question-too-short",
        title: storyMode ? messages[language].dice.storyTooShort : messages[language].questionTooShort,
        timeout: 1500,
      });
      return;
    }
    if (submittedQuestion.length > maxQuestionLength) {
      toast.add({
        id: "question-too-long",
        title: storyMode ? messages[language].dice.storyTooLong : "Question is too long",
        timeout: 1500,
      });
      return;
    }
    // wait for redis to check limit
    const allowed = await onSubmit(submittedQuestion);
    if (!allowed) { return; }
    router.push(destination);
  }

  return (
    <div>

      <form className="mx-auto mt-[42px] mb-20 max-w-[820px] text-left max-[860px]:mt-0 max-[860px]:px-[10vw]" onSubmit={submitQuestion}>
        <div className="w-full opacity-80 dark:opacity-100">
          {hint && <p className="mb-4 text-center text-sm leading-relaxed text-[#C9C1D0]">{hint}</p>}
          <Textarea
            id="question"
            value={question}
            maxLength={storyMode ? undefined : maxQuestionLength}
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
      dark:bg-[#131219]
      border-primary/70
      text-[#342d3d]
      dark:text-[#c7c4cb]
      dark:border-[#9B88AD]

      focus-visible:ring-0
      focus-visible:border-primary
      dark:focus-visible:border-[#C9B4E0]

      caret-[#7f5b1f]/80
      dark:caret-[#8F869B]
      placeholder:text-[#342d3d]/25
      dark:placeholder:text-[#8F869B]
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
                  ? "text-[#9b722a]/65 dark:text-[#e5c878]"
                  : "text-[#342d3d]/30 dark:text-[#C9C1D0]"
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
        dark:border-[#f7efe3] dark:bg-transparent dark:text-[#f7efe3] dark:hover:bg-[#f7efe3]/8
      `}
            >
              <p className="font-medium">
                {isPending ? <Loading symbol={storyMode ? "★" : "☾"} color={storyMode ? "moonlight" : "gold"} /> : submitLabel}
              </p>
            </Button>
          </div>
        </div>

      </form>

    </div>
  );
}
