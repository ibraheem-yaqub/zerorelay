import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import "./hero.css";
import "./home.css";
import "./coins.css";
import "./motion.css";

// Downloaded at build time and self-hosted by Next — no runtime request to Google.
const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const instrumentSerif = localFont({
  src: "./fonts/instrument-serif-italic-latin.woff2",
  variable: "--font-instrument-serif",
  style: "italic",
  weight: "400",
  display: "swap",
});

const jetBrainsMono = localFont({
  src: "./fonts/jetbrains-mono-latin.woff2",
  variable: "--font-jetbrains-mono",
  weight: "400 500",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ZeroRelay — Private execution for Robinhood Chain",
  description:
    "A private transaction routing interface for Robinhood Chain. Preview transaction intent and Robinhood Chain JSON-RPC payloads locally.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${interTight.variable} ${instrumentSerif.variable} ${jetBrainsMono.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
