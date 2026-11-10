import { Activity, Clock3, Fuel, ShieldCheck } from "lucide-react";
import ChainMark from "@/components/ChainMark";
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
    icon: ShieldCheck,
    tone: "text-[#C6F700]/70",
  },
];

export default function ChainTelemetry() {
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
