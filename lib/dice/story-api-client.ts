import { isGeneratedStory } from "@/lib/dice/story-validation";
import type { GeneratedStory, StoryRequest } from "@/lib/types";

export async function requestDiceStory(input: StoryRequest, visitorId: string, signal: AbortSignal): Promise<GeneratedStory | null> {
  const response = await fetch("/api/dice/story", {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Visitor-Id": visitorId },
    body: JSON.stringify(input),
    signal,
  });
  if (response.status === 429) return null;
  if (!response.ok) throw new Error(`Story request failed: ${response.status}`);

  const result: unknown = await response.json();
  if (!isGeneratedStory(result)) throw new Error("Invalid story response");
  return result;
}

export async function recordDiceStoryCount(visitorId: string): Promise<boolean> {
  const response = await fetch(`/api/dice-limit/${visitorId}`, { method: "POST" });
  if (response.status === 409) return false;
  if (!response.ok) throw new Error(`Failed to record dice story: ${response.status}`);
  return true;
}
