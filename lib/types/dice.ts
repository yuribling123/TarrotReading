import type { Language } from "./i18n";

export type DiceFaceId =
  | "moonKingdom"
  | "fatedRomance"
  | "absurdMonday"
  | "neonGlitch"
  | "everyoneHasSecrets"
  | "improvisedStory";

export type StoryRequest = {
  story: string;
  style: DiceFaceId;
  language: Language;
};

export type GeneratedStory = {
  title: string;
  story: {
    scenes: string[];
  };
};
