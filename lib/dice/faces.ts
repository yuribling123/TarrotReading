import type { DiceFaceId } from "@/lib/types";

export const diceFaceIds = [
  "moonKingdom",
  "fatedRomance",
  "absurdMonday",
  "neonGlitch",
  "everyoneHasSecrets",
  "improvisedStory",
] as const satisfies ReadonlyArray<DiceFaceId>;

export const diceFaceNames: Record<DiceFaceId, string> = {
  moonKingdom: "月亮王国",
  fatedRomance: "玫瑰宇宙",
  absurdMonday: "星期八",
  neonGlitch: "霓虹故障",
  everyoneHasSecrets: "无人知晓处",
  improvisedStory: "后来星球",
};
