import { CSSProperties } from "react";
import { Check, CircleDashed, Gauge } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { ROBINHOOD_CHAIN } from "@/lib/robinhood-chain";

const CARDS = [
  {
    tone: "lime",
    tag: "LOCAL",
    title: "Runs in your browser today",
    icon: Check,
    items: [
      "Address syntax check for 20-byte EVM addresses",
      "Payload compiler for a JSON-RPC envelope preview",
      `Chain profile: ${ROBINHOOD_CHAIN.name} · ${ROBINHOOD_CHAIN.chainId} · ${ROBINHOOD_CHAIN.chainIdHex}`,
    ],
  },
  {
    tone: "ink",
    tag: "NOT CONNECTED",
    title: "Not connected yet",
    icon: CircleDashed,
    items: ["Private RPC endpoint", "Builder / sequencer access", "Wallet signing and broadcast", "Live network telemetry"],
  },
  {
    tone: "cream",
    tag: "DESIGN TARGET",
    title: "Targets, not measurements",
    icon: Gauge,
    items: ["~81ms inclusion latency: design target, not measured", "99.9% MEV shield: illustrative, not independently measured"],
  },
] as const;

/** White band: three cards that stack on top of each other as you scroll (desktop). */
export default function LocalStatusStack() {
  return (
    <section id="status" data-band="white" className="band band-white relative scroll-mt-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <ScrollReveal className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow text-[#4f6400]">STATUS / 04</p>
          <h2 className="display-lg mt-5">
            What&apos;s local.{" "}
            <span className="paint-hl font-serif font-normal italic tracking-[-0.02em]">What&apos;s not connected yet.</span>
          </h2>
          <p className="mt-7 max-w-md text-base leading-7 text-[#1B170D]/70">
            Everything on this site is a local preview. Here is exactly where the line sits.
          </p>
        </ScrollReveal>

        <ol className="stack-cards grid gap-6">
          {CARDS.map((card, i) => {
            const Icon = card.icon;
            return (
              <li key={card.title} className={`stack-card stack-card-${card.tone} tilt-card rounded-[2rem] p-7 sm:p-9`} style={{ "--i": i } as CSSProperties}>
                <div className="flex items-center justify-between gap-4">
                  <span className={`stack-tag stack-tag-${card.tone}`}>{card.tag}</span>
                  <span className="stack-num font-mono text-[11px]">0{i + 1} / 03</span>
                </div>
                <h3 className="mt-10 flex items-center gap-3 text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">
                  <Icon size={26} strokeWidth={1.8} aria-hidden="true" className="shrink-0" />
                  {card.title}
                </h3>
                <ul className="mt-6 grid gap-3 text-[15px] leading-6">
                  {card.items.map((item) => (
                    <li key={item} className="stack-item flex gap-3">
                      <span className="stack-bullet mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
