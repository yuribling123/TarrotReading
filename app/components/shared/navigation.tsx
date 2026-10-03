"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { messages } from "@/lib/i18n";
import { useReadingSession } from "@/app/components/reading/reading-session-provider";
import { useTheme } from "@/app/components/shared/theme-provider";
import { clearStoredDiceStory } from "@/lib/dice/story-session-storage";

export function Navigation() {
  const { language, resetReading } = useReadingSession();
  const text = messages[language];
  const { theme, toggleTheme, hasTriedDark, isReady, themeSwitchDisabled } = useTheme();
  const pathname = usePathname();

  function returnHome() {
    resetReading();
    clearStoredDiceStory();
  }

  return (
    <nav
      className="sticky inset-x-0 top-0 z-300 h-[76px] overflow-visible border-b border-[rgba(112,82,34,0.16)] bg-[#fffdf8] shadow-[0_8px_22px_rgba(70,51,22,0.08)] dark:border-[#d7b56d]/12 dark:bg-[linear-gradient(180deg,rgba(20,16,28,0.93),rgba(12,9,19,0.88))] dark:shadow-none"
      aria-label="Site navigation"
    >
      <Link
        className="absolute left-1/2 top-[26px] z-[2] m-0 -translate-x-1/2 text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-[#7f5b1f] no-underline hover:text-[#63400b] dark:text-[#f7efe3] dark:hover:text-white"
        href="/"
        onClick={returnHome}
      >
        {pathname === "/dice" || theme === "dark" ? messages.zh.brand : text.brand}
      </Link>

      <div
        className="pointer-events-none absolute left-1/2 top-[49px] flex -translate-x-1/2 items-center gap-[5px]"
        aria-hidden="true"
      >
        <span className="h-px w-6 bg-[#b89755]/40 dark:bg-[#f7efe3]/20" />

        <span className="text-[6px] leading-none text-[#b89755]/70">·</span>

        <span className="text-[7px]  leading-none text-[#9b72c7]/70">
          ✦
        </span>

        <span className="text-[6px] leading-none text-[#b89755]/70">·</span>

        <span className="h-px w-6 bg-[#b89755]/40 dark:bg-[#f7efe3]/20" />
      </div>
      {pathname === "/" && <button
        type="button"
        onClick={toggleTheme}
        disabled={themeSwitchDisabled}
        aria-label={theme === "dark" ? text.themeToLight : text.themeToDark}
        aria-describedby={isReady && theme === "light" && !hasTriedDark ? "theme-feature-hint" : undefined}
        aria-pressed={theme === "dark"}
        className="absolute right-5 top-1/2 -translate-y-1/2 rounded-full border border-[#b89755]/40 px-3 py-2 text-xs text-[#7f5b1f] transition-colors hover:bg-[#b89755]/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current disabled:cursor-wait disabled:opacity-50 dark:border-[#CFC4B4]/65 dark:text-[#f7efe3] dark:hover:bg-[#f7efe3]/8"
      >
        {theme === "dark" ? (
          <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
            <circle cx="12" cy="12" r="3.5" />
            <path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" />
          </svg>
        ) : "☾"}
      </button>}
      {pathname === "/" && isReady && theme === "light" && !hasTriedDark && (
        <span
          id="theme-feature-hint"
          className="pointer-events-none absolute right-16 top-[57px] whitespace-nowrap text-[10px] tracking-wide text-[#7f5b1f]/75 sm:right-18 sm:top-1/2 sm:-translate-y-1/2"
        >
          点月亮，体验星骰故事 <span aria-hidden="true">↗</span>
        </span>
      )}
    </nav>
  );
}
