import OpenAI from "openai";
import { NextResponse } from "next/server";
import { tarotReadingPrompt } from "@/lib/ai/prompt";
import { tarotReadingSchema } from "@/lib/ai/schema";
import type {
  GeneratedTarotReading,
  ReadingRequest,
} from "@/lib/types";

export async function POST(request: Request) {
  const { question, cards, language } =
    (await request.json()) as ReadingRequest;

  const deepseek = new OpenAI({
    apiKey: process.env.DEEPSEEK_API_KEY,
    baseURL: "https://api.deepseek.com",
  });

  try {
    const response = await deepseek.chat.completions.create({
      model: "deepseek-chat",

      messages: [
        {
          role: "system",
          content: `
${tarotReadingPrompt}

Return the response as JSON matching this schema:
${JSON.stringify(tarotReadingSchema)}
          `.trim(),
        },
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

      response_format: {
        type: "json_object",
      },
    });

    const content = response.choices[0].message.content;

    if (!content) {
      throw new Error("DeepSeek returned an empty response");
    }

    const generatedReading =
      JSON.parse(content) as GeneratedTarotReading;

    console.log(generatedReading);

    return NextResponse.json(generatedReading);
  } catch (error) {
     return NextResponse.json(
    {
      success: false,
      error: "Failed to generate tarot reading",
    },
    { status: 500 }
  );

  }
}