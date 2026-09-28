import { diceFaces } from "@/lib/dice/faces";
import type { GeneratedStory, StoryRequest } from "@/lib/types";

export function isStoryRequest(value: unknown): value is StoryRequest {
  if (!value || typeof value !== "object") return false;
  const input = value as Record<string, unknown>;
  return typeof input.story === "string"
    && input.story.trim().length > 0
    && input.story.length <= 250
    && diceFaces.some((face) => face.id === input.style)
    && (input.language === "zh" || input.language === "en");
}

export function isGeneratedStory(value: unknown): value is GeneratedStory {
  if (!value || typeof value !== "object") return false;
  const output = value as Record<string, unknown>;
  if (typeof output.title !== "string" || !output.title.trim()) return false;
  if (!output.story || typeof output.story !== "object") return false;
  const story = output.story as Record<string, unknown>;
  return Array.isArray(story.scenes)
    && story.scenes.length >= 3
    && story.scenes.length <= 5
    && story.scenes.every((scene) => typeof scene === "string" && scene.trim())
    && typeof story.closing === "string"
    && Boolean(story.closing.trim());
}
