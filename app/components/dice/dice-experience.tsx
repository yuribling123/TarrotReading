"use client";

import Link from "next/link";

import { useReadingSession } from "@/app/components/reading/reading-session-provider";
import { messages } from "@/lib/i18n";
import { StarDie } from "./star-die";
import { useDiceStory } from "./use-dice-story";

export function DiceExperience() {
  const { language, question, isHydrated } = useReadingSession();
  const text = messages[language].dice;
  const { state, isLoaded, generate, retry, settle, reveal } = useDiceStory(question, language, isHydrated);

  if (!isLoaded) return null;
  if (!question.trim()) {
    return <div className="mx-auto max-w-xl text-center"><p>{text.missingStory}</p><Link className="mt-6 inline-block underline" href="/">{text.backHome}</Link></div>;
  }

  return (
    <div className="mx-auto max-w-2xl text-center">
      <h1 className="mb-8 text-2xl! leading-snug! tracking-wide sm:text-3xl!">{text.title}</h1>
      <StarDie
        labels={text.faces}
        rollLabel={text.roll}
        rollingLabel={text.rolling}
        resultLabel={text.result}
        initialFace={state.face}
        onRoll={(face) => void generate(face)}
        onSettled={settle}
      />

      {state.settled && state.phase === "generating" && <p className="mt-8 text-sm text-[#c9c1d0]" role="status">{text.generating}</p>}
      {state.settled && state.phase === "error" && (
        <div className="mt-8">
          <p className="text-sm text-[#c9c1d0]" role="alert">{text.generationFailed}</p>
          <button className="mt-4 rounded-full border border-[#f7efe3] px-5 py-2 text-sm hover:bg-white/10" type="button" onClick={retry}>{text.retry}</button>
        </div>
      )}
      {state.settled && state.phase === "ready" && !state.revealed && (
        <button className="mt-8 rounded-full border border-[#f7efe3] px-6 py-3 text-sm font-medium hover:bg-white/10" type="button" onClick={reveal}>{text.reveal}</button>
      )}
      {state.revealed && state.result && (
        <article className="mx-auto mt-10 max-w-xl pb-20 text-left animate-in fade-in duration-500">
          <p className="mb-4 text-center text-xs tracking-[0.15em] text-[#c9c1d0]">{text.fictionLabel}</p>
          <h2 className="mb-8 text-center font-serif text-2xl leading-snug text-[#f7efe3]">{state.result.title}</h2>
          <div className="space-y-6 text-base leading-8 text-[#e8e0e8]">
            {state.result.story.scenes.map((scene, index) => <p key={index}>{scene}</p>)}
          </div>
          <p className="mt-9 border-t border-[#9b88ad]/40 pt-6 font-serif text-lg leading-8 text-[#f7efe3]">{state.result.story.closing}</p>
        </article>
      )}
    </div>
  );
}
