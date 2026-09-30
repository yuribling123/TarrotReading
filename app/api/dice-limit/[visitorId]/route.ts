import { NextResponse } from "next/server";

import { DAILY_DICE_LIMIT, getDiceStoryCount, recordDiceStory } from "@/lib/dice/daily-limit";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ visitorId: string }> },
) {
  const { visitorId } = await params;
  const count = await getDiceStoryCount(visitorId);

  return NextResponse.json({
    count,
    allowed: count < DAILY_DICE_LIMIT,
  });
}

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ visitorId: string }> },
) {
  const { visitorId } = await params;
  const recorded = await recordDiceStory(visitorId);

  if (!recorded) {
    return NextResponse.json(
      { count: DAILY_DICE_LIMIT },
      { status: 409 },
    );
  }

  const count = await getDiceStoryCount(visitorId);

  return NextResponse.json({ count });
}
