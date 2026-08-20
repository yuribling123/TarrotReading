import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
