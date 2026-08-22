export type GeneratedCardReading = {
  position: string;
  title: string;
  orientation: string;
  message: string;
};

export type GeneratedTarotReading = {
  spreadName: string;
  cards: GeneratedCardReading[];
  answer: string;
  guidance: string;
};
