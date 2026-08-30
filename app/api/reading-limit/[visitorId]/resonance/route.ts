import { NextResponse } from "next/server";
import { redis } from "@/lib/redis/redis";

const KEY = "reading_limit";

function getToday() {
  return new Date().toISOString().slice(0, 10);
}

// POST: 留下一次共鸣
export async function POST(
  request: Request,
  { params }: { params: Promise<{ visitorId: string }> }
) {
  const { visitorId } = await params;
  const today = getToday();

  const resonanceField =
    `${visitorId}:${today}:resonance`;

  const resonance = await redis.hincrby(
    KEY,
    resonanceField,
    1
  );

  return NextResponse.json({
    resonance,
  });
}