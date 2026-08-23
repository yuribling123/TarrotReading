import OpenAI from "openai";
import { NextResponse } from "next/server";
import { tarotReadingPrompt } from "@/lib/ai/prompt";
import { tarotReadingSchema } from "@/lib/ai/schema";
import type { GeneratedTarotReading, ReadingRequest } from "@/lib/types";

// Calls the OpenAI API to generate a tarot reading based on the user's question and selected cards
export async function POST(request: Request) {
  const { question, cards, language } = (await request.json()) as ReadingRequest;

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
 

  try {
    const response = await openai.responses.create({
      model: process.env.OPENAI_MODEL ?? "gpt-5.6-luna",
      input: [
        { role: "system", content: tarotReadingPrompt },
        {
          role: "user",
          content: JSON.stringify({
            language,
            question,
            cards: cards.map((card, index) => ({
              order: index + 1,
              name: card.name,
              orientation: card.orientation,
            })),
          }),
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
     return NextResponse.json(
    {
      success: false,
      error: "Failed to generate tarot reading",
    },
    { status: 500 }
  );

  }
}
