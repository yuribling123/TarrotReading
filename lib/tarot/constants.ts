import type { TarotCard } from "@/lib/types";

export const SPREAD_POSITIONS = ["Situation", "Hidden Influence", "Guidance"] as const;

export const MAJOR_ARCANA_NAMES = [
  "The Fool",
  "The Magician",
  "The High Priestess",
  "The Empress",
  "The Emperor",
  "The Hierophant",
  "The Lovers",
  "The Chariot",
  "Strength",
  "The Hermit",
  "Wheel of Fortune",
  "Justice",
  "The Hanged Man",
  "Death",
  "Temperance",
  "The Devil",
  "The Tower",
  "The Star",
  "The Moon",
  "The Sun",
  "Judgement",
  "The World",
] as const;

export const MINOR_RANKS = [
  "Ace",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
  "Ten",
  "Page",
  "Knight",
  "Queen",
  "King",
] as const;

export const MINOR_SUITS: Array<NonNullable<TarotCard["suit"]>> = [
  "Wands",
  "Cups",
  "Swords",
  "Pentacles",
];

export const MAJOR_IMAGE_NAMES: Record<string, string> = {
  "The Fool": "00_Fool",
  "The Magician": "01_Magician",
  "The High Priestess": "02_High_Priestess",
  "The Empress": "03_Empress",
  "The Emperor": "04_Emperor",
  "The Hierophant": "05_Hierophant",
  "The Lovers": "06_Lovers",
  "The Chariot": "07_Chariot",
  Strength: "08_Strength",
  "The Hermit": "09_Hermit",
  "Wheel of Fortune": "10_Wheel_of_Fortune",
  Justice: "11_Justice",
  "The Hanged Man": "12_Hanged_Man",
  Death: "13_Death",
  Temperance: "14_Temperance",
  "The Devil": "15_Devil",
  "The Tower": "16_Tower",
  "The Star": "17_Star",
  "The Moon": "18_Moon",
  "The Sun": "19_Sun",
  Judgement: "20_Judgement",
  "The World": "21_World",
};

export const RANK_IMAGE_NUMBERS: Record<string, string> = {
  Ace: "01",
  Two: "02",
  Three: "03",
  Four: "04",
  Five: "05",
  Six: "06",
  Seven: "07",
  Eight: "08",
  Nine: "09",
  Ten: "10",
  Page: "11",
  Knight: "12",
  Queen: "13",
  King: "14",
};

export const SUIT_IMAGE_NAMES: Record<NonNullable<TarotCard["suit"]>, string> = {
  Wands: "Wands",
  Cups: "Cups",
  Swords: "Swords",
  Pentacles: "Pents",
};

export const CHINESE_MAJOR_NAMES: Record<string, string> = {
  "The Fool": "愚人",
  "The Magician": "魔术师",
  "The High Priestess": "女祭司",
  "The Empress": "皇后",
  "The Emperor": "皇帝",
  "The Hierophant": "教皇",
  "The Lovers": "恋人",
  "The Chariot": "战车",
  Strength: "力量",
  "The Hermit": "隐士",
  "Wheel of Fortune": "命运之轮",
  Justice: "正义",
  "The Hanged Man": "倒吊人",
  Death: "死神",
  Temperance: "节制",
  "The Devil": "恶魔",
  "The Tower": "高塔",
  "The Star": "星星",
  "The Moon": "月亮",
  "The Sun": "太阳",
  Judgement: "审判",
  "The World": "世界",
};

export const CHINESE_MINOR_RANKS: Record<string, string> = {
  Ace: "王牌",
  Two: "二",
  Three: "三",
  Four: "四",
  Five: "五",
  Six: "六",
  Seven: "七",
  Eight: "八",
  Nine: "九",
  Ten: "十",
  Page: "侍者",
  Knight: "骑士",
  Queen: "皇后",
  King: "国王",
};

export const CHINESE_MINOR_SUITS: Record<string, string> = {
  Wands: "权杖",
  Cups: "圣杯",
  Swords: "宝剑",
  Pentacles: "星币",
};
