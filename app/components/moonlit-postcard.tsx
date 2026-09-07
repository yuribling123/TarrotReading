"use client";

import { useEffect, useMemo, useState } from "react";
import {
  formatPostcardDate,
  getDailyPostcard,
  getPostcardDateKey,
} from "@/lib/postcards/select-daily-postcard";

export function MoonlitPostcard() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isRead, setIsRead] = useState(false);
  const [isReadStateReady, setIsReadStateReady] = useState(false);
  const dateKey = useMemo(() => getPostcardDateKey(), []);
  const postcard = useMemo(() => getDailyPostcard(), []);
  const displayDate = formatPostcardDate(dateKey);
  const readStorageKey = `moonlit-postcard-read:${dateKey}`;

  function closePostcard() {
    setIsOpen(false);
    setIsFlipped(false);
  }

  function recordPostcardOpen() {
    void fetch("/api/postcard-opens", { method: "POST" }).catch((error) => {
      console.error("Failed to record postcard open:", error);
    });
  }

  useEffect(() => {
    setIsRead(window.localStorage.getItem(readStorageKey) === "true");
    setIsReadStateReady(true);
  }, [readStorageKey]);

  useEffect(() => {
    if (!isOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closePostcard();
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          if (!isRead) recordPostcardOpen();
          setIsOpen(true);
        }}
        className={`group fixed right-4 top-[96px] z-20 h-8 w-10 overflow-visible bg-transparent drop-shadow-[0_5px_9px_rgba(91,69,105,0.14)] transition duration-300 hover:-translate-x-1 sm:right-3 sm:top-[104px] ${isReadStateReady ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        aria-label={isRead ? "重新查看月之彼岸的今日来信" : "打开月之彼岸的今日来信"}
      >

        <svg
          viewBox="0 0 58 48"
          className="absolute inset-0 z-10 size-full text-[#897491]"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="7" y="9.5" width="44" height="31" rx="4.5" fill="#fbfaf8" stroke="currentColor" strokeWidth=".85" opacity=".96" />
          <path d="M7 12.5 29 29l22-16.5" stroke="currentColor" strokeWidth=".85" opacity=".52" />
          <path d="m7 40 15.7-14.3M51 40 35.3 25.7" stroke="currentColor" strokeWidth=".85" opacity=".28" />
        </svg>
        <span
          className={`absolute left-[12.5px] top-[11px] z-40 grid size-2.5
    place-items-center rounded-full border transition duration-500 ${isRead
              ? "border-[#9a8da0]/35 bg-[#f7f4f7] opacity-60"
              : "border-transparent bg-[#8d7898] shadow-[0_2px_5px_rgba(76,56,86,0.25)]"
            }`}
        >
          <svg viewBox="0 0 13 13" className="size-2" fill="none">
            <path
              d="M7.9 2.2A4.1 4.1 0 1 0 9.8 8 3.55 3.55 0 0 1 7.9 2.2Z"
              fill={isRead ? "#9a8da0" : "#f5f0f5"}
            />
          </svg>
        </span>
        {!isRead && (
          <span className="absolute right-0 top-0 z-30 size-1.5 rounded-full bg-[#b394bd] shadow-[0_0_7px_2px_rgba(179,148,189,0.45)]" aria-hidden="true" />
        )}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-[#302638]/20 px-5 backdrop-blur-[3px] animate-in fade-in duration-300"
          role="dialog"
          aria-modal="true"
          aria-label="来自月之彼岸的明信片"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closePostcard();
          }}
        >
          <div className="relative w-full max-w-[420px] [perspective:1200px]">
            <button
              type="button"
              onClick={closePostcard}
              className="absolute -right-1 -top-11 z-20 grid size-9 place-items-center rounded-full border border-white/60 bg-white/75 text-lg font-light text-[#75677d] shadow-sm backdrop-blur-md transition hover:bg-white"
              aria-label="关闭来信"
            >
              ×
            </button>

            <button
              type="button"
              onClick={() => {
                if (!isFlipped) {
                  setIsRead(true);
                  window.localStorage.setItem(readStorageKey, "true");
                }
                setIsFlipped((current) => !current);
              }}
              className="relative block aspect-[1.45/1] w-full bg-transparent text-left [transform-style:preserve-3d] transition-transform duration-700 ease-[cubic-bezier(.22,.75,.25,1)]"
              style={{ transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
              aria-label={isFlipped ? "查看明信片正面" : "翻开明信片"}
            >
              <span className="absolute inset-0 overflow-hidden rounded-[22px] border border-[#95829e]/25 bg-[#fbfaf7] p-7 text-[#67566f] shadow-[0_24px_70px_rgba(54,39,63,0.24)] [backface-visibility:hidden] sm:p-9">
                <span className="flex items-start justify-between">
                  <span className="text-[11px] tracking-[0.24em]">月之彼岸</span>
                  <span className="grid size-12 place-items-center rounded-sm border border-[#8d7898]/35 text-[9px] tracking-wider">
                    ◐<br />{dateKey.slice(5).replace("-", "·")}
                  </span>
                </span>
                <span className="absolute inset-x-0 top-[43%] block text-center">
                  <span className="mx-auto mb-5 block h-px w-20 bg-gradient-to-r from-transparent via-[#917d9b]/45 to-transparent" />
                  <span className="block text-sm tracking-[0.18em]">寄往：此刻的你</span>
                  <span className="mt-4 block text-[10px] tracking-[0.12em] text-[#a092a7]">轻触翻开</span>
                </span>
              </span>

              <span className="absolute inset-0 overflow-hidden rounded-[22px] border border-[#95829e]/25 bg-[#fbfaf7] p-7 text-[#55495b] shadow-[0_24px_70px_rgba(54,39,63,0.24)] [backface-visibility:hidden] [transform:rotateY(180deg)] sm:p-9">
                <span className="block text-[10px] tracking-[0.22em] text-[#907c99]">来自彼岸的你 · {displayDate}</span>
                <span className="my-5 block h-px w-full bg-gradient-to-r from-[#a491ad]/10 via-[#a491ad]/35 to-[#a491ad]/10" />
                <span className="block text-[14px] leading-8 tracking-[0.06em] sm:text-[15px]">
                  {postcard.content}
                </span>
                <span className="absolute inset-x-7 bottom-7 block text-right text-[10px] tracking-[0.12em] text-[#a092a7] sm:inset-x-9 sm:bottom-9">
                  月光短暂交汇，我们明日再见。
                </span>
              </span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
