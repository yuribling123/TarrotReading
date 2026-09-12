"use client";

import Link from "next/link";
import { messages } from "@/lib/i18n";
import { useReadingSession } from "@/app/components/reading-session-provider";

export function Navigation() {
  const { language, resetReading } = useReadingSession();
  const text = messages[language];

  return (
    <nav className="topNavigation" aria-label="Site navigation">

      <Link className="navBrand" href="/" onClick={resetReading}>
        {text.brand}
      </Link>
    
      
    </nav>
  );
}
