"use client";

import { useState } from "react";

import { toast } from "@/components/ui/toast";

type StoryResonanceProps = {
  hasLeftStar: boolean;
  onStarLeft: () => void;
};

export function StoryResonance({ hasLeftStar, onStarLeft }: StoryResonanceProps) {
  const [isPending, setIsPending] = useState(false);

  async function leaveStar() {
    if (isPending || hasLeftStar) return;
    setIsPending(true);

    try {
      const response = await fetch("/api/reading-feedback", { method: "POST" });
      if (!response.ok) throw new Error(`Failed to leave a star: ${response.status}`);

      onStarLeft();
    } catch (error) {
      console.error("Failed to leave a star:", error);
      toast.add({ title: "星星暂时没有留下，请再试一次。", timeout: 2600 });
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className="mt-9 flex justify-center">
      <button
        type="button"
        onClick={() => void leaveStar()}
        disabled={hasLeftStar || isPending}
        className="rounded-full border border-[#f6efe4] bg-transparent px-6 py-2.5 text-sm text-[#f6efe4] transition-colors hover:bg-[#f6efe4]/8 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f6efe4] disabled:cursor-default disabled:opacity-60"
      >
        <span aria-hidden="true" className="mr-2">✦</span>
        {hasLeftStar ? "已留下" : "给这个宇宙留颗星"}
      </button>
    </div>
  );
}
