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
  { name: "白羊座", Icon: GiAries },
  { name: "金牛座", Icon: GiTaurus },
  { name: "双子座", Icon: GiGemini },
  { name: "巨蟹座", Icon: GiCancer },
  { name: "狮子座", Icon: GiLeo },
  { name: "处女座", Icon: GiVirgo },
  { name: "天秤座", Icon: GiLibra },
  { name: "天蝎座", Icon: GiScorpio },
  { name: "射手座", Icon: GiSagittarius },
  { name: "摩羯座", Icon: GiCapricorn },
  { name: "水瓶座", Icon: GiAquarius },
  { name: "双鱼座", Icon: GiPisces },
];

type ZodiacSelectorProps = {
  onConfirm: (zodiac: string) => void;
};

export function ZodiacSelector({
  onConfirm,
}: ZodiacSelectorProps) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-2 duration-700">
      <div className="mb-6 text-center">
    

  

        <h2 className="mt-3 text-[16px] font-medium text-black/65">
              你的星座是？
        </h2>

      
      </div>

      <div className="grid grid-cols-4 gap-2.5 pt-2">
        {zodiacSigns.map((sign) => {
          const isSelected = selected === sign.name;
          const Icon = sign.Icon;

          return (
            <button
              key={sign.name}
              type="button"
              onClick={() => setSelected(sign.name)}
              className={`
                flex h-14 w-14 flex-col items-center justify-center
                rounded-[20px] border
                transition-all duration-300
                ${
                  isSelected
                    ? `
                        scale-105
                      border-[#9b722a]
                     
                      text-[#543f00]
                  
                    `
                    : `
                      border-[#9b722a]/60
                      bg-white/20
                      text-[#543f00]/70
                      hover:border-[#b89552]/25
                      hover:bg-white/60
                    `
                }
              `}
            >
              <Icon
                className={`
                  text-[11px]
                  transition-all duration-300
                  ${
                    isSelected
                      ? ""
                      : ""
                  }
                `}
              />

              <span className="mt-1.5 text-[10px] ">
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
        "
      >
                选好了
      </Button>

 
    </div>
  );
}