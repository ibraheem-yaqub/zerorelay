import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import ChainTelemetry from "@/components/ChainTelemetry";
import { BrandCoin } from "@/components/HeroCoins";
import PayloadTerminal from "@/components/PayloadTerminal";
import SiteFooter from "@/components/SiteFooter";

export default function DashboardPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505] text-zinc-100">
      <Navbar />

      <section className="hero-light relative isolate overflow-hidden rounded-b-[2.5rem] px-5 pb-16 pt-10 text-[#1B170D] sm:px-8 sm:pb-20 sm:pt-12">
        <div className="hero-light-grid pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl">
          <Link href="/" className="hero-rise inline-flex items-center gap-2 text-xs text-[#1B170D]/55 transition hover:text-[#1B170D]" style={{ "--d": "0ms" } as React.CSSProperties}>
            <ArrowLeft size={13} /> Back to overview
          </Link>
          <div className="mt-10 flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <span className="hero-rise inline-flex items-center gap-2 rounded-full border border-[#1B170D]/10 bg-white/70 px-3 py-1.5 font-mono text-[10px] tracking-[0.12em] text-[#1B170D]/75 backdrop-blur-xl" style={{ "--d": "80ms" } as React.CSSProperties}>
                <span className="h-1.5 w-1.5 rounded-full bg-[#8fb300]" /> ROBINHOOD CHAIN · LOCAL PREVIEW
              </span>
              <h1 className="mt-6 text-5xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
                <span className="hero-word" style={{ "--d": "160ms" } as React.CSSProperties}>Private </span>
                <span className="hero-word" style={{ "--d": "230ms" } as React.CSSProperties}>execution </span>
                <span className="hero-highlight font-serif font-normal italic tracking-[-0.02em]" style={{ "--d": "380ms" } as React.CSSProperties}>
                  <span className="hero-word" style={{ "--d": "300ms" } as React.CSSProperties}>workspace.</span>
                </span>
              </h1>
              <p className="hero-rise mt-6 max-w-2xl text-base leading-7 text-[#1B170D]/65 sm:text-lg sm:leading-8" style={{ "--d": "420ms" } as React.CSSProperties}>
                Compile a Robinhood Chain swap intent and inspect its JSON-RPC envelope. No wallet signs, no RPC is queried, and nothing is broadcast.
              </p>
              <Link href="/#network" className="btn-ghost hero-rise group mt-8 inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm font-medium" style={{ "--d": "500ms" } as React.CSSProperties}>
                Network profile <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
            <div className="hero-rise relative hidden h-52 w-72 shrink-0 md:block" style={{ "--d": "600ms" } as React.CSSProperties} aria-hidden="true">
              <BrandCoin tone="lime" size={140} spin="flip" delay={1} className="absolute left-0 top-2" />
              <BrandCoin tone="ink" size={104} delay={3} className="absolute bottom-0 right-4" />
            </div>
          </div>
        </div>
      </section>

      <ChainTelemetry variant="feature" />

      <PayloadTerminal />

      <SiteFooter lines={["NO SIGNING · NO RPC SUBMISSION · NO LIVE ROUTING", "ZERO RELAY · ROBINHOOD CHAIN · 0x1237"]} />
    </main>
  );
}
