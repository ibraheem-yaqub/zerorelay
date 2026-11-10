import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import ChainTelemetry from "@/components/ChainTelemetry";
import PayloadTerminal from "@/components/PayloadTerminal";
import WaveField from "@/components/WaveField";

export default function DashboardPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505] text-zinc-100">
      <div className="site-atmosphere pointer-events-none absolute inset-x-0 top-0 h-[1000px]" aria-hidden="true" />
      <div className="ambient-grid pointer-events-none absolute inset-x-0 top-0 h-[980px] opacity-35" aria-hidden="true" />
      <Navbar />

      <section className="relative overflow-hidden px-5 py-12 sm:px-8 sm:py-16">
        <WaveField className="pointer-events-none absolute inset-0 h-72 opacity-55" />
        <div className="relative z-10 mx-auto max-w-6xl">
          <Link href="/" className="inline-flex items-center gap-2 text-[10px] text-zinc-500 transition hover:text-zinc-200">
            <ArrowLeft size={12} /> Back to overview
          </Link>
          <div className="mt-8 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#C6F700]/20 bg-[#1B170D]/75 px-3 py-1.5 font-mono text-[9px] text-[#d6ff1a]/80">
                <span className="h-1.5 w-1.5 rounded-full bg-[#C6F700] shadow-[0_0_8px_rgba(198,247,0,0.6)]" /> ROBINHOOD CHAIN · LOCAL PREVIEW
              </span>
              <h1 className="mt-5 text-4xl font-medium tracking-[-0.065em] text-zinc-100 sm:text-5xl">
                Private execution <span className="font-serif font-normal italic text-zinc-400">workspace.</span>
              </h1>
              <p className="mt-3 max-w-2xl text-xs leading-6 text-zinc-500 sm:text-sm">
                Compile a Robinhood Chain swap intent and inspect its JSON-RPC envelope. No wallet signs, no RPC is queried, and nothing is broadcast.
              </p>
            </div>
            <Link href="/#network" className="inline-flex w-fit items-center gap-2 rounded-full border border-[#C6F700]/15 bg-[#1B170D]/60 px-4 py-2.5 text-[10px] text-zinc-300 transition hover:border-[#C6F700]/40 hover:text-[#C6F700]">
              Network profile <ArrowUpRight size={12} />
            </Link>
          </div>
        </div>
      </section>

      <ChainTelemetry />

      <section className="px-5 pb-20 sm:px-8 sm:pb-24">
        <div className="mx-auto max-w-6xl">
          <PayloadTerminal />
        </div>
      </section>

      <footer className="border-t border-white/[0.06] px-5 py-5 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-2 font-mono text-[8px] tracking-[0.08em] text-zinc-700 sm:flex-row">
          <span>ZERO RELAY · ROBINHOOD CHAIN · 0x1237</span>
          <span>NO SIGNING · NO RPC SUBMISSION · NO LIVE ROUTING</span>
        </div>
      </footer>
    </main>
  );
}
