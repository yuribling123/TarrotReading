import { createCounterHandlers } from "@/lib/redis/counter";

const POSTCARD_OPEN_COUNT_KEY = "postcard_opens";

const handlers = createCounterHandlers(POSTCARD_OPEN_COUNT_KEY);

export const GET = handlers.GET;
export const POST = handlers.POST;
