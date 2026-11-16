import type { CoinKind } from "@/lib/coin-types";

/**
 * Original line glyphs for each coin type (24×24 grid, drawn in currentColor).
 * Deliberately generic: no third-party logos, issuer marks or tickers.
 */
const GLYPHS: Record<CoinKind, JSX.Element> = {
  // Gas flame
  eth: (
    <>
      <path d="M12 2.8c.9 3.1 5.2 5.4 5.2 10.3a5.2 5.2 0 0 1-10.4 0c0-2.6 1.4-4.3 2.6-5.3.2 1.7.9 2.8 2 3.3-.3-3.1-.6-5.6.6-8.3Z" />
      <path d="M12 20.2a2.3 2.3 0 0 1-2.3-2.3c0-1.4 1.2-2.4 2.3-3.4 1.1 1 2.3 2 2.3 3.4a2.3 2.3 0 0 1-2.3 2.3Z" />
    </>
  ),
  // Dollar sign
  usdg: (
    <>
      <path d="M16 7.6c-.8-1.3-2.2-2.1-3.9-2.1-2.2 0-3.9 1.2-3.9 3 0 4 7.8 2.4 7.8 6.3 0 1.8-1.8 3-3.9 3-1.8 0-3.3-.8-4.1-2.3" />
      <path d="M12 3v18" />
    </>
  ),
  // Candlesticks
  stock: (
    <>
      <path d="M6 4v3M6 15v4M12 3v3M12 13v3M18 7v4M18 17v3" />
      <rect x="4.2" y="7" width="3.6" height="8" rx="0.8" />
      <rect x="10.2" y="6" width="3.6" height="7" rx="0.8" />
      <rect x="16.2" y="11" width="3.6" height="6" rx="0.8" />
    </>
  ),
  // Two-arc bridge
  bridged: (
    <>
      <path d="M2.5 15.5h19" />
      <path d="M3 15.5c1.5-4.6 3.7-6.9 4.8-6.9S11.1 11 12 15.5c.9-4.5 3.1-6.9 4.2-6.9s3.3 2.3 4.8 6.9" />
      <path d="M7.8 8.6v6.9M16.2 8.6v6.9M4.5 15.5v4M19.5 15.5v4" />
    </>
  ),
  // Sparkle
  new: (
    <>
      <path d="M11 3.5 12.9 9.6 19 11.5 12.9 13.4 11 19.5 9.1 13.4 3 11.5 9.1 9.6Z" />
      <path d="M18.5 15.5 19.3 17.7 21.5 18.5 19.3 19.3 18.5 21.5 17.7 19.3 15.5 18.5 17.7 17.7Z" />
    </>
  ),
  // Opposing arrows
  swap: (
    <>
      <path d="M4 8.5h15M15.5 4.5l4 4-4 4" />
      <path d="M20 15.5H5M8.5 11.5l-4 4 4 4" />
    </>
  ),
  // Rocket lifting off
  launch: (
    <>
      <path d="M12 2.5c3.1 2.1 4.6 5.6 4.6 9.6l-2 3.2H9.4l-2-3.2c0-4 1.5-7.5 4.6-9.6Z" />
      <circle cx="12" cy="9" r="1.7" />
      <path d="M7.4 11.8 4.8 15.6l3.4.4M16.6 11.8l2.6 3.8-3.4.4" />
      <path d="M10.4 18.2 12 21.5l1.6-3.3" />
    </>
  ),
  // Vault / institution
  asset: (
    <>
      <path d="M3 9.2 12 4l9 5.2Z" />
      <path d="M5.5 11v6.5M9.8 11v6.5M14.2 11v6.5M18.5 11v6.5" />
      <path d="M3 20h18M4 17.5h16" />
    </>
  ),
};

export default function CoinGlyph({ kind, className = "" }: { kind: CoinKind; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {GLYPHS[kind]}
    </svg>
  );
}
