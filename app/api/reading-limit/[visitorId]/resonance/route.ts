import { NextResponse } from "next/server";
import { redis } from "@/lib/redis/redis";

const KEY = "reading_limit";

//返回日期："2026-09-02"
function getToday() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Shanghai",
  }).format(new Date());
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