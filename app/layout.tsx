import type { Metadata } from "next";
import { Navigation } from "@/app/components/shared/navigation";
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
    <html lang="en" className={cn("font-sans")}>
      <body>
        <Toaster />
        <Analytics />
        <ReadingSessionProvider>
          <main className="min-h-screen overflow-hidden max-[520px]:min-h-svh max-[520px]:overflow-x-hidden">
            <section className="hero relative flex min-h-screen items-center bg-transparent text-[var(--night)]" aria-label="Moonlit tarot reading">
              <Navigation />
              {children}
            </section>
          </main>
        </ReadingSessionProvider>
      </body>
    </html>
  );
}
