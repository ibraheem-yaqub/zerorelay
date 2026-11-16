import Link from "next/link";
import type { CSSProperties } from "react";
import {
  ArrowUpRight,
  Fingerprint,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";
import ChainTelemetry from "@/components/ChainTelemetry";
import CoinStrip from "@/components/CoinStrip";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import LocalStatusStack from "@/components/LocalStatusStack";
import Marquee from "@/components/Marquee";
import { BrandCoin } from "@/components/HeroCoins";
import Navbar from "@/components/Navbar";
import CoinDisc from "@/components/coins/CoinDisc";
import PointerGloss from "@/components/coins/PointerGloss";
import { COIN_CAPTION, type CoinKind } from "@/lib/coin-types";
import RelayRail from "@/components/motion/RelayRail";
import ScrollEffects from "@/components/motion/ScrollEffects";
import ScrollReveal from "@/components/ScrollReveal";
import SiteFooter from "@/components/SiteFooter";

/** Coins that rain into a stack behind the final CTA (bottom of the stack first). */
const RAIN: CoinKind[] = ["eth", "usdg", "stock", "swap", "launch"];

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
    <main className="home relative min-h-screen overflow-x-clip bg-[#1B170D] text-[#f7fbe2]">
      <PointerGloss />
      <ScrollEffects />
      <RelayRail />
      <div className="grain" aria-hidden="true" />
      <Navbar />
      <Hero />
      <ChainTelemetry variant="feature" />
      <Marquee />
      <HowItWorks />
      <CoinStrip />
      <LocalStatusStack />

      <section id="security" data-band="ink" className="band band-ink relative scroll-mt-24 px-5 py-24 sm:px-8 sm:py-32">
        <div className="pointer-events-none absolute -left-40 top-1/3 h-[28rem] w-[28rem] rounded-full bg-[#C6F700]/[0.07] blur-[110px]" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-6xl gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          <ScrollReveal className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow text-[#C6F700]">SECURITY / 05</p>
            <h2 data-words className="display-lg mt-5 text-[#f7fbe2]">
              Quiet by design.
              <br />
              <span className="paint-hl paint-hl-block mt-2 font-serif font-normal italic tracking-[-0.02em]">Clear about the limits.</span>
            </h2>
            <p className="mt-7 max-w-md text-base leading-7 text-[#f7fbe2]/70">
              ZeroRelay is presented as an execution-routing interface, not a live service. No protection rate or inclusion latency is represented as measured performance.
            </p>
            <Link href="/dashboard" data-magnetic className="btn-lime group mt-9 inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm font-semibold">
              Inspect a local payload <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </ScrollReveal>

          <ScrollReveal className="grid gap-4">
            {protections.map(({ icon: Icon, title, detail }, index) => (
              <article key={title} className="network-card tilt-card stagger-item group relative flex gap-5 rounded-3xl p-6 sm:gap-6 sm:p-7">
                <span className="network-card-icon flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl" aria-hidden="true">
                  <Icon size={18} strokeWidth={1.6} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-xl font-semibold tracking-[-0.03em] text-[#f7fbe2] sm:text-2xl">{title}</h3>
                    <span className="pt-1.5 font-mono text-[11px] text-[#f7fbe2]/60">0{index + 1}</span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-[#f7fbe2]/70">{detail}</p>
                </div>
              </article>
            ))}
          </ScrollReveal>
        </div>
      </section>

      <section id="terminal" data-band="lime" className="band band-lime cta-panel relative isolate scroll-mt-24 overflow-hidden px-5 py-24 text-[#1B170D] sm:px-8 sm:py-32">
        <ScrollReveal className="relative">
          <div className="hero-light-grid pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
          <div className="relative mx-auto flex max-w-6xl flex-col gap-12 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p id="docs" className="eyebrow scroll-mt-24 text-[#1B170D]/75">LOCAL COMPILER / 06</p>
              <h2 data-words className="display-xl mt-5">
                Inspect the payload <span className="whitespace-nowrap font-serif font-normal italic tracking-[-0.02em]">before integration.</span>
              </h2>
              <p className="mt-6 max-w-lg text-base leading-7 text-[#1B170D]/75">Build a Robinhood Chain intent envelope without signing or sending it.</p>
              <div className="relative mt-9 inline-flex">
                <div className="coin-rain" aria-hidden="true">
                  {RAIN.map((kind, i) => (
                    <span key={kind} className="rain-drop" style={{ "--i": i } as CSSProperties}>
                      <span className="rain-coin" style={{ "--size": "var(--rain-size)", "--rz": `${(i % 2 ? 1 : -1) * (6 + i * 3)}deg` } as CSSProperties}>
                        <CoinDisc kind={kind} />
                      </span>
                    </span>
                  ))}
                </div>
                <Link href="/dashboard" data-magnetic className="btn-ink group relative z-10 inline-flex h-12 items-center gap-2 rounded-full px-6 text-sm font-semibold">
                  Open execution terminal <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </div>
              <p className="coin-caption mt-6 text-[#1B170D]/75">{COIN_CAPTION}</p>
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
