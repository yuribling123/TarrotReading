"use client";

import { CodeDialog } from "./dialog/code-dialog";
import { ZodiacSelector } from "./dialog/zodiac-selector";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

interface Props {
  onConfirm: (zodiac: string) => void;
  zodiacOpen: boolean;
  setZodiacOpen: (open: boolean) => void;
}

export function ZodiacReadingOption({
  onConfirm,
  zodiacOpen,
  setZodiacOpen,
}: Props) {
  const day = new Date().getDay();

  const zodiacAvailable =
    day === 0 ||
    day === 5 ||
    day === 6;

  return (
    <>
      <button
        onClick={() => setZodiacOpen(true)}
        type="button"
        className={`
          mx-auto
          flex
          items-center
          justify-center
          gap-2
          rounded-full
          bg-transparent

          text-[11px]
          font-medium
          tracking-[0.08em]
          text-[#b89552]

          transition-all
          duration-300

          hover:text-[#d7b56d]

          active:scale-[0.96]
          active:shadow-[0_0_18px_rgba(215,181,109,0.35)]

          ${zodiacAvailable ? "animate-bounce" : ""}
        `}
      >
        {zodiacAvailable && (
          <span className="text-[10px] text-[#b89552]/80">
            星象已开放
          </span>
        )}

        <span className="relative h-4 w-4">
          <span className="absolute inset-[1px] rounded-full border border-[#b89552]/65" />

          <span className="absolute -right-[3px] top-[2px] size-[3px] rounded-full bg-[#b89552]/85" />
        </span>
      </button>

      {zodiacAvailable ? (
        <Dialog
          open={zodiacOpen}
          onOpenChange={setZodiacOpen}
        >
          <DialogContent
            className="
              w-[320px]
              rounded-[28px]
              border
              border-[#b89552]/25
              bg-[#fffdf8]
              p-7
            "
          >
            <ZodiacSelector
              onConfirm={(selectedZodiac) => {
                onConfirm(selectedZodiac);
                setZodiacOpen(false);
              }}
            />
          </DialogContent>
        </Dialog>
      ) : (
        <CodeDialog
          open={zodiacOpen}
          onOpenChange={setZodiacOpen}
          onConfirm={(selectedZodiac) => {
            onConfirm(selectedZodiac);
            setZodiacOpen(false);
          }}
        />
      )}
    </>
  );
}