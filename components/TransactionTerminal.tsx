"use client";

import { FormEvent, useState } from "react";
import { Check, Copy, Play, RotateCcw } from "lucide-react";

type BundlePreview = {
  network: string;
  target: string;
  amount: string;
  slippage: string;
  generatedAt: string;
};

const initialPreview: BundlePreview = {
  network: "ethereum",
  target: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
  amount: "1.25",
  slippage: "0.5",
  generatedAt: "Awaiting local preview",
};

export default function TransactionTerminal() {
  const [network, setNetwork] = useState("ethereum");
  const [target, setTarget] = useState(initialPreview.target);
  const [amount, setAmount] = useState(initialPreview.amount);
  const [slippage, setSlippage] = useState(initialPreview.slippage);
  const [preview, setPreview] = useState<BundlePreview | null>(null);
  const [copied, setCopied] = useState(false);

  const payload = {
    mode: "simulation",
    relay: "private-builder",
    network: preview?.network ?? network,
    bundle: {
      type: "swap",
      recipient: preview?.target ?? target,
      amount: preview?.amount ?? amount,
      maxSlippagePercent: preview?.slippage ?? slippage,
      privacy: { publicMempool: false, revertProtection: true },
    },
    generatedAt: preview?.generatedAt ?? "Not generated",
  };

  function generatePreview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPreview({
      network,
      target,
      amount,
      slippage,
      generatedAt: new Date().toISOString(),
    });
    setCopied(false);
  }

  async function copyPayload() {
    try {
      await navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
      setCopied(true);
    } catch (error) {
      console.error("Could not copy the bundle preview.", error);
    }
  }

  return (
    <div className="grid gap-4 xl:grid-cols-[0.85fr_1.15fr]">
      <form onSubmit={generatePreview} className="glass rounded-3xl p-5 sm:p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="font-mono text-[9px] tracking-[0.2em] text-cyan-300/80">01 / CONFIGURE</p>
            <h2 className="mt-2 text-lg font-medium tracking-tight text-zinc-100">Transaction inspector</h2>
            <p className="mt-1 text-xs leading-5 text-zinc-500">Build a private swap payload preview.</p>
          </div>
          <span className="rounded-full border border-amber-900/50 bg-amber-950/30 px-2.5 py-1 font-mono text-[9px] text-amber-300">
            SIMULATION
          </span>
        </div>

        <div className="mt-7 space-y-4">
          <label className="block">
            <span className="mb-2 block font-mono text-[10px] text-zinc-500">NETWORK</span>
            <select
              value={network}
              onChange={(event) => setNetwork(event.target.value)}
              className="h-11 w-full rounded-xl border border-zinc-800 bg-black/40 px-3 text-xs text-zinc-200 outline-none focus:border-zinc-600"
            >
              <option value="ethereum">Ethereum Mainnet</option>
              <option value="arbitrum">Arbitrum One</option>
              <option value="base">Base</option>
              <option value="solana">Solana</option>
            </select>
          </label>
          <label className="block">
            <span className="mb-2 block font-mono text-[10px] text-zinc-500">RECIPIENT ADDRESS</span>
            <input
              required
              minLength={8}
              value={target}
              onChange={(event) => setTarget(event.target.value)}
              placeholder="0x..."
              className="h-11 w-full rounded-xl border border-zinc-800 bg-black/40 px-3 font-mono text-[11px] text-zinc-200 outline-none placeholder:text-zinc-700 focus:border-zinc-600"
            />
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className="block">
              <span className="mb-2 block font-mono text-[10px] text-zinc-500">AMOUNT (ETH)</span>
              <input
                type="number"
                min="0"
                step="any"
                required
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                className="h-11 w-full rounded-xl border border-zinc-800 bg-black/40 px-3 font-mono text-xs text-zinc-200 outline-none focus:border-zinc-600"
              />
            </label>
            <label className="block">
              <span className="mb-2 block font-mono text-[10px] text-zinc-500">MAX SLIPPAGE (%)</span>
              <input
                type="number"
                min="0"
                max="100"
                step="0.1"
                required
                value={slippage}
                onChange={(event) => setSlippage(event.target.value)}
                className="h-11 w-full rounded-xl border border-zinc-800 bg-black/40 px-3 font-mono text-xs text-zinc-200 outline-none focus:border-zinc-600"
              />
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-zinc-100 text-xs font-semibold text-zinc-950 transition hover:bg-white"
        >
          <Play size={13} /> Generate preview
        </button>
        <div className="mt-4 flex gap-2 rounded-xl border border-zinc-800/70 bg-black/20 p-3 text-[10px] leading-4 text-zinc-500">
          <RotateCcw size={13} className="mt-0.5 shrink-0 text-zinc-400" />
          Preview only. This interface does not sign, broadcast, or route transactions.
        </div>
      </form>

      <section className="glass overflow-hidden rounded-3xl" aria-labelledby="payload-heading">
        <div className="flex items-center justify-between border-b border-zinc-800/80 px-5 py-4">
          <div>
            <p className="font-mono text-[9px] tracking-[0.2em] text-cyan-300/80">02 / PAYLOAD</p>
            <h2 id="payload-heading" className="mt-1 text-xs font-medium text-zinc-200">Private builder bundle</h2>
          </div>
          <button
            type="button"
            onClick={copyPayload}
            className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-800 px-2.5 py-1.5 font-mono text-[9px] text-zinc-400 transition hover:border-zinc-600 hover:text-zinc-200"
            aria-label="Copy JSON payload"
          >
            {copied ? <Check size={12} /> : <Copy size={12} />}
            {copied ? "COPIED" : "COPY JSON"}
          </button>
        </div>
        <div className="flex items-center justify-between border-b border-zinc-800/60 bg-black/20 px-5 py-2.5 font-mono text-[9px] text-zinc-600">
          <span>bundle.preview.json</span><span>LOCAL · NO BROADCAST</span>
        </div>
        <pre className="min-h-[365px] overflow-x-auto p-5 font-mono text-[11px] leading-[1.9] text-zinc-400">
          <code>{JSON.stringify(payload, null, 2)}</code>
        </pre>
        <div className="border-t border-zinc-800/70 px-5 py-3 font-mono text-[9px] text-zinc-600">
          {preview ? "PREVIEW GENERATED LOCALLY" : "EDIT PARAMETERS TO BUILD A PREVIEW"}
        </div>
      </section>
    </div>
  );
}
