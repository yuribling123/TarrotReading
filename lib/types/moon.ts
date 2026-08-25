export type MoonPhase =
  | "newMoon"
  | "waxingCrescent"
  | "firstQuarter"
  | "waxingGibbous"
  | "fullMoon"
  | "waningGibbous"
  | "lastQuarter"
  | "waningCrescent";

export const moonMessages: Record<MoonPhase, string> = {
  newMoon: "新的念头，正在黑暗中悄悄萌芽",
  waxingCrescent: "有些事情，正在慢慢变得清晰",
  firstQuarter: "走到这里，也许该做一个决定了",
  waxingGibbous: "你正在靠近答案，再耐心一点",
  fullMoon: "月光正盛，藏着的情绪也更容易被看见",
  waningGibbous: "回头看看，也许答案已经出现过",
  lastQuarter: "有些事情，是时候慢慢放下了",
  waningCrescent: "不必急着寻找答案，先让自己安静下来",
};