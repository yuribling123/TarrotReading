import type { DiceFaceId } from "@/lib/types";

type WorldColor = {
  main: string;
  light: string;
  label: string;
  glow: string;
};

export const worldColors: Record<DiceFaceId, WorldColor> = {
  moonKingdom: { main: "#8796C8", light: "#BEC9EA", label: "#E5E6F0", glow: "rgba(135, 150, 200, 0.26)" },
  fatedRomance: { main: "#B85F72", light: "#E8A9B6", label: "#EEE2E7", glow: "rgba(184, 95, 114, 0.25)" },
  absurdMonday: { main: "#C8A34A", light: "#F1D182", label: "#EEE8DA", glow: "rgba(200, 163, 74, 0.24)" },
  neonGlitch: { main: "#48BFC1", light: "#9BE6E4", label: "#E0EEEC", glow: "rgba(72, 191, 193, 0.24)" },
  everyoneHasSecrets: { main: "#6E587D", light: "#B9A1CC", label: "#E8E1EC", glow: "rgba(110, 88, 125, 0.30)" },
  improvisedStory: { main: "#C47F68", light: "#EAB6A0", label: "#EEE5E0", glow: "rgba(196, 127, 104, 0.25)" },
};
