"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useReadingSession } from "@/app/components/reading/reading-session-provider";
import { messages } from "@/lib/i18n";
import { DiceDailyLimitDialog } from "./dice-daily-limit-dialog";
import { DieSymbol } from "./die-symbols";
import { StarDie } from "./star-die";
import { StoryResonance } from "./story-resonance";
import { useDiceStory } from "./use-dice-story";

export function DiceExperience() {
  const router = useRouter();
  const { language, question, isHydrated } = useReadingSession();
  const text = messages[language].dice;
  const waitingLetters = Array.from(text.generating);
  const { state, isLoaded, generate, retry, settle, reveal, markStarLeft } = useDiceStory(question, language, isHydrated);

  useEffect(() => {
    if (isHydrated && !question.trim()) router.replace("/");
  }, [isHydrated, question, router]);

  if (!isLoaded || !question.trim()) return null;
  const entering = state.phase === "idle";

  return (
    <div className="mx-auto max-w-2xl text-center">
      <h1 className={`mb-1 text-sm! leading-snug! tracking-[0.2em] text-[#e5dbeb] sm:text-base! ${entering ? "animate-[dice-title-enter_550ms_100ms_ease-out_both] motion-reduce:animate-none" : ""}`}>{text.title}</h1>
      <p className={`pt-3 pb-3 text-sm leading-6 text-[#cfc4d3]/60 ${entering ? "animate-[dice-title-enter_550ms_320ms_ease-out_both] motion-reduce:animate-none" : ""}`}>{text.subtitle}</p>
      <StarDie
        labels={text.faces}
        rollLabel={text.roll}
        rollingLabel={text.rolling}
        resultLabel={text.result}
        initialFace={state.face}
        playEntrance={entering}
        onRoll={(face) => void generate(face)}
        onSettled={settle}
      />

      {state.settled && state.phase === "generating" && (
        <p className="mt-8 text-sm text-[#c9c1d0]" role="status" aria-label={text.generating}>
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
      {state.settled && state.phase === "error" && (
        <div className="mt-8">
          <p className="text-sm text-[#c9c1d0]" role="alert">{text.generationFailed}</p>
          <button className="mt-4 rounded-full border border-[#f7efe3] px-5 py-2 text-sm hover:bg-white/10" type="button" onClick={retry}>{text.retry}</button>
        </div>
      )}
      {state.settled && state.phase === "countError" && (
        <div className="mt-8">
          <p className="text-sm text-[#c9c1d0]" role="alert">{text.countFailed}</p>
          <button className="mt-4 rounded-full border border-[#f7efe3] px-5 py-2 text-sm hover:bg-white/10" type="button" onClick={() => void retry()}>{text.retryCount}</button>
        </div>
      )}
      {state.settled && state.phase === "ready" && !state.revealed && (
        <button
          className="group relative isolate mt-8 rounded-full border border-[#cfc4d3]/70 bg-[#6e5b82]/15 px-7 py-3 text-sm font-medium text-[#cfc4d3] shadow-[0_0_18px_rgba(173,140,204,0.12)] transition-[background-color,transform] hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-[#f7efe3]"
          type="button"
          onClick={reveal}
        >
          <span className="pointer-events-none absolute -inset-1 -z-10 rounded-full border border-[#d7b56d]/45 animate-[story-reveal-glow_2.8s_ease-in-out_infinite] motion-reduce:animate-none" aria-hidden="true" />
          {text.reveal}
          <span className="ml-2 inline-block animate-[story-reveal-cue_2.8s_ease-in-out_infinite] group-hover:translate-x-1 motion-reduce:animate-none" aria-hidden="true">→</span>
        </button>
      )}
      {state.settled && state.phase === "ready" && state.result && (
        <div className={`grid transition-[grid-template-rows] duration-[1700ms] ease-[cubic-bezier(0.45,0,0.2,1)] motion-reduce:transition-none ${state.revealed ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
          <div className="min-h-0 overflow-hidden" inert={!state.revealed}>
            <article className="mx-auto mt-6 max-w-md pb-20 text-left">
              <div className="mx-auto mb-5 h-px w-30 bg-gradient-to-r from-transparent via-[#b99be8]/25 to-transparent" aria-hidden="true" />
              <h2 className="mb-8 tracking-[0.06em] font-medium text-center font-serif text-xl leading-snug text-[#e9e3ed] ">{state.result.title}</h2>
              <div className="space-y-6 text-sm font-normal leading-8 text-[#c5bacd]">
                {state.result.story.scenes.map((scene, index) => <p key={index}>{scene}</p>)}
              </div>
              {state.face && (
                <footer className="mt-10 flex flex-col items-center gap-2 border-t border-[#b99be8]/20 pt-6 text-center text-xs tracking-[0.12em] text-[#cfc4d3]">
                  <DieSymbol face={state.face} idPrefix="story-seal" />
                  <span>{text.faces[state.face]}</span>
                </footer>
              )}
              <StoryResonance hasLeftStar={state.starLeft} onStarLeft={markStarLeft} labels={text} />
            </article>
          </div>
        </div>
      )}
      <DiceDailyLimitDialog
        open={state.phase === "limit"}
        onOpenChange={(open) => { if (!open) router.replace("/"); }}
        labels={text}
      />
    </div>
  );
}
