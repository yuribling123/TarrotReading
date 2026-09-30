"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useReadingSession } from "@/app/components/reading/reading-session-provider";
import { DiceDailyLimitDialog } from "./dice-daily-limit-dialog";
import { DiceStoryResult } from "./dice-story-result";
import { StarDie } from "./star-die";
import { useDiceStory } from "./use-dice-story";

export function DiceExperience() {
  const router = useRouter();
  const { question, isHydrated } = useReadingSession();
  const waitingLetters = Array.from("正在连接异世界");
  const { state, isLoaded, generate, retry, settle, reveal, markStarLeft } = useDiceStory(question, isHydrated);

  useEffect(() => {
    if (isHydrated && !question.trim()) router.replace("/");
  }, [isHydrated, question, router]);

  if (!isLoaded || !question.trim()) return null;
  const entering = state.phase === "idle";

  return (
    <div className="mx-auto max-w-2xl text-center">
      <h1 className={`mb-1 text-sm! leading-snug! tracking-[0.2em] text-[#e5dbeb] sm:text-base! ${entering ? "animate-[dice-title-enter_550ms_100ms_ease-out_both] motion-reduce:animate-none" : ""}`}>星星的岔路口</h1>
      <p className={`pt-3 pb-3 text-sm leading-6 text-[#cfc4d3]/60 ${entering ? "animate-[dice-title-enter_550ms_320ms_ease-out_both] motion-reduce:animate-none" : ""}`}>看看另一个你，会遇见怎样的剧情</p>
      <StarDie
        initialFace={state.face}
        playEntrance={entering}
        onRoll={(face) => void generate(face)}
        onSettled={settle}
      />

      {state.settled && state.phase === "generating" && (
        <p className="mt-8 text-sm text-[#c9c1d0]" role="status" aria-label="正在连接异世界">
          {waitingLetters.map((letter, index) => (
            <span
              key={index}
              aria-hidden="true"
              className="inline-block whitespace-pre animate-[story-letter-hop_2s_ease-in-out_infinite] motion-reduce:animate-none"
              style={{
                animationDelay: `${index * 90}ms`,
                animationDuration: `${waitingLetters.length * 90 + 1000}ms`,
              }}
            >
              {letter}
            </span>
          ))}
        </p>
      )}
      {state.settled && (state.phase === "error" || state.phase === "countError") && (
        <div className="mt-8">
          <p className="text-sm text-[#c9c1d0]" role="alert">{state.phase === "error" ? "故事暂时没有送达，再试一次。" : "故事已经到达，但暂时无法记录今天的投骰次数。"}</p>
          <button className="mt-4 rounded-full border border-[#f7efe3] px-5 py-2 text-sm hover:bg-white/10" type="button" onClick={() => void retry()}>{state.phase === "error" ? "重新连接" : "重新确认"}</button>
        </div>
      )}
      {state.settled && state.phase === "ready" && !state.revealed && (
        <button
          className="group relative isolate mt-8 rounded-full border border-[#cfc4d3]/70 bg-[#6e5b82]/15 px-7 py-3 text-sm font-medium text-[#cfc4d3] shadow-[0_0_18px_rgba(173,140,204,0.12)] transition-[background-color,transform] hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-[#f7efe3]"
          type="button"
          onClick={reveal}
        >
          <span className="pointer-events-none absolute -inset-1 -z-10 rounded-full border border-[#d7b56d]/45 animate-[story-reveal-glow_2.8s_ease-in-out_infinite] motion-reduce:animate-none" aria-hidden="true" />
          揭开故事
          <span className="ml-2 inline-block animate-[story-reveal-cue_2.8s_ease-in-out_infinite] group-hover:translate-x-1 motion-reduce:animate-none" aria-hidden="true">→</span>
        </button>
      )}
      {state.settled && state.phase === "ready" && state.result && (
        <div className={`grid transition-[grid-template-rows] duration-[1700ms] ease-[cubic-bezier(0.45,0,0.2,1)] motion-reduce:transition-none ${state.revealed ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
          <div className="min-h-0 overflow-hidden" inert={!state.revealed}>
            <DiceStoryResult result={state.result} face={state.face} hasLeftStar={state.starLeft} onStarLeft={markStarLeft} />
          </div>
        </div>
      )}
      <DiceDailyLimitDialog
        open={state.phase === "limit"}
        onOpenChange={(open) => { if (!open) router.replace("/"); }}
      />
    </div>
  );
}
