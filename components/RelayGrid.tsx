import { ArrowUpRight, ShieldCheck, Timer } from "lucide-react";
import ChainMark, { type ChainId } from "@/components/ChainMark";

const relays = [
  {
    index: "PATH 01",
    name: "Solana",
    route: "Jito Block 0 Bundle Pipeline",
    speed: "< 80ms",
    tag: "Bundle pathway",
    chains: ["solana"] as ChainId[],
    markChain: "solana" as ChainId,
  },
  {
    index: "PATH 02",
    name: "Robinhood Chain",
    route: "Private EVM Execution",
    speed: "< 80ms",
    tag: "Private execution",
    chains: ["robinhood"] as ChainId[],
    markChain: "robinhood" as ChainId,
  },
  {
    index: "PATH 03",
    name: "Arbitrum / Base / Ethereum",
    route: "Flashbots Private RPC",
    speed: "< 80ms",
    tag: "Builder aware",
    chains: ["arbitrum", "base", "ethereum"] as ChainId[],
    markChain: "ethereum" as ChainId,
  },
];

export default function RelayGrid() {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {relays.map((relay) => (
        <article
          key={relay.name}
          className="protocol-card group relative min-h-[242px] overflow-hidden rounded-2xl border border-white/[0.085] bg-[#0b0d0f] p-5 transition duration-300 hover:-translate-y-1 hover:border-cyan-100/20 hover:bg-[#0e1113] sm:p-6"
        >
          <div className="protocol-watermark pointer-events-none absolute -right-5 -top-5 select-none opacity-[0.045] transition duration-500 group-hover:opacity-[0.1]">
            <ChainMark chain={relay.markChain} className="h-36 w-36" />
          </div>
          <div className="relative flex items-center justify-between">
            <span className="font-mono text-[8px] tracking-[0.16em] text-zinc-600">{relay.index}</span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200/10 bg-emerald-100/[0.035] px-2 py-1 font-mono text-[8px] tracking-wide text-emerald-100/70">
              <span className="h-1 w-1 rounded-full bg-emerald-200/80" /> ROUTE PREVIEW
            </span>
          </div>
          <div className="relative mt-8 flex items-center gap-3">
            <span className="chain-icon-frame flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.035]">
              {relay.chains.length > 1 ? (
                <span className="flex items-center -space-x-1.5">
                  {relay.chains.map((chain) => <ChainMark key={chain} chain={chain} className="h-5 w-5" />)}
                </span>
              ) : (
                <ChainMark chain={relay.chains[0]} className="h-6 w-6" />
              )}
            </span>
            <div className="min-w-0">
              <h3 className="text-sm font-medium tracking-tight text-zinc-100">{relay.name}</h3>
              <p className="mt-1 text-[10px] text-zinc-500">{relay.route}</p>
            </div>
          </div>
          <div className="relative mt-6 grid grid-cols-2 border-t border-white/[0.07] pt-4">
            <div>
              <p className="flex items-center gap-1.5 font-mono text-[8px] text-zinc-600"><Timer size={10} /> TARGET INCLUSION</p>
              <p className="mt-1.5 font-mono text-xs text-zinc-200">{relay.speed}</p>
            </div>
            <div className="border-l border-white/[0.07] pl-4">
              <p className="flex items-center gap-1.5 font-mono text-[8px] text-zinc-600"><ShieldCheck size={10} /> SECURITY MODE</p>
              <p className="mt-1.5 text-[10px] text-zinc-300">{relay.tag}</p>
            </div>
          </div>
          <div className="absolute bottom-5 right-5 flex h-7 w-7 items-center justify-center rounded-lg border border-white/[0.08] text-zinc-600 transition group-hover:border-cyan-100/20 group-hover:text-cyan-100">
            <ArrowUpRight size={13} />
          </div>
        </article>
      ))}
    </div>
  );
}
