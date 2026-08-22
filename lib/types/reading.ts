import type { GeneratedTarotReading } from "./ai";
import type { Language } from "./i18n";
import type { DrawnCard } from "./tarot";

export type ReadingResponse = GeneratedTarotReading;

export type ReadingSessionData = {
  language: Language;
  question: string;
  selectedIndexes: number[];
  cards: DrawnCard[];
  reading: ReadingResponse | null;
};

export type ReadingRequest = {
  question: string;
  cards: DrawnCard[];
  language: Language;
};
