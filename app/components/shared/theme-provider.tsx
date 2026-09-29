"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Theme = "light" | "dark";

const ThemeContext = createContext<{
  theme: Theme;
  toggleTheme: () => void;
  hasTriedDark: boolean;
  isReady: boolean;
  themeSwitchDisabled: boolean;
  setThemeSwitchDisabled: (disabled: boolean) => void;
} | null>(null);

const storageKey = "moonlit-tarot-theme";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [isReady, setIsReady] = useState(false);
  const [hasTriedDark, setHasTriedDark] = useState(false);
  const [themeSwitchDisabled, setThemeSwitchDisabled] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);
    if (saved === "dark") setTheme("dark");
    if (saved === "dark" || saved === "light") setHasTriedDark(true);
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady) return;
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [isReady, theme]);

  function toggleTheme() {
    if (themeSwitchDisabled) return;
    setHasTriedDark(true);
    setTheme((current) => {
      const next = current === "light" ? "dark" : "light";
      window.localStorage.setItem(storageKey, next);
      return next;
    });
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme, hasTriedDark, isReady, themeSwitchDisabled, setThemeSwitchDisabled }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider.");
  return context;
}
