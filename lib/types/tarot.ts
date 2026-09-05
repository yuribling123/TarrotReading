export type TarotCard = {
  name: string;
  orientation: "Upright" | "Reversed";
};

export type CardBounds = {
  top: number;
  left: number;
  width: number;
  height: number;
};

export type CardFlight = {
  card: TarotCard;
  source: CardBounds;
  target: CardBounds;
};
