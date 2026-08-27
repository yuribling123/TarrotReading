"use client";

import Link from "next/link";
import { messages } from "@/lib/i18n";
import { useReadingSession } from "@/app/components/reading-session-provider";
import { MoonIcon } from "./moon-icon";

export function Navigation() {
  const { language, resetReading, setLanguage } = useReadingSession();
  const text = messages[language];

  return (
    <nav className="topNavigation" aria-label="Site navigation">

      <MoonIcon language={language}></MoonIcon>

      <Link className="navBrand" href="/" onClick={resetReading}>
        {text.brand}
      </Link>
    
      
      {/* <button
        className="languageToggle"
        type="button"
        onClick={() => setLanguage((current) => (current === "en" ? "zh" : "en"))}
        aria-label={text.languageLabel}
      >
        {text.languageSwitch}
      </button> */}

            
      <button
        className="languageToggle"
        type="button"
      >
        <p>EN</p>
      </button>

    </nav>
  );
}
