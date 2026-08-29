import { NextResponse } from "next/server";
import { redis } from "@/lib/redis/redis";

const LIMIT = 3;


// 一个用户一个 Redis Hash
function getKey(visitorId: string) {
  return `reading_limit:${visitorId}`;
}


// 获取今天日期
function getToday() {
  return new Date().toISOString().slice(0, 10);
}


// GET：查今天已经占卜几次
export async function GET(
  request: Request,
  { params }: { params: Promise<{ visitorId: string }> }
) {
  const { visitorId } = await params;

  const key = getKey(visitorId);
  const today = getToday();

  const count =
    (await redis.hget<number>(key, today)) ?? 0;

  return NextResponse.json({
    count,
    allowed: count < LIMIT,
  });
}


// POST：成功完成一次占卜，今天次数 +1
export async function POST(
  request: Request,
  { params }: { params: Promise<{ visitorId: string }> }
) {
  const { visitorId } = await params;

  const key = getKey(visitorId);
  const today = getToday();

  const count = await redis.hincrby(
    key,
    today,
    1
  );

  return NextResponse.json({
    count,
    allowed: count < LIMIT,
  });
}


// DELETE：留下共鸣后，今天次数清 0
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ visitorId: string }> }
) {
  const { visitorId } = await params;

  const key = getKey(visitorId);
  const today = getToday();

  await redis.hset(key, {
    [today]: 0,
  });

  return NextResponse.json({
    count: 0,
    allowed: true,
  });
}