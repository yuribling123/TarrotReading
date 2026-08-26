import { NextResponse } from "next/server";
import { redis } from "@/lib/redis/redis";

const KEY = "tarot_astrology_interest";
//查人数
export async function GET() {
  const count = (await redis.get<number>(KEY)) ?? 0;

  return NextResponse.json({ count });
}
//更新人数
export async function POST() {
  const count = await redis.incr(KEY);

  return NextResponse.json({ count });
}