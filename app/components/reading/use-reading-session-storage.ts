"use client";

import { useEffect, useState } from "react";

import type { ReadingSessionData } from "@/lib/types";

const STORAGE_KEY = "moonlit-tarot-reading";

export const INITIAL_READING_SESSION: ReadingSessionData = {
  language: "zh",
  question: "",
  selectedIndexes: [],
  cards: [],
  reading: null,
  feedback: false,
};

export function clearStoredReadingSession() {
  window.sessionStorage.removeItem(STORAGE_KEY);
}

export function useReadingSessionStorage() {
  const [session, setSession] = useState<ReadingSessionData>(
    INITIAL_READING_SESSION,
  );
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const storedSession = window.sessionStorage.getItem(STORAGE_KEY);

    if (storedSession) {
      try {
        setSession({
          ...INITIAL_READING_SESSION,
          ...JSON.parse(storedSession),
        });
      } catch {
        clearStoredReadingSession();
      }
    }

    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  }, [isHydrated, session]);

  return { isHydrated, session, setSession };
}
