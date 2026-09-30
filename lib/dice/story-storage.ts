import { isGeneratedStory, isStoryRequest } from "@/lib/dice/story-validation";
import type { GeneratedStory, StoryRequest } from "@/lib/types";

export const diceStoryStorageKey = "moonlit-otherworld-story";

export type StoredDiceStory = {
  input: StoryRequest;
  result?: GeneratedStory;
  starLeft?: boolean;
};

export function readStoredDiceStory(): StoredDiceStory | null {
  const raw = window.sessionStorage.getItem(diceStoryStorageKey);
  if (!raw) return null;

  const stored: unknown = JSON.parse(raw);
  if (!stored || typeof stored !== "object" || !("input" in stored) || !isStoryRequest(stored.input)) {
    return null;
  }
  return {
    input: stored.input,
    result: "result" in stored && isGeneratedStory(stored.result) ? stored.result : undefined,
    starLeft: "starLeft" in stored && stored.starLeft === true,
  };
}

export function saveStoredDiceStory(story: StoredDiceStory) {
  window.sessionStorage.setItem(diceStoryStorageKey, JSON.stringify(story));
}

export function clearStoredDiceStory() {
  window.sessionStorage.removeItem(diceStoryStorageKey);
}
