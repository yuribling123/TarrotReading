import { moonlitPostcardMessages } from "@/lib/postcards/messages";

const SHANGHAI_TIME_ZONE = "Asia/Shanghai";

export function getPostcardDateKey(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: SHANGHAI_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const value = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? "";

  return `${value("year")}-${value("month")}-${value("day")}`;
}

export function getDailyPostcard(date = new Date()) {
  const dateKey = getPostcardDateKey(date);
  let hash = 0;

  for (const character of dateKey) {
    hash = (hash * 31 + character.charCodeAt(0)) >>> 0;
  }

  return moonlitPostcardMessages[hash % moonlitPostcardMessages.length];
}

export function formatPostcardDate(dateKey: string) {
  const [, month, day] = dateKey.split("-");
  return `${month}月${day}日`;
}
