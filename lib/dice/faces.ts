import type { DiceFaceId } from "@/lib/types";

export const diceFaces = [
  { id: "moonKingdom", transform: "translateZ(calc(var(--die-size) / 2))", x: 0, y: 0 },
  { id: "fatedRomance", transform: "rotateY(90deg) translateZ(calc(var(--die-size) / 2))", x: 0, y: -90 },
  { id: "absurdMonday", transform: "rotateY(180deg) translateZ(calc(var(--die-size) / 2))", x: 0, y: -180 },
  { id: "neonGlitch", transform: "rotateY(-90deg) translateZ(calc(var(--die-size) / 2))", x: 0, y: 90 },
  { id: "everyoneHasSecrets", transform: "rotateX(90deg) translateZ(calc(var(--die-size) / 2))", x: -90, y: 0 },
  { id: "improvisedStory", transform: "rotateX(-90deg) translateZ(calc(var(--die-size) / 2))", x: 90, y: 0 },
] as const satisfies ReadonlyArray<{ id: DiceFaceId; transform: string; x: number; y: number }>;

export type { DiceFaceId } from "@/lib/types";
