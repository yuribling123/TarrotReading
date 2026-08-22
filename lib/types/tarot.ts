export type TarotCard = {
  name: string;
  arcana: "Major" | "Minor";
  suit?: "Wands" | "Cups" | "Swords" | "Pentacles";
  imageSrc?: string;
};

export type DrawnCard = TarotCard & {
  id: string;
  position: "Situation" | "Hidden Influence" | "Guidance";
  orientation: "Upright" | "Reversed";
};
