import OpenAI from "openai";
import { NextResponse } from "next/server";
import { type DrawnCard, spreadPositions } from "@/lib/tarot";

type ReadingRequest = {
  question?: unknown;
  cards?: unknown;
  language?: unknown;
};

const fallbackDisclaimer = {
  en: "Tarot is a reflective storytelling tool, not a guarantee of what will happen. Let this reading support your own discernment.",
  zh: "塔罗是一种帮助思考的叙事工具，并非对未来的保证；请以自己的判断为准。",
};

function isDrawnCard(card: unknown): card is DrawnCard {
  if (!card || typeof card !== "object") {
    return false;
  }

  const candidate = card as Partial<DrawnCard>;

  return (
    typeof candidate.name === "string" &&
    typeof candidate.position === "string" &&
    typeof candidate.orientation === "string" &&
    typeof candidate.meaning === "string" &&
    spreadPositions.includes(candidate.position as DrawnCard["position"]) &&
    ["Upright", "Reversed"].includes(candidate.orientation)
  );
}

function createFallbackReading(question: string, cards: DrawnCard[], language: "en" | "zh") {
  if (language === "zh") {
    return {
      intro: `牌面围绕着你的问题展开：“${question}”。它们的讯息安静而富有象征意味，值得以你自己的智慧细细体会。`,
      cards: cards.map((card) => ({
        position: card.position,
        title: `${card.name} · ${card.orientation === "Upright" ? "正位" : "逆位"}`,
        message: `${card.name} 指向${card.meaning}。在“${card.position}”的位置上，它邀请你在迈出下一步之前，留意内心已经悄然发生的变化。`,
      })),
      synthesis: "整组牌指向一个先聆听、再行动的时刻。说出真实的感受，放下为了迎合他人而做的选择，并朝着让自己重新对齐的方向迈出下一步。",
      disclaimer: fallbackDisclaimer.zh,
    };
  }

  return {
    intro: `The cards gather around your question: "${question}". Their message is quiet, symbolic, and meant to be held with your own wisdom.`,
    cards: cards.map((card) => ({
      position: card.position,
      title: `${card.name} ${card.orientation}`,
      message: `${card.name} speaks of ${card.meaning}. In the place of ${card.position.toLowerCase()}, it invites you to notice what is already moving beneath the surface before choosing your next step.`,
    })),
    synthesis:
      "Together, the spread suggests a moment of listening before action. Name what feels true, release what feels performative, and choose the next step that restores your sense of inner alignment.",
    disclaimer: fallbackDisclaimer.en,
  };
}

export async function POST(request: Request) {
  let body: ReadingRequest;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  const question = typeof body.question === "string" ? body.question.trim() : "";
  const cards = Array.isArray(body.cards) ? body.cards : [];
  const language = body.language === "zh" ? "zh" : "en";

  if (!question) {
    return NextResponse.json({ error: "A question is required." }, { status: 400 });
  }

  if (cards.length !== 3 || !cards.every(isDrawnCard)) {
    return NextResponse.json({ error: "Exactly three valid tarot cards are required." }, { status: 400 });
  }

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(createFallbackReading(question, cards, language), { status: 200 });
  }

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  try {
    const response = await openai.responses.create({
      model: process.env.OPENAI_MODEL ?? "gpt-4.1-mini",
      input: [
        {
          role: "system",
          content:
            `You are a mystical but grounded tarot reader. You write in vivid, kind language without claiming certainty. Return only valid JSON. Write every user-facing string in ${language === "zh" ? "Simplified Chinese" : "English"}.`,
        },
        {
          role: "user",
          content: JSON.stringify({
            question,
            spread: cards.map((card) => ({
              position: card.position,
              name: card.name,
              orientation: card.orientation,
              meaning: card.meaning,
            })),
            format: {
              intro: "One short atmospheric sentence.",
              cards:
                "Array of three objects with position, title, and message. Each message should be 2-4 sentences.",
              synthesis: "One grounded guidance paragraph.",
              disclaimer: "One gentle sentence that tarot is reflective, not certainty.",
            },
          }),
        },
      ],
      text: {
        format: {
          type: "json_schema",
          name: "tarot_reading",
          schema: {
            type: "object",
            additionalProperties: false,
            required: ["intro", "cards", "synthesis", "disclaimer"],
            properties: {
              intro: { type: "string" },
              cards: {
                type: "array",
                minItems: 3,
                maxItems: 3,
                items: {
                  type: "object",
                  additionalProperties: false,
                  required: ["position", "title", "message"],
                  properties: {
                    position: { type: "string" },
                    title: { type: "string" },
                    message: { type: "string" },
                  },
                },
              },
              synthesis: { type: "string" },
              disclaimer: { type: "string" },
            },
          },
          strict: true,
        },
      },
    });

    const text = response.output_text;
    const reading = JSON.parse(text);

    return NextResponse.json(reading);
  } catch (error) {
    console.error("Reading generation failed", error);
    return NextResponse.json(
      { error: "The reading could not pass through the veil. Please try again." },
      { status: 500 },
    );
  }
}
