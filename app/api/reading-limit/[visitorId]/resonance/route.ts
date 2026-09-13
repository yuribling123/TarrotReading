import { NextResponse } from "next/server";
import { redis } from "@/lib/redis/redis";
import { getShanghaiDateKey } from "@/lib/date/shanghai";

const KEY = "reading_limit";

// POST: 留下一次共鸣
export async function POST(
  _request: Request,
  { params }: { params: Promise<{ visitorId: string }> }
) {
  const { visitorId } = await params;
  const today = getShanghaiDateKey();

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
