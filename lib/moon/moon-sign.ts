import { EclipticGeoMoon } from "astronomy-engine";

const zodiacSigns = [
  "白羊座",
  "金牛座",
  "双子座",
  "巨蟹座",
  "狮子座",
  "处女座",
  "天秤座",
  "天蝎座",
  "射手座",
  "摩羯座",
  "水瓶座",
  "双鱼座",
];

export function getMoonSign(date = new Date()) {
  const moon = EclipticGeoMoon(date);
  const index = Math.floor(moon.lon / 30) % 12;
  return zodiacSigns[index];
}