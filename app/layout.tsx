import type { Metadata } from "next";
import { Navigation } from "@/app/components/navigation";
import { ReadingSessionProvider } from "@/app/components/reading-session-provider";
import { Toaster } from "@/components/ui/toast";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

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
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body>
        <Toaster />
        <ReadingSessionProvider>
          <main className="shell">
            <section className="hero" aria-label="Moonlit tarot reading">
              <div className="stars" />
              <div className="aurora" />
              <Navigation />
              {children}
            </section>
          </main>
        </ReadingSessionProvider>
      </body>
    </html>
  );
}
