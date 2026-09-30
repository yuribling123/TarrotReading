import { diceFaceNames } from "@/lib/dice/faces";
import { DieSymbol } from "./die-symbols";
import { StoryResonance } from "./story-resonance";
import type { DiceFaceId, GeneratedStory } from "@/lib/types";

type DiceStoryResultProps = {
  result: GeneratedStory;
  face: DiceFaceId | null;
  hasLeftStar: boolean;
  onStarLeft: () => void;
};

export function DiceStoryResult({ result, face, hasLeftStar, onStarLeft }: DiceStoryResultProps) {
  return (
    <article className="mx-auto mt-6 max-w-md pb-20 text-left">
      <div className="mx-auto mb-5 h-px w-30 bg-gradient-to-r from-transparent via-[#b99be8]/25 to-transparent" aria-hidden="true" />
      <h2 className="mb-8 tracking-[0.06em] font-medium text-center font-serif text-xl leading-snug text-[#e9e3ed] ">{result.title}</h2>
      <div className="space-y-6 text-sm font-normal leading-8 text-[#c5bacd]">
        {result.story.scenes.map((scene, index) => <p key={index}>{scene}</p>)}
      </div>
      {face && (
        <footer className="mt-10 flex flex-col items-center gap-2 border-t border-[#b99be8]/20 pt-6 text-center text-xs tracking-[0.12em] text-[#cfc4d3]">
          <DieSymbol face={face} idPrefix="story-seal" />
          <span>{diceFaceNames[face]}</span>
        </footer>
      )}
      <StoryResonance hasLeftStar={hasLeftStar} onStarLeft={onStarLeft} />
    </article>
  );
}
