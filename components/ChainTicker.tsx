import ChainMark, { type ChainId } from "@/components/ChainMark";

const networks: ChainId[] = ["solana", "robinhood", "arbitrum", "base", "ethereum"];

function NetworkLogos() {
  return networks.map((chain) => (
    <span key={chain} className="chain-ticker-item group/chain">
      <span className="chain-icon-frame">
        <ChainMark chain={chain} />
      </span>
      <span>{chain === "robinhood" ? "Robinhood Chain" : chain.charAt(0).toUpperCase() + chain.slice(1)}</span>
    </span>
  ));
}

export default function ChainTicker() {
  return (
    <div className="chain-ticker mx-auto mt-10 max-w-5xl">
      <p className="mb-3 text-center font-mono text-[8px] tracking-[0.18em] text-zinc-600 sm:hidden">PRIVATE PATHWAYS FOR</p>
      <div className="chain-ticker-inner">
        <span className="hidden shrink-0 font-mono text-[8px] tracking-[0.14em] text-zinc-600 sm:block">PRIVATE PATHWAYS FOR</span>
        <div className="chain-ticker-window">
          <div className="chain-ticker-track">
            <div className="chain-ticker-group">{NetworkLogos()}</div>
            <div className="chain-ticker-group" aria-hidden="true">{NetworkLogos()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}