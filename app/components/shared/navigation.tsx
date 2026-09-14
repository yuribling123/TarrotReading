"use client";

import Link from "next/link";
import { messages } from "@/lib/i18n";
import { useReadingSession } from "@/app/components/reading/reading-session-provider";

export function Navigation() {
  const { language, resetReading } = useReadingSession();
  const text = messages[language];

  return (
    <nav className="fixed inset-x-0 top-0 z-300 h-[76px] overflow-hidden border-b border-[rgba(112,82,34,0.16)] bg-[#FAF7F1] shadow-[0_8px_22px_rgba(70,51,22,0.08)]" aria-label="Site navigation">
      <Link className="absolute left-1/2 top-[26px] z-[2] m-0 -translate-x-1/2 text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-[#7f5b1f] no-underline hover:text-[#63400b]" href="/" onClick={resetReading}>
        {text.brand}
      </Link>
    </nav>
  );
}
