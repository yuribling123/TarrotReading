"use client";

import { useEffect, useRef, useState } from "react";

import { diceStoryStorageKey } from "@/lib/dice/story-storage";
import { isGeneratedStory, isStoryRequest } from "@/lib/dice/story-validation";
import { getVisitorId } from "@/lib/visitor/visitor-id";
import type { DiceFaceId, GeneratedStory, Language, StoryRequest } from "@/lib/types";

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

type StoredStory = { input: StoryRequest; result?: GeneratedStory; starLeft?: boolean };

export function useDiceStory(story: string, language: Language, isHydrated: boolean) {
  const [state, setState] = useState<StoryState>(initialState);
  const [isLoaded, setIsLoaded] = useState(false);
  const activeRequest = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      const raw = window.sessionStorage.getItem(diceStoryStorageKey);
      if (raw) {
        const stored: StoredStory = JSON.parse(raw);
        if (isStoryRequest(stored.input) && stored.input.story === story) {
          const result = isGeneratedStory(stored.result) ? stored.result : null;
          setState({
            face: stored.input.style,
            result,
            phase: result ? "ready" : "error",
            settled: true,
            revealed: false,
            starLeft: Boolean(result && stored.starLeft),
          });
        }
      }
    } catch {
      window.sessionStorage.removeItem(diceStoryStorageKey);
    }
    setIsLoaded(true);
  }, [isHydrated, story]);

  useEffect(() => () => activeRequest.current?.abort(), []);

  async function finishStory(input: StoryRequest, result: GeneratedStory, visitorId: string) {
    const response = await fetch(`/api/dice-limit/${visitorId}`, { method: "POST" });
    if (response.status === 409) {
      setState((current) => ({ ...current, result: null, phase: "limit" }));
      return;
    }
    if (!response.ok) throw new Error(`Failed to record dice story: ${response.status}`);

    try {
      window.sessionStorage.setItem(diceStoryStorageKey, JSON.stringify({ input, result } satisfies StoredStory));
    } catch (error) {
      console.error("Failed to save dice story:", error);
    }
    setState((current) => ({ ...current, result, phase: "ready" }));
  }

  async function generate(face: DiceFaceId) {
    activeRequest.current?.abort();
    const controller = new AbortController();
    activeRequest.current = controller;
    const input: StoryRequest = { story, style: face, language };
    window.sessionStorage.setItem(diceStoryStorageKey, JSON.stringify({ input } satisfies StoredStory));
    setState((current) => ({ ...current, face, result: null, phase: "generating", revealed: false, starLeft: false }));

    let generated: GeneratedStory | null = null;
    try {
      const visitorId = getVisitorId();
      const response = await fetch("/api/dice/story", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Visitor-Id": visitorId },
        body: JSON.stringify(input),
        signal: controller.signal,
      });
      if (response.status === 429) {
        setState((current) => ({ ...current, phase: "limit" }));
        return;
      }
      if (!response.ok) throw new Error(`Story request failed: ${response.status}`);
      const result: unknown = await response.json();
      if (!isGeneratedStory(result)) throw new Error("Invalid story response");
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
      const input: StoryRequest = { story, style: state.face, language };
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
      const input: StoryRequest = { story, style: state.face, language };
      setState((current) => ({ ...current, starLeft: true }));
      try {
        window.sessionStorage.setItem(diceStoryStorageKey, JSON.stringify({ input, result: state.result, starLeft: true } satisfies StoredStory));
      } catch (error) {
        console.error("Failed to save star state:", error);
      }
    },
  };
}
