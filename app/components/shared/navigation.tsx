"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { messages } from "@/lib/i18n";
import { useReadingSession } from "@/app/components/reading/reading-session-provider";
import { useTheme } from "@/app/components/shared/theme-provider";

export function Navigation() {
  const { language, resetReading } = useReadingSession();
  const text = messages[language];
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

  return (
    <nav
      className="sticky inset-x-0 top-0 z-300 h-[76px] overflow-hidden border-b border-[rgba(112,82,34,0.16)] bg-[#fffdf8] shadow-[0_8px_22px_rgba(70,51,22,0.08)] dark:border-white/15 dark:bg-[#171521] dark:shadow-none"
      aria-label="Site navigation"
    >
      <Link
        className="absolute left-1/2 top-[26px] z-[2] m-0 -translate-x-1/2 text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-[#7f5b1f] no-underline hover:text-[#63400b] dark:text-[#f7efe3] dark:hover:text-white"
        href="/"
        onClick={resetReading}
      >
        {text.brand}
      </Link>

      <div
        className="pointer-events-none absolute left-1/2 top-[49px] flex -translate-x-1/2 items-center gap-[5px]"
        aria-hidden="true"
      >
        <span className="h-px w-6 bg-[#b89755]/40" />

        <span className="text-[6px] leading-none text-[#b89755]/70">·</span>

        <span className="text-[7px]  leading-none text-[#9b72c7]/70">
          ✦
        </span>

        <span className="text-[6px] leading-none text-[#b89755]/70">·</span>

        <span className="h-px w-6 bg-[#b89755]/40" />
      </div>
      {pathname === "/" && <button
        type="button"
        onClick={toggleTheme}
        aria-label={theme === "dark" ? text.themeToLight : text.themeToDark}
        aria-pressed={theme === "dark"}
        className="absolute right-5 top-1/2 -translate-y-1/2 rounded-full border border-[#b89755]/40 px-3 py-2 text-xs text-[#7f5b1f] transition-colors hover:bg-[#b89755]/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current dark:border-[#CFC4B4]/65 dark:text-[#f7efe3] dark:hover:bg-[#f7efe3]/8"
      >
        {theme === "dark" ? "☀" : "☾"}
      </button>}
    </nav>
  );
}
