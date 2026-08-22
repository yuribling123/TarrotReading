import { SPREAD_POSITIONS } from "@/lib/tarot/constants";
import type { DrawnCard } from "@/lib/types";

export function isDrawnCard(card: unknown): card is DrawnCard {
  if (!card || typeof card !== "object") {
    return false;
  }

  const candidate = card as Partial<DrawnCard>;

  return (
    typeof candidate.name === "string" &&
    typeof candidate.position === "string" &&
    typeof candidate.orientation === "string" &&
    SPREAD_POSITIONS.includes(candidate.position as DrawnCard["position"]) &&
    ["Upright", "Reversed"].includes(candidate.orientation)
  );
}
