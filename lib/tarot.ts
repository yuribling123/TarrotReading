export type TarotCard = {
  name: string;
  arcana: "Major" | "Minor";
  suit?: "Wands" | "Cups" | "Swords" | "Pentacles";
  upright: string;
  reversed: string;
  symbol: string;
};

export type DrawnCard = TarotCard & {
  id: string;
  position: "Situation" | "Hidden Influence" | "Guidance";
  orientation: "Upright" | "Reversed";
  meaning: string;
};

export const spreadPositions = ["Situation", "Hidden Influence", "Guidance"] as const;

export const tarotDeck: TarotCard[] = [
  {
    name: "The Fool",
    arcana: "Major",
    upright: "beginnings, trust, open roads",
    reversed: "hesitation, naivety, scattered energy",
    symbol: "0",
  },
  {
    name: "The Magician",
    arcana: "Major",
    upright: "will, craft, focused intention",
    reversed: "misdirection, unused skill, manipulation",
    symbol: "I",
  },
  {
    name: "The High Priestess",
    arcana: "Major",
    upright: "intuition, mystery, inner knowing",
    reversed: "secrets, disconnection, ignored instincts",
    symbol: "II",
  },
  {
    name: "The Empress",
    arcana: "Major",
    upright: "creation, care, abundance",
    reversed: "overgiving, creative block, dependency",
    symbol: "III",
  },
  {
    name: "The Emperor",
    arcana: "Major",
    upright: "structure, protection, authority",
    reversed: "rigidity, control, unstable foundations",
    symbol: "IV",
  },
  {
    name: "The Lovers",
    arcana: "Major",
    upright: "choice, union, values",
    reversed: "misalignment, avoidance, divided desire",
    symbol: "VI",
  },
  {
    name: "The Chariot",
    arcana: "Major",
    upright: "momentum, discipline, victory",
    reversed: "forcefulness, delay, loss of direction",
    symbol: "VII",
  },
  {
    name: "Strength",
    arcana: "Major",
    upright: "courage, patience, gentle power",
    reversed: "self-doubt, pressure, reactive emotion",
    symbol: "VIII",
  },
  {
    name: "The Hermit",
    arcana: "Major",
    upright: "solitude, wisdom, inner lantern",
    reversed: "isolation, withdrawal, avoiding counsel",
    symbol: "IX",
  },
  {
    name: "Wheel of Fortune",
    arcana: "Major",
    upright: "cycles, turning points, fate in motion",
    reversed: "resistance, repetition, unstable timing",
    symbol: "X",
  },
  {
    name: "Justice",
    arcana: "Major",
    upright: "truth, balance, consequence",
    reversed: "bias, avoidance, unclear accountability",
    symbol: "XI",
  },
  {
    name: "The Star",
    arcana: "Major",
    upright: "hope, renewal, quiet healing",
    reversed: "discouragement, depletion, dimmed faith",
    symbol: "XVII",
  },
  {
    name: "The Moon",
    arcana: "Major",
    upright: "dreams, uncertainty, subconscious tides",
    reversed: "confusion clearing, fear, distortion",
    symbol: "XVIII",
  },
  {
    name: "The Sun",
    arcana: "Major",
    upright: "clarity, vitality, joy",
    reversed: "muted confidence, delayed warmth, doubt",
    symbol: "XIX",
  },
  {
    name: "Ace of Cups",
    arcana: "Minor",
    suit: "Cups",
    upright: "new feeling, compassion, emotional opening",
    reversed: "blocked emotion, self-protection, withheld care",
    symbol: "C",
  },
  {
    name: "Three of Swords",
    arcana: "Minor",
    suit: "Swords",
    upright: "heartbreak, truth, necessary grief",
    reversed: "release, recovery, old wounds",
    symbol: "S",
  },
  {
    name: "Six of Pentacles",
    arcana: "Minor",
    suit: "Pentacles",
    upright: "generosity, exchange, support",
    reversed: "imbalance, strings attached, scarcity",
    symbol: "P",
  },
  {
    name: "Queen of Wands",
    arcana: "Minor",
    suit: "Wands",
    upright: "confidence, magnetism, creative fire",
    reversed: "insecurity, intensity, private doubt",
    symbol: "W",
  },
];

export function drawCards(): DrawnCard[] {
  const shuffled = [...tarotDeck].sort(() => Math.random() - 0.5);

  return spreadPositions.map((position, index) => {
    const card = shuffled[index];
    const orientation = Math.random() > 0.28 ? "Upright" : "Reversed";

    return {
      ...card,
      id: `${card.name}-${position}`,
      position,
      orientation,
      meaning: orientation === "Upright" ? card.upright : card.reversed,
    };
  });
}
