import type { DiceFaceId } from "@/lib/types";

export const diceFaces = [
  { id: "moonKingdom", transform: "translateZ(calc(var(--die-size) / 2))", x: 0, y: 0 },
  { id: "fatedRomance", transform: "rotateY(90deg) translateZ(calc(var(--die-size) / 2))", x: 0, y: -90 },
  { id: "absurdMonday", transform: "rotateY(180deg) translateZ(calc(var(--die-size) / 2))", x: 0, y: -180 },
  { id: "neonGlitch", transform: "rotateY(-90deg) translateZ(calc(var(--die-size) / 2))", x: 0, y: 90 },
  { id: "everyoneHasSecrets", transform: "rotateX(90deg) translateZ(calc(var(--die-size) / 2))", x: -90, y: 0 },
  { id: "improvisedStory", transform: "rotateX(-90deg) translateZ(calc(var(--die-size) / 2))", x: 90, y: 0 },
] as const satisfies ReadonlyArray<{ id: DiceFaceId; transform: string; x: number; y: number }>;

export const diceFaceNames: Record<DiceFaceId, string> = {
  moonKingdom: "月亮王国",
  fatedRomance: "玫瑰宇宙",
  absurdMonday: "星期八",
  neonGlitch: "霓虹故障",
  everyoneHasSecrets: "无人知晓处",
  improvisedStory: "后来星球",
};

export type { DiceFaceId } from "@/lib/types";
