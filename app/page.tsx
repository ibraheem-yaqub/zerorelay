import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Fingerprint,
  LockKeyhole,
  ShieldCheck,
  Waypoints,
} from "lucide-react";
import ChainTelemetry from "@/components/ChainTelemetry";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import ScrollReveal from "@/components/ScrollReveal";
import WaveField from "@/components/WaveField";

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

const routeStages = [
  { index: "01", name: "Transaction intent", detail: "Swap · launch · tokenized asset" },
  { index: "02", name: "Private route", detail: "Policy and payload compilation" },
  { index: "03", name: "Execution layer", detail: "Builder / sequencer integration" },
];

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505] text-zinc-100">
      <div className="site-atmosphere pointer-events-none absolute inset-x-0 top-0 h-[1000px]" aria-hidden="true" />
      <div className="ambient-grid pointer-events-none absolute inset-x-0 top-0 h-[980px] opacity-40" aria-hidden="true" />
      <Navbar />
      <Hero />
      <ChainTelemetry />

      <section id="execution" className="relative scroll-mt-24 border-t border-white/[0.06] px-5 py-16 sm:px-8 sm:py-20">
        <WaveField className="pointer-events-none absolute inset-x-0 top-0 h-72 opacity-40" />
        <div className="relative z-10 mx-auto max-w-6xl">
          <ScrollReveal className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="font-mono text-[9px] tracking-[0.2em] text-[#C6F700]/70">EXECUTION MODEL / 02</p>
              <h2 className="mt-3 max-w-2xl text-3xl font-medium leading-tight tracking-[-0.06em] text-zinc-100 sm:text-4xl">
                Move value without exposing intent.
              </h2>
            </div>
            <span className="w-fit rounded-full border border-[#C6F700]/15 bg-[#1B170D]/75 px-3 py-1.5 font-mono text-[8px] tracking-wide text-[#d6ff1a]/80">
              CONCEPTUAL FLOW · NOT CONNECTED
            </span>
          </ScrollReveal>

          <div className="route-panel grid overflow-hidden rounded-3xl border border-zinc-800/70 shadow-[0_0_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl md:grid-cols-3">
            {routeStages.map((stage, index) => (
              <article key={stage.index} className="group relative min-h-44 border-b border-zinc-800/70 p-6 last:border-b-0 md:border-b-0 md:border-r md:p-7 md:last:border-r-0">
                {index < routeStages.length - 1 ? (
                  <ArrowRight className="absolute right-5 top-6 hidden text-zinc-700 md:block" size={14} aria-hidden="true" />
                ) : null}
                <p className="font-mono text-[9px] tracking-[0.16em] text-zinc-600">{stage.index} / ROUTE</p>
                <div className="mt-7 flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#C6F700]/20 bg-[#1B170D]/70 text-[#C6F700] transition group-hover:border-[#C6F700]/50 group-hover:shadow-[0_0_24px_rgba(198,247,0,0.16)]">
                    {index === 0 ? <Fingerprint size={16} /> : index === 1 ? <Waypoints size={16} /> : <ShieldCheck size={16} />}
                  </span>
                  <h3 className="text-sm font-medium text-zinc-200">{stage.name}</h3>
                </div>
                <p className="mt-3 pl-12 text-[10px] leading-5 text-zinc-500">{stage.detail}</p>
              </article>
            ))}
          </div>
          <p className="mt-4 font-mono text-[8px] leading-5 text-zinc-600">
            Private inclusion depends on a configured Robinhood Chain RPC and builder/sequencer support. This site does not submit transactions.
          </p>
        </div>
      </section>

      <section id="security" className="relative scroll-mt-24 border-t border-white/[0.06] px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal className="overflow-hidden rounded-3xl border border-zinc-800/70 bg-zinc-900/35 shadow-[0_0_50px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
            <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
              <div className="relative overflow-hidden border-b border-zinc-800/70 p-6 sm:p-9 lg:border-b-0 lg:border-r">
                <div className="pointer-events-none absolute -left-12 top-1/4 h-48 w-48 rounded-full bg-[#C6F700]/[0.08] blur-[70px]" />
                <div className="relative">
                  <p className="font-mono text-[9px] tracking-[0.2em] text-[#C6F700]/70">SECURITY / 03</p>
                  <h2 className="mt-4 text-3xl font-medium leading-tight tracking-[-0.06em] text-zinc-100">
                    Quiet by design.<br /><span className="font-serif font-normal italic text-zinc-400">Clear about the limits.</span>
                  </h2>
                  <p className="mt-4 max-w-md text-xs leading-6 text-zinc-500">
                    ZeroRelay is presented as an execution-routing interface, not a live service. No protection rate or inclusion latency is represented as measured performance.
                  </p>
                  <Link href="/dashboard" className="mt-6 inline-flex items-center gap-2 text-xs text-zinc-200 transition hover:text-[#C6F700]">
                    Inspect a local payload <ArrowUpRight size={13} />
                  </Link>
                </div>
              </div>
              <div className="grid sm:grid-cols-3">
                {protections.map(({ icon: Icon, title, detail }, index) => (
                  <article key={title} className="border-b border-zinc-800/70 p-5 last:border-b-0 sm:border-b-0 sm:border-r sm:p-6 sm:last:border-r-0">
                    <div className="flex items-center justify-between">
                      <Icon size={16} className="text-zinc-200" strokeWidth={1.5} />
                      <span className="font-mono text-[8px] text-zinc-700">0{index + 1}</span>
                    </div>
                    <h3 className="mt-8 text-xs font-medium text-zinc-200">{title}</h3>
                    <p className="mt-2 text-[10px] leading-5 text-zinc-500">{detail}</p>
                  </article>
                ))}
              </div>
            </div>
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
