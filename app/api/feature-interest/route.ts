import { createCounterHandlers } from "@/lib/redis/counter";

const KEY = "tarot_astrology_interest";
const handlers = createCounterHandlers(KEY);

export const GET = handlers.GET;
export const POST = handlers.POST;
