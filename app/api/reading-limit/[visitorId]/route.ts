import { NextResponse } from "next/server";
import { redis } from "@/lib/redis/redis";

const KEY = "reading_limit";
const LIMIT = 1; //1
const DAILY_LIMIT = 5; //3

//返回日期："2026-09-02"
function getToday() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Shanghai",
  }).format(new Date());
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

  //一天只能玩x次
  const dailyLimitReached = readingCount >= DAILY_LIMIT;
  const resonanceRequired =
    readingCount >= (resonanceCount + 1) * LIMIT;

  let reason: "daily_limit" | "resonance_required" | null = null;

  if (dailyLimitReached) {
    reason = "daily_limit";
  } else if (resonanceRequired) {
    reason = "resonance_required";
  }

  return NextResponse.json({
    count: readingCount,
    resonance: resonanceCount,
    allowed: reason === null,
    reason,
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

