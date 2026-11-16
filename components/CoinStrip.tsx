import { CSSProperties } from "react";
import CoinDisc from "@/components/coins/CoinDisc";
import ScrollReveal from "@/components/ScrollReveal";
import { COIN_CAPTION, COIN_ORDER, COIN_TYPES } from "@/lib/coin-types";

/**
 * Lime band: the eight asset / intent coin types. Each coin flips to show its
 * one-liner on the back (hover on desktop; scroll-driven once the effects layer
 * loads). The written description under each coin is the accessible text — the
 * coins themselves are decorative.
 */
export default function CoinStrip() {
  return (
    <section id="assets" data-band="lime" className="band band-lime coin-strip relative scroll-mt-24 overflow-hidden">
      <div className="coin-strip-pin flex flex-col justify-center py-24 sm:py-32 lg:min-h-screen">
        <ScrollReveal className="mx-auto mb-12 flex w-full max-w-6xl flex-col justify-between gap-6 px-5 sm:mb-16 sm:px-8 md:flex-row md:items-end">
          <div>
            <p className="eyebrow text-[#1B170D]/75">WHAT CAN RIDE THE ROUTE / 03</p>
            <h2 className="display-xl mt-5 max-w-4xl">
              Eight kinds of value.{" "}
              <span className="font-serif font-normal italic tracking-[-0.02em]">One quiet lane.</span>
            </h2>
          </div>
          <p className="coin-caption max-w-[16rem] text-[#1B170D]/75 md:text-right">{COIN_CAPTION}</p>
        </ScrollReveal>

        <div className="coin-strip-viewport">
          <ul className="coin-strip-track flex gap-6 px-5 sm:px-8 lg:gap-10">
            {COIN_ORDER.map((kind, i) => {
              const type = COIN_TYPES[kind];
              return (
                <li key={kind} className="coin-strip-item shrink-0" style={{ "--i": i } as CSSProperties}>
                  <div className="flip-coin" style={{ "--size": "var(--strip-size)" } as CSSProperties} aria-hidden="true">
                    <CoinDisc kind={kind} back="description" />
                  </div>
                  <div className="coin-strip-text mt-6 max-w-[15rem]">
                    <p className="eyebrow text-[#1B170D]/75">
                      {type.group === "asset" ? "ASSET" : "INTENT"} · {type.label}
                    </p>
                    <p className="mt-2 text-sm font-medium leading-6 text-[#1B170D]">{type.description}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
