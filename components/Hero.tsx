"use client";

import Link from "next/link";
import { CSSProperties, FormEvent, useState } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, Check, CircleAlert, Search, ShieldCheck } from "lucide-react";
import { ADDRESS_PATTERN } from "@/lib/robinhood-chain";
import ChainMark from "@/components/ChainMark";
import HeroCoins from "@/components/HeroCoins";
import { COIN_CAPTION } from "@/lib/coin-types";

const LEAD_WORDS = ["Protecting", "every", "swap", "on"];
const ACCENT_WORDS = ["Robinhood", "Chain."];

/** Staggered entrance delay for hero elements (ms). */
const rise = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export default function Hero() {
  const [address, setAddress] = useState("");
  const [result, setResult] = useState<"idle" | "valid" | "invalid">("idle");

  function inspectAddress(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setResult(ADDRESS_PATTERN.test(address.trim()) ? "valid" : "invalid");
  }

  return (
    <section className="hero-light relative isolate overflow-hidden rounded-b-[2.5rem] px-5 pb-16 pt-14 text-[#1B170D] sm:px-8 sm:pb-20 sm:pt-20 lg:min-h-[calc(100svh-68px)] lg:pb-24 lg:pt-24">
      <div className="hero-light-grid pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <div className="relative z-10 max-w-2xl">
          <div className="hero-rise mb-8 inline-flex items-center gap-2 rounded-full border border-[#1B170D]/10 bg-white/70 px-3 py-1.5 font-mono text-[9px] tracking-[0.14em] text-[#1B170D]/75 shadow-[0_1px_0_rgba(255,255,255,0.8)_inset,0_8px_24px_-12px_rgba(27,23,13,0.25)] backdrop-blur-xl sm:text-[10px]" style={rise(0)}>
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute h-full w-full animate-ping rounded-full bg-[#9fc600]/50" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-[#8fb300]" />
            </span>
            ROBINHOOD CHAIN MAINNET <span className="text-[#1B170D]/25">/</span> CHAIN ID 0x1237
            <ChainMark chain="robinhood" className="ml-1 h-4 w-4" />
          </div>

          <h1 className="text-[clamp(2.9rem,7.2vw,5.9rem)] font-semibold leading-[0.95] tracking-[-0.055em]">
            {LEAD_WORDS.map((word, i) => (
              <span key={word} className="hero-word" style={rise(120 + i * 70)}>
                {word}{" "}
              </span>
            ))}
            <br className="hidden sm:block" />
            <span className="hero-highlight font-serif font-normal italic tracking-[-0.03em]" style={rise(560)}>
              {ACCENT_WORDS.map((word, i) => (
                <span key={word} className="hero-word" style={rise(440 + i * 80)}>
                  {word}
                  {i < ACCENT_WORDS.length - 1 ? " " : ""}
                </span>
              ))}
            </span>
          </h1>

          <p className="hero-rise mt-7 max-w-xl text-base leading-7 text-[#1B170D]/65 sm:text-lg sm:leading-8" style={rise(700)}>
            A private execution layer for swaps, token launches, and tokenized assets. Shape a transaction intent before it reaches a signer.
          </p>

          <div className="hero-rise mt-6 flex flex-wrap items-center gap-3" style={rise(780)}>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#1B170D]/10 bg-white/70 px-3 py-1.5 text-[11px] text-[#1B170D]/80 backdrop-blur sm:text-xs">
              <ShieldCheck size={13} className="text-[#6f8c00]" />
              Designed to reduce public-mempool exposure
            </span>
            <span className="font-mono text-[9px] tracking-[0.08em] text-[#1B170D]/45">LOCAL PREVIEW · RPC NOT CONNECTED</span>
          </div>

          <form
            onSubmit={inspectAddress}
            className="hero-rise hero-form mt-9 w-full max-w-xl rounded-2xl border border-[#1B170D]/10 bg-white/80 p-2 text-left backdrop-blur-xl"
            style={rise(860)}
          >
            <label htmlFor="route-address" className="sr-only">Robinhood Chain wallet or contract address</label>
            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="flex min-w-0 flex-1 items-center gap-3 px-3">
                <Search size={16} className="shrink-0 text-[#1B170D]/40" />
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
                  className="h-12 min-w-0 flex-1 bg-transparent font-mono text-[12px] text-[#1B170D] outline-none placeholder:font-sans placeholder:text-sm placeholder:text-[#1B170D]/40"
                />
              </div>
              <button type="submit" className="btn-ink group inline-flex h-12 items-center justify-center gap-2 rounded-xl px-5 text-sm font-semibold">
                Inspect route <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </button>
            </div>
            <p aria-live="polite" className={`min-h-4 px-3 pt-2 text-[11px] ${result === "invalid" ? "text-rose-600" : result === "valid" ? "text-[#4f6400]" : "text-[#1B170D]/45"}`}>
              {result === "invalid" ? (
                <span className="inline-flex items-center gap-1.5"><CircleAlert size={12} /> Enter a valid 20-byte EVM address.</span>
              ) : result === "valid" ? (
                <span className="inline-flex items-center gap-1.5"><Check size={12} /> Address format is valid. On-chain route checks are not connected in this preview.</span>
              ) : "Syntax check only · no wallet connection, RPC lookup, or route simulation"}
            </p>
          </form>

          <div className="hero-rise mt-7 flex flex-wrap items-center gap-3" style={rise(940)}>
            <Link href="#terminal" className="btn-lime group inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm font-semibold">
              Explore private execution <ArrowDown size={14} className="transition-transform duration-300 group-hover:translate-y-0.5" />
            </Link>
            <Link href="/dashboard" className="btn-ghost group inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm font-medium">
              Open terminal <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="hero-rise mt-12 grid w-full max-w-xl grid-cols-3 border-y border-[#1B170D]/10 py-5 sm:mt-14" style={rise(1020)}>
            <div className="pr-3 sm:pr-6">
              <p className="font-mono text-[9px] tracking-[0.16em] text-[#1B170D]/45">NETWORK</p>
              <p className="mt-2 text-sm font-medium">Robinhood Chain</p>
            </div>
            <div className="border-x border-[#1B170D]/10 px-3 sm:px-6">
              <p className="font-mono text-[9px] tracking-[0.16em] text-[#1B170D]/45">CHAIN ID</p>
              <p className="mt-2 whitespace-nowrap font-mono text-[11px] sm:text-sm"><span className="hero-chip-lime">4663 · 0x1237</span></p>
            </div>
            <div className="pl-3 sm:pl-6">
              <p className="font-mono text-[9px] tracking-[0.16em] text-[#1B170D]/45">NATIVE GAS</p>
              <p className="mt-2 text-sm font-medium">ETH</p>
            </div>
          </div>
        </div>

        <HeroCoins className="relative -mx-5 mt-6 h-[360px] sm:-mx-8 sm:h-[440px] lg:absolute lg:inset-y-[-6rem] lg:left-[46%] lg:right-[-4rem] lg:mx-0 lg:mt-0 lg:h-auto" />
        <p className="coin-caption relative z-10 -mt-2 text-center text-[#1B170D]/70 lg:absolute lg:bottom-[-3.5rem] lg:right-0 lg:mt-0 lg:text-right">
          {COIN_CAPTION}
        </p>
      </div>
    </section>
  );
}
