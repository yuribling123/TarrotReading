const SHANGHAI_TIME_ZONE = "Asia/Shanghai";

export function getShanghaiDateKey(date = new Date()) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: SHANGHAI_TIME_ZONE,
  }).format(date);
}
