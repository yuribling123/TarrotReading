"use client";

import { useEffect, useState } from "react";

import { PostcardDialog } from "./postcard-dialog";
import { PostcardEnvelope } from "./postcard-envelope";
import { useDailyPostcard } from "./use-daily-postcard";

export function MoonlitPostcard() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const {
    dateKey,
    displayDate,
    isRead,
    isReadStateReady,
    markAsRead,
    postcard,
  } = useDailyPostcard();

  function closePostcard() {
    setIsOpen(false);
    setIsFlipped(false);
  }

  useEffect(() => {
    if (!isOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closePostcard();
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

  function openPostcard() {
    if (!isRead) {
      void fetch("/api/postcard-opens", { method: "POST" }).catch((error) => {
        console.error("Failed to record postcard open:", error);
      });
    }

    setIsOpen(true);
  }

  function flipPostcard() {
    if (!isFlipped) markAsRead();
    setIsFlipped((current) => !current);
  }

  return (
    <>
      <PostcardEnvelope
        isRead={isRead}
        isReady={isReadStateReady}
        onOpen={openPostcard}
      />
      {isOpen && (
        <PostcardDialog
          content={postcard.content}
          dateKey={dateKey}
          displayDate={displayDate}
          isFlipped={isFlipped}
          onClose={closePostcard}
          onFlip={flipPostcard}
        />
      )}
    </>
  );
}
