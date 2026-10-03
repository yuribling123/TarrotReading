"use client";

import { useEffect, useRef, useState } from "react";

import { recordDiceStoryCount, requestDiceStory } from "@/lib/dice/story-api-client";
import { diceStoryStorageKey, readStoredDiceStory, saveStoredDiceStory } from "@/lib/dice/story-session-storage";
import { getVisitorId } from "@/lib/visitor/visitor-id";
import type { DiceFaceId, GeneratedStory, StoryRequest } from "@/lib/types";

type StoryState = {
  face: DiceFaceId | null;
  result: GeneratedStory | null;
  phase: "idle" | "generating" | "ready" | "error" | "countError" | "limit";
  settled: boolean;
  revealed: boolean;
  starLeft: boolean;
};

const initialState: StoryState = {
  face: null,
  result: null,
  phase: "idle",
  settled: false,
  revealed: false,
  starLeft: false,
};

export function useDiceStory(story: string, isHydrated: boolean) {
  const [state, setState] = useState<StoryState>(initialState);
  const [isLoaded, setIsLoaded] = useState(false);
  const activeRequest = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      const stored = readStoredDiceStory();
      if (stored && stored.input.story === story) {
        const result = stored.result ?? null;
        setState({
          face: stored.input.style,
          result,
          phase: result ? "ready" : "error",
          settled: true,
          revealed: false,
          starLeft: Boolean(result && stored.starLeft),
        });
      }
    } catch {
      window.sessionStorage.removeItem(diceStoryStorageKey);
    }
    setIsLoaded(true);
  }, [isHydrated, story]);

  useEffect(() => () => activeRequest.current?.abort(), []);

  async function finishStory(input: StoryRequest, result: GeneratedStory, visitorId: string) {
    if (!await recordDiceStoryCount(visitorId)) {
      setState((current) => ({ ...current, result: null, phase: "limit" }));
      return;
    }

    try {
      saveStoredDiceStory({ input, result });
    } catch (error) {
      console.error("Failed to save dice story:", error);
    }
    setState((current) => ({ ...current, result, phase: "ready" }));
  }

  async function generate(face: DiceFaceId) {
    activeRequest.current?.abort();
    const controller = new AbortController();
    activeRequest.current = controller;
    const input: StoryRequest = { story, style: face, language: "zh" };
    saveStoredDiceStory({ input });
    setState((current) => ({ ...current, face, result: null, phase: "generating", revealed: false, starLeft: false }));

    let generated: GeneratedStory | null = null;
    try {
      const visitorId = getVisitorId();
      const result = await requestDiceStory(input, visitorId, controller.signal);
      if (!result) {
        setState((current) => ({ ...current, phase: "limit" }));
        return;
      }
      generated = result;
      await finishStory(input, result, visitorId);
    } catch (error) {
      if (controller.signal.aborted) return;
      console.error("Story request failed", error);
      setState((current) => ({ ...current, result: generated, phase: generated ? "countError" : "error" }));
    } finally {
      if (activeRequest.current === controller) activeRequest.current = null;
    }
  }

  async function retry() {
    if (!state.face) return;
    if (state.phase !== "countError" || !state.result) {
      await generate(state.face);
      return;
    }

    setState((current) => ({ ...current, phase: "generating" }));
    try {
      const input: StoryRequest = { story, style: state.face, language: "zh" };
      await finishStory(input, state.result, getVisitorId());
    } catch (error) {
      console.error("Failed to record dice story:", error);
      setState((current) => ({ ...current, phase: "countError" }));
    }
  }

  return {
    state,
    isLoaded,
    generate,
    retry,
    settle: () => setState((current) => ({ ...current, settled: true })),
    reveal: () => setState((current) => ({ ...current, revealed: true })),
    markStarLeft: () => {
      if (!state.face || !state.result) return;
      const input: StoryRequest = { story, style: state.face, language: "zh" };
      setState((current) => ({ ...current, starLeft: true }));
      try {
        saveStoredDiceStory({ input, result: state.result, starLeft: true });
      } catch (error) {
        console.error("Failed to save star state:", error);
      }
    },
  };
}
