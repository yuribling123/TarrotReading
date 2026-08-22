"use client";

import {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { DrawnCard } from "@/lib/types";
import type { Language, ReadingResponse, ReadingSessionData } from "@/lib/types";

const storageKey = "moonlit-tarot-reading";

type ReadingSessionContextValue = ReadingSessionData & {
  error: string;
  isHydrated: boolean;
  isLoading: boolean;
  setCards: Dispatch<SetStateAction<DrawnCard[]>>;
  setError: Dispatch<SetStateAction<string>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setLanguage: Dispatch<SetStateAction<Language>>;
  setQuestion: Dispatch<SetStateAction<string>>;
  setReading: Dispatch<SetStateAction<ReadingResponse | null>>;
  setSelectedIndexes: Dispatch<SetStateAction<number[]>>;
  resetReading: () => void;
};

const ReadingSessionContext = createContext<ReadingSessionContextValue | null>(null);

const initialSession: ReadingSessionData = {
  language: "zh",
  question: "",
  selectedIndexes: [],
  cards: [],
  reading: null,
};

function clearLegacyFallbackCopy(session: ReadingSessionData): ReadingSessionData {
  const reading = session.reading;
  const legacyReading = reading as (ReadingResponse & { intro?: string; synthesis?: string; disclaimer?: string }) | null;
  const isLegacyFallback =
    legacyReading?.intro?.startsWith("The cards gather around your question:") ||
    legacyReading?.intro?.startsWith("牌面围绕着你的问题展开：");

  if (!reading || !isLegacyFallback) {
    return session;
  }

  return {
    ...session,
    reading: {
      ...reading,
      cards: reading.cards.map((card) => ({ ...card, message: "" })),
      answer: "",
      guidance: "",
    },
  };
}

export function ReadingSessionProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<ReadingSessionData>(initialSession);
  const [error, setError] = useState("");
  const [isHydrated, setIsHydrated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const storedSession = window.sessionStorage.getItem(storageKey);

    if (storedSession) {
      try {
        setSession(clearLegacyFallbackCopy({ ...initialSession, ...JSON.parse(storedSession) }));
      } catch {
        window.sessionStorage.removeItem(storageKey);
      }
    }

    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    // Future shareable reading URLs and durable history require server/database persistence.
    window.sessionStorage.setItem(storageKey, JSON.stringify(session));
  }, [isHydrated, session]);

  const value = useMemo<ReadingSessionContextValue>(
    () => ({
      ...session,
      error,
      isHydrated,
      isLoading,
      setCards: (value) => setSession((current) => ({ ...current, cards: typeof value === "function" ? value(current.cards) : value })),
      setError,
      setIsLoading,
      setLanguage: (value) => setSession((current) => ({ ...current, language: typeof value === "function" ? value(current.language) : value })),
      setQuestion: (value) => setSession((current) => ({ ...current, question: typeof value === "function" ? value(current.question) : value })),
      setReading: (value) => setSession((current) => ({ ...current, reading: typeof value === "function" ? value(current.reading) : value })),
      setSelectedIndexes: (value) =>
        setSession((current) => ({
          ...current,
          selectedIndexes: typeof value === "function" ? value(current.selectedIndexes) : value,
        })),
      resetReading: () => {
        setSession((current) => ({ ...initialSession, language: current.language }));
        setError("");
        setIsLoading(false);
        window.sessionStorage.removeItem(storageKey);
      },
    }),
    [error, isHydrated, isLoading, session],
  );

  return <ReadingSessionContext.Provider value={value}>{children}</ReadingSessionContext.Provider>;
}

export function useReadingSession() {
  const context = useContext(ReadingSessionContext);

  if (!context) {
    throw new Error("useReadingSession must be used within ReadingSessionProvider.");
  }

  return context;
}
