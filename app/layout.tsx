import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const instrumentSans = localFont({
  src: "./fonts/instrument-sans-latin.woff2",
  variable: "--font-instrument-sans",
  weight: "400 600",
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
      <body className={`${instrumentSans.variable} ${instrumentSerif.variable} ${jetBrainsMono.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
