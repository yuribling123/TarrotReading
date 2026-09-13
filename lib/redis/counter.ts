import { NextResponse } from "next/server";

import { redis } from "./redis";

export function createCounterHandlers(key: string) {
  return {
    async GET() {
      const count = (await redis.get<number>(key)) ?? 0;
      return NextResponse.json({ count });
    },
    async POST() {
      const count = await redis.incr(key);
      return NextResponse.json({ count });
    },
  };
}
