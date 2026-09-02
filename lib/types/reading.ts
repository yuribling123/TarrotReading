import type { GeneratedTarotReading } from "./ai";
import type { Language } from "./i18n";
import type { TarotCard } from "./tarot";

export type ReadingResponse = GeneratedTarotReading;

export type ReadingSessionData = {
  language: Language;
  question: string;
  selectedIndexes: number[];
  cards:  TarotCard [];
  reading: ReadingResponse | null;
  feedback: boolean;
};

export type ReadingRequest = {
  question: string;
  cards:  TarotCard[];
  language: Language;
   zodiac: string|null;
};
