import { getShanghaiDateKey } from "@/lib/date/shanghai";
import { redis } from "@/lib/redis/redis";

const DICE_LIMIT_KEY = "dice_limit";
export const DAILY_DICE_LIMIT = 2;

function countField(visitorId: string) {
  return `${visitorId}:${getShanghaiDateKey()}:count`;
}

export async function getDiceStoryCount(visitorId: string) {
  return (await redis.hget<number>(DICE_LIMIT_KEY, countField(visitorId))) ?? 0;
}

export async function recordDiceStory(visitorId: string) {
  const count = await getDiceStoryCount(visitorId);

  if (count >= DAILY_DICE_LIMIT) {
    return false;
  }

  await redis.hincrby(DICE_LIMIT_KEY, countField(visitorId), 1);
  return true;
}
