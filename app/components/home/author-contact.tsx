"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/toast";
import { messages } from "@/lib/i18n";
import { useTheme } from "@/app/components/shared/theme-provider";
import type { Language } from "@/lib/types";

const authorEmail = "yui480145@gmail.com";

export function AuthorContact({ language }: { language: Language }) {
  const { theme } = useTheme();
  const text = messages[theme === "dark" ? "zh" : language].authorContact;

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(authorEmail);
      toast.add({ id: "author-email-copied", title: text.copied, timeout: 2600 });
    } catch {
      toast.add({ id: "author-email-copy-failed", title: text.copyFailed, timeout: 4000 });
    }
  }

  return (
    <Dialog>
      <div className="fixed inset-x-0 bottom-[max(12px,env(safe-area-inset-bottom))] z-20 flex justify-center pointer-events-none">
        <DialogTrigger className="pointer-events-auto cursor-pointer rounded-full  bg-[#fffdf9]/90 px-4 py-2 text-[11px] tracking-[0.08em] text-[grey]/50 backdrop-blur-xl transition-colors hover:bg-[#fffdf9] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c9ad73] dark:bg-transparent dark:text-[#C9C1D0] dark:hover:bg-white/10 dark:hover:text-[#f7efe3]">
          {text.trigger}
        </DialogTrigger>
      </div>
      <DialogContent className="w-96 max-w-[85vw] rounded-[28px] border border-[#c9ad73]/25 bg-[#fffdf9]/70 px-6 pt-10 pb-6 text-center shadow-[0_18px_50px_rgba(45,38,55,0.16)] backdrop-blur-xl dark:border-[#f6efe4] dark:bg-[#17131f]/95 dark:text-[#f7efe3] dark:shadow-[0_18px_50px_rgba(0,0,0,0.5)]">
        <DialogHeader className="items-center text-center">
          <DialogTitle className="text-center text-[13px] leading-relaxed tracking-[0.02em] text-[#232125]/88 dark:text-[#f7efe3]">
            {text.title}
          </DialogTitle>
          <DialogDescription className="pt-2 text-center text-[11px] leading-[1.7] text-[#1b1a1c]/70 dark:text-[#cfc4d3]">
            {text.description}
          </DialogDescription>
        </DialogHeader>
        <p className="break-all text-sm text-[#1b1a1c]/90 dark:text-[#f7efe3]">
          {authorEmail}
        </p>
        <div className="mt-2 flex flex-wrap justify-center gap-3">
          <Button onClick={copyEmail} variant="secondary" className="h-11 rounded-full px-4 text-xs shadow-none dark:border dark:border-[#f6efe4] dark:bg-transparent dark:text-[#f6efe4] dark:hover:bg-[#f6efe4]/8">
            {text.copyEmail}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
