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
import { BrandCoin } from "@/components/HeroCoins";
import Navbar from "@/components/Navbar";
import ScrollReveal from "@/components/ScrollReveal";
import SiteFooter from "@/components/SiteFooter";

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
      <Navbar />
      <Hero />
      <ChainTelemetry variant="feature" />

      <ExecutionRoute />

      <section id="security" className="relative scroll-mt-24 px-5 pb-24 pt-12 sm:px-8 sm:pb-32 sm:pt-16">
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

      <section id="terminal" className="relative scroll-mt-24 px-3 pb-6 sm:px-5 sm:pb-8">
        <ScrollReveal className="cta-panel relative isolate mx-auto max-w-[88rem] overflow-hidden rounded-[2.5rem] px-6 py-16 text-[#1B170D] sm:px-12 sm:py-20 lg:px-20 lg:py-24">
          <div className="hero-light-grid pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
          <div className="relative mx-auto flex max-w-6xl flex-col gap-12 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p id="docs" className="scroll-mt-24 font-mono text-[10px] tracking-[0.22em] text-[#1B170D]/60">LOCAL COMPILER / 04</p>
              <h2 className="mt-5 text-4xl font-semibold leading-[1.02] tracking-[-0.05em] sm:text-5xl lg:text-6xl">
                Inspect the payload <span className="whitespace-nowrap font-serif font-normal italic tracking-[-0.02em]">before integration.</span>
              </h2>
              <p className="mt-6 max-w-lg text-base leading-7 text-[#1B170D]/65">Build a Robinhood Chain intent envelope without signing or sending it.</p>
              <Link href="/dashboard" className="btn-ink group mt-9 inline-flex h-12 items-center gap-2 rounded-full px-6 text-sm font-semibold">
                Open execution terminal <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
            <div className="cta-coins relative mx-auto h-56 w-64 shrink-0 sm:h-64 sm:w-80 lg:mx-0" aria-hidden="true">
              <BrandCoin tone="ink" size={150} delay={0} className="absolute left-2 top-4 sm:left-4" />
              <BrandCoin tone="lime" size={120} spin="flip" delay={2} className="absolute bottom-0 right-2 sm:right-6" />
            </div>
          </div>
        </ScrollReveal>
      </section>

      <SiteFooter lines={["LOCAL PREVIEW · NO SIGNING · NO RPC SUBMISSION", "© 2026 ZERO RELAY · ROBINHOOD CHAIN · 0x1237"]} />
    </main>
  );
}
