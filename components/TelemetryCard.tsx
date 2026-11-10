"use client";

import { useEffect, useState } from "react";
import { Activity, ShieldCheck } from "lucide-react";

const bars = [26, 38, 33, 54, 41, 66, 48, 73, 56, 81, 64, 77, 52, 69, 89, 61, 76, 94, 72, 83, 66, 91, 73, 98];

export default function TelemetryCard() {
  const [bundles, setBundles] = useState(2481093);

  useEffect(() => {
    const interval = window.setInterval(() => setBundles((count) => count + 1), 1800);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <section aria-labelledby="telemetry-title" className="rounded-2xl border border-white/[0.075] bg-[#090b0d]">
      <div className="flex items-center justify-between border-b border-white/[0.07] px-4 py-3">
        <div className="flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/[0.09] bg-white/[0.035] text-cyan-100/80">
            <Activity size={13} />
          </span>
          <div>
            <h2 id="telemetry-title" className="text-[10px] font-medium text-zinc-200">Network signals</h2>
            <p className="mt-0.5 font-mono text-[8px] text-zinc-600">ILLUSTRATIVE · NOT LIVE</p>
          </div>
        </div>
        <span className="rounded-full border border-white/[0.08] bg-white/[0.025] px-2 py-1 font-mono text-[8px] text-zinc-500">DEMO FEED</span>
      </div>

      <div className="grid grid-cols-2 gap-2 p-3 sm:p-4">
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.018] p-3">
          <p className="font-mono text-[8px] tracking-[0.08em] text-zinc-600">BUILDER PIPELINE</p>
          <p className="mt-3 flex items-center gap-2 text-[11px] text-zinc-200">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-200/80" /> Operational
          </p>
          <p className="mt-1 font-mono text-[8px] text-zinc-600">SAMPLE STATUS</p>
        </div>
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.018] p-3">
          <p className="font-mono text-[8px] tracking-[0.08em] text-zinc-600">SHIELD SCORE</p>
          <p className="mt-3 flex items-center gap-2 font-mono text-sm text-zinc-100">
            99.8% <ShieldCheck size={13} className="text-cyan-100/70" />
          </p>
          <p className="mt-1 font-mono text-[8px] text-zinc-600">ILLUSTRATIVE ONLY</p>
        </div>
      </div>

      <div className="mx-3 mb-3 rounded-xl border border-white/[0.06] bg-white/[0.018] p-3 sm:mx-4 sm:mb-4">
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="font-mono text-[8px] tracking-[0.08em] text-zinc-600">PRIVATE BUNDLES SUBMITTED</p>
            <p className="mt-1.5 font-mono text-lg tracking-tight text-zinc-100">{bundles.toLocaleString("en-US")}</p>
          </div>
          <p className="pb-1 font-mono text-[8px] text-zinc-600">SAMPLE COUNTER</p>
        </div>
        <div className="mt-3 flex h-8 items-end gap-[3px]" aria-label="Illustrative routing activity chart">
          {bars.map((height, index) => (
            <span
              key={index}
              className="telemetry-bar flex-1 rounded-t-[2px] bg-gradient-to-t from-slate-400/10 to-cyan-100/55"
              style={{ height: `${height}%`, animationDelay: `${index * 45}ms, -${(index % 7) * 0.4}s` }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
