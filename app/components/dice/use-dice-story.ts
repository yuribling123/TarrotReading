"use client";

import { useEffect, useRef, useState } from "react";

import { isGeneratedStory, isStoryRequest } from "@/lib/dice/story-validation";
import type { DiceFaceId, GeneratedStory, Language, StoryRequest } from "@/lib/types";

const storageKey = "moonlit-otherworld-story";

type StoryState = {
  face: DiceFaceId | null;
  result: GeneratedStory | null;
  phase: "idle" | "generating" | "ready" | "error";
  settled: boolean;
  revealed: boolean;
};

const initialState: StoryState = {
  face: null,
  result: null,
  phase: "idle",
  settled: false,
  revealed: false,
};

type StoredStory = { input: StoryRequest; result?: GeneratedStory };

export function useDiceStory(story: string, language: Language, isHydrated: boolean) {
  const [state, setState] = useState<StoryState>(initialState);
  const [isLoaded, setIsLoaded] = useState(false);
  const activeRequest = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      const raw = window.sessionStorage.getItem(storageKey);
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
          });
        }
      }
    } catch {
      window.sessionStorage.removeItem(storageKey);
    }
    setIsLoaded(true);
  }, [isHydrated, story]);

  useEffect(() => () => activeRequest.current?.abort(), []);

  async function generate(face: DiceFaceId) {
    activeRequest.current?.abort();
    const controller = new AbortController();
    activeRequest.current = controller;
    const input: StoryRequest = { story, style: face, language };
    window.sessionStorage.setItem(storageKey, JSON.stringify({ input } satisfies StoredStory));
    setState((current) => ({ ...current, face, result: null, phase: "generating", revealed: false }));

    try {
      const response = await fetch("/api/dice/story", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
        signal: controller.signal,
      });
      if (!response.ok) throw new Error(`Story request failed: ${response.status}`);
      const result: unknown = await response.json();
      if (!isGeneratedStory(result)) throw new Error("Invalid story response");
      window.sessionStorage.setItem(storageKey, JSON.stringify({ input, result } satisfies StoredStory));
      setState((current) => ({ ...current, result, phase: "ready" }));
    } catch (error) {
      if (controller.signal.aborted) return;
      console.error("Story request failed", error);
      setState((current) => ({ ...current, phase: "error" }));
    } finally {
      if (activeRequest.current === controller) activeRequest.current = null;
    }
  }

  return {
    state,
    isLoaded,
    generate,
    retry: () => { if (state.face) void generate(state.face); },
    settle: () => setState((current) => ({ ...current, settled: true })),
    reveal: () => setState((current) => ({ ...current, revealed: true })),
  };
}
