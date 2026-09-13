"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ZodiacOption } from "./zodiac-option";
import { zodiacSigns } from "./zodiac-signs";

type ZodiacSelectorProps = {
  onConfirm: (zodiac: string) => void;
};

export function ZodiacSelector({
  onConfirm,
}: ZodiacSelectorProps) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="w-full ">
      <div className="mb-6 text-center">
        <h2 className="text-[15px]  text-[#7f5b1f]">
          你的星座
        </h2>
      </div>

      <div className="mx-auto grid w-fit grid-cols-4 gap-5 pt-1">
        {zodiacSigns.map((sign) => {
          const value = `${sign.name}  ${sign.symbol}`;
          const isSelected = selected === value;
          return (
            <ZodiacOption
              key={sign.name}
              isSelected={isSelected}
              onSelect={() => setSelected(value)}
              sign={sign}
            />
          );
        })}
      </div>

      <Button
        type="button"
        variant="secondary"
        disabled={!selected}
        onClick={() => selected && onConfirm(selected)}
        className="
    mx-auto
    mt-6
    flex
    h-12
    w-20
    rounded-full
    disabled:opacity-40
        "
      >
        选好了
      </Button>
    </div>
  );
}
