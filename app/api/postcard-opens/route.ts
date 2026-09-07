import { NextResponse } from "next/server";
import { redis } from "@/lib/redis/redis";

const POSTCARD_OPEN_COUNT_KEY = "postcard_opens";

export async function GET() {
  const count = (await redis.get<number>(POSTCARD_OPEN_COUNT_KEY)) ?? 0;
  return NextResponse.json({ count });
}

export async function POST() {
  const count = await redis.incr(POSTCARD_OPEN_COUNT_KEY);
  return NextResponse.json({ count });
}
