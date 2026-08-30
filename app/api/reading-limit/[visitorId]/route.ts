import { NextResponse } from "next/server";
import { redis } from "@/lib/redis/redis";

const KEY = "reading_limit";
const LIMIT = 1;

function getToday() {
  return new Date().toISOString().slice(0, 10);
}

function getFields(visitorId: string) {
  const today = getToday();

  return {
    countField: `${visitorId}:${today}:count`,
    resonanceField: `${visitorId}:${today}:resonance`,
  };
}


// GET: 检查当前还能不能继续占卜
export async function GET(
  request: Request,
  { params }: { params: Promise<{ visitorId: string }> }
) {
  const { visitorId } = await params;
  const { countField, resonanceField } = getFields(visitorId);

  const [count, resonance] = await Promise.all([
    redis.hget<number>(KEY, countField),
    redis.hget<number>(KEY, resonanceField),
  ]);

  const readingCount = count ?? 0;
  const resonanceCount = resonance ?? 0;

  const allowed =
    readingCount < (resonanceCount + 1) * LIMIT;

  return NextResponse.json({
    count: readingCount,
    resonance: resonanceCount,
    allowed,
  });
}


// POST: 成功完成一次占卜
export async function POST(
  request: Request,
  { params }: { params: Promise<{ visitorId: string }> }
) {
  const { visitorId } = await params;
  const { countField } = getFields(visitorId);

  const count = await redis.hincrby(
    KEY,
    countField,
    1
  );

  return NextResponse.json({
    count,
  });
}

