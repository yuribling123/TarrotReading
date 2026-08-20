import OpenAI from "openai";
import { NextResponse } from "next/server";
import { type DrawnCard, spreadPositions } from "@/lib/tarot";

type ReadingRequest = {
  question?: unknown;
  cards?: unknown;
};

const fallbackDisclaimer =
  "Tarot is a reflective storytelling tool, not a guarantee of what will happen. Let this reading support your own discernment.";

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

function createFallbackReading(question: string, cards: DrawnCard[]) {
  return {
    intro: `The cards gather around your question: "${question}". Their message is quiet, symbolic, and meant to be held with your own wisdom.`,
    cards: cards.map((card) => ({
      position: card.position,
      title: `${card.name} ${card.orientation}`,
      message: `${card.name} speaks of ${card.meaning}. In the place of ${card.position.toLowerCase()}, it invites you to notice what is already moving beneath the surface before choosing your next step.`,
    })),
    synthesis:
      "Together, the spread suggests a moment of listening before action. Name what feels true, release what feels performative, and choose the next step that restores your sense of inner alignment.",
    disclaimer: fallbackDisclaimer,
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

  if (!question) {
    return NextResponse.json({ error: "A question is required." }, { status: 400 });
  }

  if (cards.length !== 3 || !cards.every(isDrawnCard)) {
    return NextResponse.json({ error: "Exactly three valid tarot cards are required." }, { status: 400 });
  }

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(createFallbackReading(question, cards), { status: 200 });
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
            "You are a mystical but grounded tarot reader. You write in vivid, kind language without claiming certainty. Return only valid JSON.",
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
