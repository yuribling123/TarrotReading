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

import type {
  Language,
  ReadingResponse,
  ReadingSessionData,
  TarotCard,
} from "@/lib/types";

// 给储存的数据起一个名字，存到浏览器的 Session Storage
const storageKey = "moonlit-tarot-reading";
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


/**
 * 一次新塔罗 reading 的初始状态
 */
const initialSession: ReadingSessionData = {
  language: "zh",
  question: "",
  selectedIndexes: [],
  cards: [],
  reading: null,
  feedback: false,
};

// 把 reading 的数据提供给它包住的所有组件
export function ReadingSessionProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [session, setSession] =
    useState<ReadingSessionData>(initialSession);

  const [error, setError] = useState("");
  const [isHydrated, setIsHydrated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  /**
   * 页面第一次加载时 从 sessionStorage 恢复之前的 reading
   */
  useEffect(() => {
    const storedSession =
      window.sessionStorage.getItem(storageKey);

    if (storedSession) {
      try {
        setSession({
          ...initialSession,
          ...JSON.parse(storedSession),
        });
      } catch {
        // 如果旧数据坏了，就删掉
        window.sessionStorage.removeItem(storageKey);
      }
    }

    setIsHydrated(true);
  }, []);


  /**
   * session 改变时：
   * 自动保存到 sessionStorage
   */
  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    window.sessionStorage.setItem(
      storageKey,
      JSON.stringify(session),
    );
  }, [isHydrated, session]);


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
          feedback:
            typeof value === "function"
              ? value(current.feedback)
              : value,
        })),


      setCards: (value) =>
        setSession((current) => ({
          ...current,
          cards:
            typeof value === "function"
              ? value(current.cards)
              : value,
        })),

      setLanguage: (value) =>
        setSession((current) => ({
          ...current,
          language:
            typeof value === "function"
              ? value(current.language)
              : value,
        })),

      setQuestion: (value) =>
        setSession((current) => ({
          ...current,
          question:
            typeof value === "function"
              ? value(current.question)
              : value,
        })),

      setReading: (value) =>
        setSession((current) => ({
          ...current,
          reading:
            typeof value === "function"
              ? value(current.reading)
              : value,
        })),

      setSelectedIndexes: (value) =>
        setSession((current) => ({
          ...current,
          selectedIndexes:
            typeof value === "function"
              ? value(current.selectedIndexes)
              : value,
        })),

      /**
       * 开始一次新的 reading
       */
      resetReading: () => {
        setSession((current) => ({
          ...initialSession,
          language: current.language,
        }));

        setError("");
        setIsLoading(false);

        window.sessionStorage.removeItem(storageKey);
      },
    }),


    [error, isHydrated, isLoading, session],
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