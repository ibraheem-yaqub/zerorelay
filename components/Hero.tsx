"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, Check, CircleAlert, Search, ShieldCheck } from "lucide-react";
import { ADDRESS_PATTERN } from "@/lib/robinhood-chain";
import ChainMark from "@/components/ChainMark";
import ChainStreamCanvas from "@/components/ChainStreamCanvas";

export default function Hero() {
  const [address, setAddress] = useState("");
  const [result, setResult] = useState<"idle" | "valid" | "invalid">("idle");

  function inspectAddress(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setResult(ADDRESS_PATTERN.test(address.trim()) ? "valid" : "invalid");
  }

  return (
    <section className="relative isolate overflow-hidden px-5 pb-14 pt-20 text-center sm:px-8 sm:pb-16 sm:pt-24 lg:pt-28">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="hero-mesh absolute inset-0" />
        <ChainStreamCanvas className="hero-stream-canvas absolute inset-0 h-full w-full opacity-70" />
      </div>
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="hero-copy mx-auto flex max-w-5xl flex-col items-center">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-zinc-700/60 bg-zinc-900/75 px-3 py-1.5 font-mono text-[9px] tracking-[0.12em] text-zinc-300 backdrop-blur-xl sm:text-[10px]">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute h-full w-full animate-ping rounded-full bg-[#C6F700]/40" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-[#C6F700] shadow-[0_0_9px_rgba(198,247,0,0.75)]" />
            </span>
            ROBINHOOD CHAIN MAINNET <span className="text-zinc-700">/</span> CHAIN ID 0x1237
            <ChainMark chain="robinhood" className="ml-1 h-4 w-4" />
          </div>

          <h1 className="max-w-5xl text-[clamp(3rem,8vw,6.4rem)] font-medium leading-[0.98] tracking-[-0.075em] text-zinc-50">
            Protecting every swap on
            <br className="hidden sm:block" /> <span className="font-serif font-normal italic tracking-[-0.055em] text-zinc-200">Robinhood Chain.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base sm:leading-8">
            A private execution layer for swaps, token launches, and tokenized assets. Shape a transaction intent before it reaches a signer.
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-2.5">
            <span className="inline-flex items-center gap-2 rounded-full border border-zinc-700/50 bg-zinc-900/80 px-3 py-1.5 text-[10px] text-zinc-300 sm:text-xs">
              <ShieldCheck size={13} className="text-[#C6F700]" />
              Designed to reduce public-mempool exposure
            </span>
            <span className="font-mono text-[9px] text-zinc-600">LOCAL PREVIEW · RPC NOT CONNECTED</span>
          </div>

          <form onSubmit={inspectAddress} className="mt-8 w-full max-w-2xl rounded-2xl border border-zinc-700/70 bg-black/70 p-2 text-left shadow-[0_20px_70px_rgba(0,0,0,0.42)] backdrop-blur-xl">
            <label htmlFor="route-address" className="sr-only">Robinhood Chain wallet or contract address</label>
            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="flex min-w-0 flex-1 items-center gap-3 px-3">
                <Search size={16} className="shrink-0 text-[#C6F700]/70" />
                <input
                  id="route-address"
                  autoComplete="off"
                  spellCheck={false}
                  value={address}
                  onChange={(event) => {
                    setAddress(event.target.value);
                    setResult("idle");
                  }}
                  placeholder="Paste a wallet or contract address"
                  className="h-11 min-w-0 flex-1 bg-transparent font-mono text-[11px] text-zinc-200 outline-none placeholder:font-sans placeholder:text-xs placeholder:text-zinc-600"
                />
              </div>
              <button type="submit" className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#C6F700] px-5 text-xs font-semibold text-[#1B170D] transition-all duration-300 hover:bg-[#d6ff1a] hover:shadow-[0_0_30px_rgba(198,247,0,0.25)]">
                Inspect route <ArrowRight size={14} />
              </button>
            </div>
            <p aria-live="polite" className={`min-h-4 px-3 pt-1.5 text-[10px] ${result === "invalid" ? "text-rose-300" : result === "valid" ? "text-[#C6F700]" : "text-zinc-600"}`}>
              {result === "invalid" ? (
                <span className="inline-flex items-center gap-1.5"><CircleAlert size={11} /> Enter a valid 20-byte EVM address.</span>
              ) : result === "valid" ? (
                <span className="inline-flex items-center gap-1.5"><Check size={11} /> Address format is valid. On-chain route checks are not connected in this preview.</span>
              ) : "Syntax check only · no wallet connection, RPC lookup, or route simulation"}
            </p>
          </form>

          <div className="mt-6 flex flex-wrap justify-center gap-5">
            <Link href="#terminal" className="inline-flex items-center gap-2 text-xs text-zinc-300 transition hover:text-white">
              Explore private execution <ArrowDown size={13} />
            </Link>
            <Link href="/dashboard" className="inline-flex items-center gap-2 text-xs text-zinc-500 transition hover:text-zinc-200">
              Open terminal <ArrowUpRight size={13} />
            </Link>
          </div>

          <div className="mt-14 grid w-full max-w-3xl grid-cols-3 border-y border-white/[0.07] py-5 text-left sm:mt-16">
            <div className="px-3 sm:px-7">
              <p className="font-mono text-[8px] tracking-[0.16em] text-zinc-600">NETWORK</p>
              <p className="mt-2 text-xs text-zinc-200">Robinhood Chain</p>
            </div>
            <div className="border-x border-white/[0.07] px-3 sm:px-7">
              <p className="font-mono text-[8px] tracking-[0.16em] text-zinc-600">CHAIN ID</p>
              <p className="mt-2 font-mono text-xs text-[#C6F700]">4663 · 0x1237</p>
            </div>
            <div className="px-3 sm:px-7">
              <p className="font-mono text-[8px] tracking-[0.16em] text-zinc-600">NATIVE GAS</p>
              <p className="mt-2 text-xs text-zinc-200">ETH</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
