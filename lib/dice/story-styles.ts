import type { DiceFaceId } from "@/lib/types";

export const storyStyleRules: Record<DiceFaceId, string> = {
  moonKingdom: "Moon Kingdom: lyrical fairytale. The moon and a kingdom follow one magical rule directly tied to the user's situation. The protagonist must make an active choice that changes that rule.",
  fatedRomance: "Fated Romance: heightened romantic drama with coincidence and strong feeling. The protagonist keeps agency; romance never replaces their decision. Do not assume every story input is romantic.",
  absurdMonday: "Absurd Monday: grounded urban comedy. Escalate a misunderstanding three times, then pay it off with a funny but emotionally coherent reversal. Never mock the user's pain.",
  neonGlitch: "Neon Glitch: near-future science fiction. Establish one clear technology rule and its cost. That rule causes the conflict and helps answer the user's question.",
  everyoneHasSecrets: "Everyone Has Secrets: ensemble mystery. Important characters each conceal a different motive; clues point toward an apparent villain, then a fair reversal reveals the full truth. The protagonist acts to break the imposed script.",
  improvisedStory: "Improvised Story: invent an original, specific genre and one unusual world rule suited to the user's input. Avoid copying any of the five fixed genres. Follow that rule consistently through the ending.",
};
