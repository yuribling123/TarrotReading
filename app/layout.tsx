import type { Metadata } from "next";
import { Navigation } from "@/app/components/shared/navigation";
import { ThemeProvider } from "@/app/components/shared/theme-provider";
import { ReadingSessionProvider } from "@/app/components/reading/reading-session-provider";
import { Toaster } from "@/components/ui/toast";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/next"



export const metadata: Metadata = {
  title: "Moonlit Tarot",
  description: "A mystical three-card tarot reading powered by AI reflection.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans")} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `try{if(localStorage.getItem("moonlit-tarot-theme")==="dark")document.documentElement.classList.add("dark")}catch{}` }} />
      </head>
      <body>
        <Toaster />
        <Analytics />

        <ThemeProvider>
          <ReadingSessionProvider>
            <Navigation />
            <main className="min-h-[calc(100svh-76px)] overflow-x-hidden">
              {children}
            </main>
          </ReadingSessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
