"use client";

import {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";

import type {
  Language,
  ReadingResponse,
  ReadingSessionData,
  TarotCard,
} from "@/lib/types";
import {
  clearStoredReadingSession,
  INITIAL_READING_SESSION,
  useReadingSessionStorage,
} from "./use-reading-session-storage";

function resolveStateAction<T>(value: SetStateAction<T>, current: T) {
  return typeof value === "function"
    ? (value as (previous: T) => T)(current)
    : value;
}
/**
 * Context 里允许其他组件读取 / 修改的数据
 */
type ReadingSessionContextValue = ReadingSessionData & {
  //负责告诉其他组件一个页面现在什么状态。
  error: string;
  isHydrated: boolean; 
  isLoading: boolean;

  setCards: Dispatch<SetStateAction<TarotCard[]>>;
  setError: Dispatch<SetStateAction<string>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setLanguage: Dispatch<SetStateAction<Language>>;
  setQuestion: Dispatch<SetStateAction<string>>;
  setReading: Dispatch<SetStateAction<ReadingResponse | null>>;
  setSelectedIndexes: Dispatch<SetStateAction<number[]>>;
  setFeedback: Dispatch<SetStateAction<boolean>>;

  resetReading: () => void;
};


/**
 * 创建全局 Reading Context
 */
const ReadingSessionContext =
  createContext<ReadingSessionContextValue | null>(null);


// 把 reading 的数据提供给它包住的所有组件
export function ReadingSessionProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { isHydrated, session, setSession } = useReadingSessionStorage();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  /**
   * 提供给所有子组件的数据和 setter,memo 避免重复创建已经创建的object
   */
  const value = useMemo<ReadingSessionContextValue>(
    () => ({
      ...session,

      error,
      isHydrated,
      isLoading,

      setError,
      setIsLoading,

      setFeedback: (value) =>
        setSession((current) => ({
          ...current,
          feedback: resolveStateAction(value, current.feedback),
        })),


      setCards: (value) =>
        setSession((current) => ({
          ...current,
          cards: resolveStateAction(value, current.cards),
        })),

      setLanguage: (value) =>
        setSession((current) => ({
          ...current,
          language: resolveStateAction(value, current.language),
        })),

      setQuestion: (value) =>
        setSession((current) => ({
          ...current,
          question: resolveStateAction(value, current.question),
        })),

      setReading: (value) =>
        setSession((current) => ({
          ...current,
          reading: resolveStateAction(value, current.reading),
        })),

      setSelectedIndexes: (value) =>
        setSession((current) => ({
          ...current,
          selectedIndexes: resolveStateAction(value, current.selectedIndexes),
        })),

      /**
       * 开始一次新的 reading
       */
      resetReading: () => {
        setSession((current) => ({
          ...INITIAL_READING_SESSION,
          language: current.language,
        }));

        setError("");
        setIsLoading(false);

        clearStoredReadingSession();
      },
    }),


    [error, isHydrated, isLoading, session, setSession],
  );


  return (
    <ReadingSessionContext.Provider value={value}>
      {children}
    </ReadingSessionContext.Provider>
  );
}


/**
 * 其他组件用这个 hook 获取 reading 数据
 *
 * example:
 * const { question, cards, reading } = useReadingSession();
 */
export function useReadingSession() {
  const context = useContext(ReadingSessionContext);

  if (!context) {
    throw new Error(
      "useReadingSession must be used within ReadingSessionProvider.",
    );
  }

  return context;
}
