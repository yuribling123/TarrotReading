import {
  GiAquarius,
  GiAries,
  GiCancer,
  GiCapricorn,
  GiGemini,
  GiLeo,
  GiLibra,
  GiPisces,
  GiSagittarius,
  GiScorpio,
  GiTaurus,
  GiVirgo,
} from "react-icons/gi";

export const zodiacSigns = [
  { name: "白羊座", symbol: "♈", Icon: GiAries },
  { name: "金牛座", symbol: "♉", Icon: GiTaurus },
  { name: "双子座", symbol: "♊", Icon: GiGemini },
  { name: "巨蟹座", symbol: "♋", Icon: GiCancer },
  { name: "狮子座", symbol: "♌", Icon: GiLeo },
  { name: "处女座", symbol: "♍", Icon: GiVirgo },
  { name: "天秤座", symbol: "♎", Icon: GiLibra },
  { name: "天蝎座", symbol: "♏", Icon: GiScorpio },
  { name: "射手座", symbol: "♐", Icon: GiSagittarius },
  { name: "摩羯座", symbol: "♑", Icon: GiCapricorn },
  { name: "水瓶座", symbol: "♒", Icon: GiAquarius },
  { name: "双鱼座", symbol: "♓", Icon: GiPisces },
] as const;

export type ZodiacSign = (typeof zodiacSigns)[number];
