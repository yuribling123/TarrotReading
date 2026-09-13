"use client";

import { useEffect, useMemo, useState } from "react";

import {
  formatPostcardDate,
  getDailyPostcard,
  getPostcardDateKey,
} from "@/lib/postcards/select-daily-postcard";

export function useDailyPostcard() {
  const [isRead, setIsRead] = useState(false);
  const [isReadStateReady, setIsReadStateReady] = useState(false);
  const dateKey = useMemo(() => getPostcardDateKey(), []);
  const postcard = useMemo(() => getDailyPostcard(), []);
  const displayDate = formatPostcardDate(dateKey);
  const readStorageKey = `moonlit-postcard-read:${dateKey}`;

  useEffect(() => {
    setIsRead(window.localStorage.getItem(readStorageKey) === "true");
    setIsReadStateReady(true);
  }, [readStorageKey]);

  function markAsRead() {
    setIsRead(true);
    window.localStorage.setItem(readStorageKey, "true");
  }

  return {
    dateKey,
    displayDate,
    isRead,
    isReadStateReady,
    markAsRead,
    postcard,
  };
}
