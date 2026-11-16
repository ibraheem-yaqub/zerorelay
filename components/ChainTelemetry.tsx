import { Activity, Clock3, Fuel, ShieldCheck } from "lucide-react";
import ChainMark from "@/components/ChainMark";
import ScrollReveal from "@/components/ScrollReveal";
import { ROBINHOOD_CHAIN } from "@/lib/robinhood-chain";

const metrics = [
  {
    label: "NETWORK ARCHITECTURE",
    value: "Arbitrum Orbit",
    detail: "Robinhood Chain target stack",
    icon: Activity,
    tone: "text-[#C6F700]",
  },
  {
    label: "LATENCY TARGET",
    value: "~81ms",
    detail: "Design target · not measured live",
    target: true,
    icon: Clock3,
    tone: "text-[#d6ff1a]",
  },
  {
    label: "NATIVE GAS",
    value: "ETH",
    detail: "Native asset · no abstraction connected",
    icon: Fuel,
    tone: "text-[#e7d99a]",
  },
  {
    label: "MEV SHIELD",
    value: "99.9%",
    detail: "Illustrative target · not independently measured",
    target: true,
    icon: ShieldCheck,
    tone: "text-[#C6F700]/70",
  },
];

type ChainTelemetryProps = {
  /** "feature" is the home-page ink band; "default" is the dashboard strip. */
  variant?: "default" | "feature";
};

export default function ChainTelemetry({ variant = "default" }: ChainTelemetryProps) {
  if (variant === "feature") return <FeatureTelemetry />;

  return (
    <section id="network" aria-labelledby="telemetry-title" className="relative scroll-mt-24 px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-7 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="font-mono text-[9px] tracking-[0.2em] text-[#C6F700]/70">NETWORK PROFILE / 01</p>
            <h2 id="telemetry-title" className="mt-3 flex items-center gap-3 text-2xl font-medium tracking-[-0.05em] text-zinc-100 sm:text-3xl">
              <ChainMark chain="robinhood" className="h-7 w-7" />
              Robinhood Chain L2
            </h2>
          </div>
          <span className="w-fit rounded-full border border-zinc-700/50 bg-zinc-900/80 px-3 py-1.5 font-mono text-[9px] text-zinc-400">
            MAINNET CONFIGURATION · NOT CONNECTED
          </span>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <article
                key={metric.label}
                className="telemetry-card group relative overflow-hidden rounded-3xl border border-zinc-800/70 bg-zinc-900/40 p-5 shadow-[0_0_50px_rgba(0,0,0,0.32)] backdrop-blur-2xl transition duration-300 hover:-translate-y-1 hover:border-zinc-700"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute -right-7 -top-8 h-24 w-24 rounded-full bg-[#C6F700]/[0.045] blur-2xl transition group-hover:bg-[#C6F700]/[0.12]" />
                <div className="relative flex items-center justify-between">
                  <span className="font-mono text-[8px] tracking-[0.14em] text-zinc-600">{metric.label}</span>
                  <Icon size={15} className={metric.tone} strokeWidth={1.6} />
                </div>
                <p className={`relative mt-7 font-mono tracking-tight text-zinc-100 ${metric.value === "Arbitrum Orbit" ? "text-lg" : "text-2xl"}`}>
                  {metric.value}
                </p>
                <p className="relative mt-2 text-[10px] leading-5 text-zinc-500">{metric.detail}</p>
                <div className="relative mt-5 flex items-center justify-between border-t border-white/[0.06] pt-3 font-mono text-[8px] text-zinc-600">
                  <span>{ROBINHOOD_CHAIN.chainIdHex}</span>
                  <span>PREVIEW DATA</span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FeatureTelemetry() {
  return (
    <section id="network" data-band="ink" aria-labelledby="telemetry-title" className="band band-ink relative scroll-mt-24">
      <div className="network-band relative isolate overflow-hidden px-5 py-24 sm:px-8 sm:py-32">
        <div className="network-band-grid pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
        <div className="mx-auto max-w-6xl">
          <ScrollReveal className="mb-12 flex flex-col justify-between gap-6 sm:mb-14 md:flex-row md:items-end">
            <div>
              <p className="eyebrow text-[#C6F700]">NETWORK PROFILE / 01</p>
              <h2 id="telemetry-title" data-words className="display-xl mt-5 flex items-center gap-4 text-[#f7fbe2]">
                <ChainMark chain="robinhood" className="h-10 w-10 shrink-0 sm:h-12 sm:w-12" />
                Robinhood Chain L2
              </h2>
            </div>
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#C6F700]/20 bg-[#C6F700]/[0.06] px-3.5 py-2 font-mono text-[10px] tracking-[0.08em] text-[#f7fbe2]/75">
              <span className="status-dot-coral" aria-hidden="true" />
              MAINNET CONFIGURATION · NOT CONNECTED
            </span>
          </ScrollReveal>

          <ScrollReveal className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((metric) => {
              const Icon = metric.icon;
              const isTarget = "target" in metric && metric.target;
              return (
                <article key={metric.label} className="network-card tilt-card stagger-item group relative flex flex-col overflow-hidden rounded-3xl p-6 sm:p-7">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] tracking-[0.16em] text-[#f7fbe2]/70">{metric.label}</span>
                    <span className="network-card-icon flex h-9 w-9 items-center justify-center rounded-xl">
                      <Icon size={16} strokeWidth={1.7} />
                    </span>
                  </div>
                  <p className={`mt-10 font-semibold tracking-[-0.045em] text-[#f7fbe2] ${metric.value === "Arbitrum Orbit" ? "text-[2rem] leading-[1.05]" : "text-5xl"}`}>
                    {metric.value}
                  </p>
                  {isTarget ? (
                    <p className="network-target mb-8 mt-4 w-fit rounded-lg px-2.5 py-1.5 text-[11px] leading-4">{metric.detail}</p>
                  ) : (
                    <p className="mb-8 mt-4 text-[13px] leading-5 text-[#f7fbe2]/70">{metric.detail}</p>
                  )}
                  <div className="mt-auto flex items-center justify-between border-t border-[#f7fbe2]/[0.08] pt-4 font-mono text-[10px] tracking-[0.08em] text-[#f7fbe2]/60">
                    <span data-scramble>{ROBINHOOD_CHAIN.chainIdHex}</span>
                    <span>PREVIEW DATA</span>
                  </div>
                </article>
              );
            })}
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
