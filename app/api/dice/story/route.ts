import OpenAI from "openai";
import { NextResponse } from "next/server";

import { storyPrompt } from "@/lib/dice/story-prompt";
import { storySchema } from "@/lib/dice/story-schema";
import { storyStyleRules } from "@/lib/dice/story-styles";
import { isGeneratedStory, isStoryRequest } from "@/lib/dice/story-validation";

export async function POST(request: Request) {
  let input: unknown;
  try {
    input = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  if (!isStoryRequest(input)) {
    return NextResponse.json({ error: "Invalid story input" }, { status: 400 });
  }
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ error: "Story generation unavailable" }, { status: 503 });
  }

  try {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const response = await openai.responses.create({
      model: process.env.OPENAI_MODEL ?? "gpt-5.6-luna",
      input: [
        { role: "system", content: storyPrompt },
        { role: "user", content: JSON.stringify({ ...input, styleRule: storyStyleRules[input.style] }) },
      ],
      text: {
        format: {
          type: "json_schema",
          name: "parallel_story",
          schema: storySchema,
          strict: true,
        },
      },
    });
    const story: unknown = JSON.parse(response.output_text);
    if (!isGeneratedStory(story)) throw new Error("Invalid generated story shape");
    return NextResponse.json(story);
  } catch (error) {
    console.error("Story generation failed", error);
    return NextResponse.json({ error: "Failed to generate story" }, { status: 500 });
  }
}
