"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

import {
  GiAries,
  GiTaurus,
  GiGemini,
  GiCancer,
  GiLeo,
  GiVirgo,
  GiLibra,
  GiScorpio,
  GiSagittarius,
  GiCapricorn,
  GiAquarius,
  GiPisces,
} from "react-icons/gi";

const zodiacSigns = [
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
];

type ZodiacSelectorProps = {
  onConfirm: (zodiac: string) => void;
};

export function ZodiacSelector({
  onConfirm,
}: ZodiacSelectorProps) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-2 duration-1400">
      <div className="mb-6 text-center">
    

  

        <h2 className="text-[16px] font-medium text-[#7f5b1f] ">
              你的星座
        </h2>

      
      </div>

      <div className="grid grid-cols-4 gap-2.5 pt-2">
        {zodiacSigns.map((sign) => {
          const value = `${sign.name}  ${sign.symbol}`;
          const isSelected = selected === value;
          const Icon = sign.Icon;

          return (
            <button
              key={sign.name}
              type="button"
              onClick={() => setSelected(value)}
              className={`
                relative flex h-14 w-14 flex-col items-center justify-center
                rounded-[21px] border
                transition-[transform,border-color,background-color,box-shadow,opacity]
                duration-300
                ${
                  isSelected
                    ? `
                      -translate-y-1
                      border-[#b88a35]/70
                      bg-[radial-gradient(circle_at_50%_35%,rgba(240,211,135,0.38),rgba(255,255,255,0.28)_72%)]
                      text-[#8b641f]
                      shadow-[0_0_0_3px_rgba(215,181,109,0.11),0_8px_20px_rgba(127,91,31,0.16)]
                    `
                    : `
                      border-[#141005]/30
                      bg-white/20
                      text-[#141005]/30
                      ${selected ? "opacity-65" : "opacity-100"}
                      hover:border-[#b89552]/25
                      hover:bg-white/60
                      hover:opacity-100
                    `
                }
              `}
            >
              <span
                aria-hidden="true"
                className={`absolute -right-1 -top-1 text-[9px] text-[#c4963d] transition-[opacity,transform] duration-300 ${
                  isSelected
                    ? " opacity-100 [text-shadow:0_0_8px_rgba(196,150,61,0.55)]"
                    : " opacity-0"
                }`}
              >
                ✦
              </span>
              <Icon
                className={`
                  text-[11px]
                  transition-[color,transform,filter] duration-300
                  ${
                    isSelected
                      ? " text-[#b48531] drop-shadow-[0_0_5px_rgba(196,150,61,0.38)]"
                      : ""
                  }
                `}
              />

              <span
                className={`mt-1.5 text-[10px] transition-[color,font-weight] duration-300 ${
                  isSelected ? "font-medium text-[#765218]" : "font-normal"
                }`}
              >
                {sign.name}
              </span>
            </button>
          );
        })}
      </div>

      <Button
        type="button"
        variant="secondary"
        disabled={!selected}
        onClick={() => selected && onConfirm(selected)}
        className="
          mt-6 h-12 w-20 rounded-full
          disabled:opacity-40
          active:scale-95
          hover:scale-95
        "
      >
                选好了
      </Button>

 
    </div>
  );
}
