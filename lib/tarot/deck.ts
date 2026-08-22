import { tarotDeck } from "./constants";
import { TarotCard } from "../types";


// returned shuffle deck [{name,orientation}]
export function shuffleDeck(): TarotCard[] {
  const shuffled = [...tarotDeck];

  // Shuffle the 78 cards.
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  // Give every card its orientation.
  return shuffled.map((name) => ({
    name,
    orientation:
      Math.random() < 0.3
        ? "Reversed"
        : "Upright",
  }));
}