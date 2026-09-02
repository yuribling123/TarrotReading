export type GeneratedCardReading = {
  position: string;
  title: string;
  orientation: string;
  message: string;
};

export type GeneratedTarotReading = {
  spreadName: string;
  cards: GeneratedCardReading[];
  verdict:string;
  answer: string;
  guidance: string;
  zodiac:string | null;
 
};
