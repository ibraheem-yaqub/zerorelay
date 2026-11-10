export type ChainId = "solana" | "robinhood" | "ethereum" | "arbitrum" | "base";

const chainColors: Record<ChainId, string> = {
  solana: "text-violet-200",
  robinhood: "text-[#C6F700]",
  ethereum: "text-slate-200",
  arbitrum: "text-sky-200",
  base: "text-blue-300",
};

const chainLabels: Record<ChainId, string> = {
  solana: "Solana",
  robinhood: "Robinhood",
  ethereum: "Ethereum",
  arbitrum: "Arbitrum",
  base: "Base",
};

type ChainMarkProps = {
  chain: ChainId;
  className?: string;
};

export default function ChainMark({ chain, className = "" }: ChainMarkProps) {
  const label = chain === "robinhood"
    ? `${chainLabels[chain]} logo`
    : `${chainLabels[chain]} network mark`;

  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={`chain-mark ${chainColors[chain]} ${className}`}
      role="img"
      aria-label={label}
    >
      {chain === "solana" ? (
        <g fill="currentColor">
          <path d="M8 8.5h15.4l2.8 2.8H10.8L8 8.5Z" />
          <path d="M5.8 14.6h15.4l2.8 2.8H8.6l-2.8-2.8Z" />
          <path d="M8 20.7h15.4l2.8 2.8H10.8L8 20.7Z" />
        </g>
      ) : null}
      {chain === "robinhood" ? (
        <g fill="currentColor">
          <path d="M25.7 4.2C17.9 5.1 11.1 8 7.6 12.6c-3.3 4.3-3.3 9.1-.2 12.1l-4.1 4.1 1.7 1.7 4.2-4.2c3.4 1.9 7.6 1.1 10.7-2 4.7-4.6 6.3-12.5 5.8-20.1Z" />
          <path d="M8.2 24.7c4.4-6.8 9.9-12.2 16.8-19.1" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
          <path d="M11 20.5c2.4-.2 4.7.1 6.9.9M14.4 16.3c2.4-.1 4.9.3 7.1 1.2M18.1 12.1c1.8 0 3.6.3 5.3 1" fill="none" stroke="#050505" strokeLinecap="round" strokeWidth="1.25" />
        </g>
      ) : null}
      {chain === "ethereum" ? (
        <g fill="currentColor">
          <path d="m16 3 8.3 13-8.3 4.9L7.7 16 16 3Z" opacity=".82" />
          <path d="m16 22.7 8.3-4.8L16 29l-8.3-11.1 8.3 4.8Z" opacity=".58" />
        </g>
      ) : null}
      {chain === "arbitrum" ? (
        <g fill="currentColor">
          <path d="M16 3.2 27.1 9.6v12.8L16 28.8 4.9 22.4V9.6L16 3.2Zm0 3.5L8 11.3v9.4l8 4.6 8-4.6v-9.4l-8-4.6Z" opacity=".72" />
          <path d="m15.1 10.1 3.4 5.9-3.4 5.9h-3.5l3.4-5.9-3.4-5.9h3.5Zm5 0 3.4 5.9-3.4 5.9h-3.5l3.4-5.9-3.4-5.9h3.5Z" />
        </g>
      ) : null}
      {chain === "base" ? (
        <g fill="currentColor">
          <path d="M16 3a13 13 0 1 0 12.8 15h-6.2A6.8 6.8 0 1 1 16 9.2c3.1 0 5.7 2 6.5 4.8h6.2A13 13 0 0 0 16 3Z" />
          <path d="M16 12.8a3.2 3.2 0 1 0 0 6.4h12.7v-6.4H16Z" />
        </g>
      ) : null}
    </svg>
  );
}
