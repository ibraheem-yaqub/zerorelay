import Link from "next/link";
import {
  ArrowUpRight,
  Fingerprint,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";
import ChainTelemetry from "@/components/ChainTelemetry";
import ExecutionRoute from "@/components/ExecutionRoute";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import ScrollReveal from "@/components/ScrollReveal";

const protections = [
  {
    icon: Fingerprint,
    title: "Keep signing in your wallet",
    detail: "The preview never asks for a seed phrase, signature, or wallet connection.",
  },
  {
    icon: LockKeyhole,
    title: "Private routing needs private infrastructure",
    detail: "A JSON-RPC envelope alone cannot ensure a transaction bypasses the public mempool.",
  },
  {
    icon: ShieldCheck,
    title: "Know what is and is not connected",
    detail: "This build validates inputs locally. RPC routing, builder access, and telemetry are not connected.",
  },
];

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505] text-zinc-100">
      <div className="site-atmosphere pointer-events-none absolute inset-x-0 top-0 h-[1000px]" aria-hidden="true" />
      <div className="ambient-grid pointer-events-none absolute inset-x-0 top-0 h-[980px] opacity-40" aria-hidden="true" />
      <Navbar />
      <Hero />
      <ChainTelemetry variant="feature" />

      <ExecutionRoute />

      <section id="security" className="relative scroll-mt-24 px-5 py-24 sm:px-8 sm:py-32">
        <div className="pointer-events-none absolute -left-40 top-1/3 h-[28rem] w-[28rem] rounded-full bg-[#C6F700]/[0.07] blur-[110px]" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-6xl gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          <ScrollReveal className="lg:sticky lg:top-28 lg:self-start">
            <p className="font-mono text-[10px] tracking-[0.22em] text-[#C6F700]">SECURITY / 03</p>
            <h2 className="mt-5 text-4xl font-semibold leading-[1.04] tracking-[-0.05em] text-[#f7fbe2] sm:text-5xl lg:text-6xl">
              Quiet by design.
              <br />
              <span className="hero-highlight highlight-block reveal-highlight mt-2 font-serif font-normal italic tracking-[-0.02em]">Clear about the limits.</span>
            </h2>
            <p className="mt-7 max-w-md text-base leading-7 text-[#f7fbe2]/60">
              ZeroRelay is presented as an execution-routing interface, not a live service. No protection rate or inclusion latency is represented as measured performance.
            </p>
            <Link href="/dashboard" className="btn-lime group mt-9 inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm font-semibold">
              Inspect a local payload <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </ScrollReveal>

          <ScrollReveal className="grid gap-4">
            {protections.map(({ icon: Icon, title, detail }, index) => (
              <article key={title} className="network-card stagger-item group relative flex gap-5 rounded-3xl p-6 sm:gap-6 sm:p-7">
                <span className="network-card-icon flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl" aria-hidden="true">
                  <Icon size={18} strokeWidth={1.6} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-xl font-semibold tracking-[-0.03em] text-[#f7fbe2] sm:text-2xl">{title}</h3>
                    <span className="pt-1.5 font-mono text-[10px] text-[#f7fbe2]/35">0{index + 1}</span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-[#f7fbe2]/55">{detail}</p>
                </div>
              </article>
            ))}
          </ScrollReveal>
        </div>
      </section>

      <section id="terminal" className="relative scroll-mt-24 px-5 pb-14 sm:px-8 sm:pb-20">
        <ScrollReveal className="route-panel mx-auto flex max-w-6xl flex-col justify-between gap-6 rounded-3xl border border-[#C6F700]/15 p-6 shadow-[0_0_44px_rgba(198,247,0,0.035)] backdrop-blur-2xl sm:flex-row sm:items-center sm:p-8">
          <div>
            <p id="docs" className="scroll-mt-24 font-mono text-[8px] tracking-[0.2em] text-zinc-600">LOCAL COMPILER / 04</p>
            <h2 className="mt-2 text-xl font-medium tracking-tight text-zinc-100">Inspect the payload before integration.</h2>
            <p className="mt-1 text-xs leading-5 text-zinc-500">Build a Robinhood Chain intent envelope without signing or sending it.</p>
          </div>
          <Link href="/dashboard" className="inline-flex h-10 shrink-0 items-center gap-2 rounded-full bg-[#C6F700] px-4 text-xs font-semibold text-[#1B170D] transition hover:bg-[#d6ff1a] hover:shadow-[0_0_30px_rgba(198,247,0,0.22)]">
            Open execution terminal <ArrowUpRight size={13} />
          </Link>
        </ScrollReveal>
      </section>

      <footer className="border-t border-white/[0.06] px-5 py-5 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-2 font-mono text-[8px] tracking-[0.08em] text-zinc-700 sm:flex-row">
          <span>© 2026 ZERO RELAY · ROBINHOOD CHAIN · 0x1237</span>
          <span>LOCAL PREVIEW · NO SIGNING · NO RPC SUBMISSION</span>
        </div>
      </footer>
    </main>
  );
}
