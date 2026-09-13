import OpenAI from "openai";
import { NextResponse } from "next/server";
import { tarotReadingPrompt } from "@/lib/ai/prompt";
import { tarotReadingSchema } from "@/lib/ai/schema";
import { toReadingInputCards } from "@/lib/ai/reading-input";
import { readingGenerationErrorResponse } from "@/lib/ai/responses";
import type { GeneratedTarotReading, ReadingRequest } from "@/lib/types";

// Calls the OpenAI API to generate a tarot reading based on the user's question and selected cards
export async function POST(request: Request) {
  const { question, cards, language, zodiac } = (await request.json()) as ReadingRequest;

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });


  try {
    const readingInput = {
      language,
      question,
      zodiac,
      cards: toReadingInputCards(cards),
    };

    console.log("Reading input:", readingInput);
    const response = await openai.responses.create({
      model: process.env.OPENAI_MODEL ?? "gpt-5.6-luna",
      input: [
        { role: "system", content: tarotReadingPrompt },
        {
          role: "user",
          content:JSON.stringify(readingInput),
        },
      ],
      text: {
        format: {
          type: "json_schema",
          name: "tarot_reading",
          schema: tarotReadingSchema,
          strict: true,
        },
      },
    });

    const generatedReading = JSON.parse(response.output_text) as GeneratedTarotReading;
    console.log(generatedReading);

    return NextResponse.json(generatedReading);
  } catch (error) {
    console.error("Reading generation failed", error);
    return readingGenerationErrorResponse();

  }
}
