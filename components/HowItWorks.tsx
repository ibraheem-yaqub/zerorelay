"use client";

import { CSSProperties, Fragment, useEffect, useRef } from "react";
import { Fingerprint, LockKeyhole, Waypoints } from "lucide-react";
import CoinDisc from "@/components/coins/CoinDisc";
import ScrollReveal from "@/components/ScrollReveal";
import { ROBINHOOD_CHAIN } from "@/lib/robinhood-chain";

const STAGES = [
  { index: "01", verb: "Shape", name: "Shape the intent", detail: "A swap, launch or tokenized-asset intent, validated in the browser.", icon: Fingerprint },
  { index: "02", verb: "Seal", name: "Seal the payload", detail: "Compiled into a JSON-RPC envelope. Nothing is signed or sent.", icon: LockKeyhole },
  { index: "03", verb: "Route", name: "Route privately", detail: "Design target: builder / sequencer integration. RPC not connected.", icon: Waypoints },
];

/** Same shape the dashboard compiler produces, trimmed and ordered by stage. */
const PREVIEW = {
  swapIntent: {
    router: "<DEX router address>",
    amountIn: { unit: ROBINHOOD_CHAIN.nativeCurrency.symbol },
    calldata: "<ABI-encoded swap calldata>",
  },
  previewOnly: true,
  chain: { name: ROBINHOOD_CHAIN.name, chainId: ROBINHOOD_CHAIN.chainId, chainIdHex: ROBINHOOD_CHAIN.chainIdHex },
  transport: { endpoint: null, submissionEnabled: false },
};
const JSON_LINES = JSON.stringify(PREVIEW, null, 2).split("\n");

/** Status rows tick to READY at these progress points; RPC never does. */
const STATUS = [
  { label: "Intent shaped", note: "local", at: 0.04 },
  { label: "Payload sealed", note: "local", at: 0.5 },
  { label: "Route planned", note: "design target", at: 0.98 },
];

/** Tiny JSON syntax colouring: keys, strings, literals. */
function JsonLine({ text }: { text: string }) {
  const parts: JSX.Element[] = [];
  const re = /("(?:[^"\\]|\\.)*")(\s*:)?|\b(true|false|null)\b|(-?\d+(?:\.\d+)?)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push(<Fragment key={k++}>{text.slice(last, m.index)}</Fragment>);
    if (m[1] && m[2]) parts.push(<span key={k++} className="json-key">{m[1]}</span>, <Fragment key={k++}>{m[2]}</Fragment>);
    else if (m[1]) parts.push(<span key={k++} className="json-str">{m[1]}</span>);
    else parts.push(<span key={k++} className="json-lit">{m[0]}</span>);
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(<Fragment key={k++}>{text.slice(last)}</Fragment>);
  return <>{parts}</>;
}

/**
 * Home "How it works": Shape → Seal → Route. One progress value (0–1) drives the
 * drawn track, the coin riding it, the lit stages, the payload typing in and the
 * status rows. Conceptual only — nothing here is connected.
 */
export default function HowItWorks() {
  const rootRef = useRef<HTMLElement>(null);
  const routeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const route = routeRef.current;
    if (!root || !route) return;
    const stages = Array.from(root.querySelectorAll<HTMLElement>("[data-stage]"));
    const track = route.querySelector<HTMLElement>(".how-track");
    const nodes = Array.from(route.querySelectorAll<HTMLElement>(".how-node"));
    const lines = Array.from(root.querySelectorAll<HTMLElement>("[data-line]"));
    const rows = Array.from(root.querySelectorAll<HTMLElement>("[data-status]"));

    // Track runs between the first and last node centres (vertical here at every size).
    const measure = () => {
      if (!track || nodes.length < 2) return;
      const origin = route.getBoundingClientRect();
      const centre = (el: HTMLElement) => {
        const r = el.getBoundingClientRect();
        return { x: r.left - origin.left + r.width / 2, y: r.top - origin.top + r.height / 2 };
      };
      const a = centre(nodes[0]);
      const b = centre(nodes[nodes.length - 1]);
      track.style.left = `${a.x}px`;
      track.style.top = `${a.y}px`;
      track.style.height = `${b.y - a.y}px`;
      route.style.setProperty("--len", `${b.y - a.y}px`);
    };
    measure();
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(route);

    // Only touch the DOM when something actually changed (this runs per scroll frame).
    let lastP = -1;
    const lastF: number[] = [];
    const apply = (progress: number) => {
      const p = Math.min(1, Math.max(0, progress));
      if (Math.abs(p - lastP) < 0.0005) return;
      lastP = p;
      root.style.setProperty("--p", p.toFixed(4));
      stages.forEach((stage, i) => stage.toggleAttribute("data-lit", p >= Math.min(0.98, i / (stages.length - 1)) - 0.001));
      // Lines type in over the first 92% of progress.
      const typed = (p / 0.92) * lines.length;
      lines.forEach((line, i) => {
        const f = Math.round(Math.min(1, Math.max(0, typed - i)) * 1000) / 1000;
        if (lastF[i] === f) return;
        lastF[i] = f;
        line.style.setProperty("--f", `${f}`);
        line.toggleAttribute("data-on", f > 0);
      });
      rows.forEach((row, i) => row.toggleAttribute("data-ready", p >= STATUS[i].at));
    };
    // The scroll-effects layer drives progress with `how:progress` events when it pins this section.
    const onExternal = (event: Event) => apply((event as CustomEvent<number>).detail);
    root.addEventListener("how:progress", onExternal);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      apply(1);
      return () => {
        resizeObserver.disconnect();
        root.removeEventListener("how:progress", onExternal);
      };
    }

    // Default driver: progress as the route scrolls through the viewport.
    // (Desktop pins and scrubs this instead — see the scroll-effects layer.)
    let frame = 0;
    const update = () => {
      frame = 0;
      if (root.dataset.driver === "pinned") return;
      const { top, height } = route.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.85;
      const end = vh * 0.4 - height;
      apply((start - top) / (start - end));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll, { passive: true });
        onScroll();
      } else {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
      }
    }, { rootMargin: "20% 0px" });
    io.observe(root);
    update();

    return () => {
      root.removeEventListener("how:progress", onExternal);
      io.disconnect();
      resizeObserver.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section
      ref={rootRef}
      id="execution"
      data-band="white"
      className="band band-white how relative scroll-mt-24"
      style={{ "--p": 0 } as CSSProperties}
    >
      <div className="how-pin mx-auto flex max-w-6xl flex-col justify-center px-5 py-24 sm:px-8 sm:py-32 lg:min-h-screen lg:py-20">
        <ScrollReveal className="mb-12 flex flex-col justify-between gap-6 sm:mb-16 md:flex-row md:items-end">
          <div>
            <p className="eyebrow text-[#4f6400]">HOW IT WORKS / 02</p>
            <h2 data-words className="display-xl mt-5 max-w-4xl">
              Move value without{" "}
              <span className="paint-hl font-serif font-normal italic tracking-[-0.02em]">exposing intent.</span>
            </h2>
          </div>
          <span className="status-pill shrink-0">
            <span className="status-dot-coral" aria-hidden="true" />
            CONCEPTUAL FLOW · NOT CONNECTED
          </span>
        </ScrollReveal>

        <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <div ref={routeRef} className="how-route relative">
            <div className="how-track" aria-hidden="true">
              <span className="how-track-fill" />
              <span className="how-rider">
                <span className="how-rider-coin" style={{ "--size": "44px" } as CSSProperties}>
                  <CoinDisc kind="swap" />
                </span>
                <span className="how-seal" />
              </span>
            </div>

            <ol className="relative grid gap-5">
              {STAGES.map((stage) => {
                const Icon = stage.icon;
                return (
                  <li key={stage.index} data-stage className="how-stage relative pl-20">
                    <span className="how-node absolute left-0 top-1/2 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-2xl" aria-hidden="true">
                      <Icon size={20} strokeWidth={1.7} />
                    </span>
                    <div className="how-card tilt-card rounded-3xl p-6 sm:p-7">
                      <p className="eyebrow text-[#1B170D]/65">
                        {stage.index} / {stage.verb.toUpperCase()}
                      </p>
                      <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] sm:text-[1.75rem]">{stage.name}</h3>
                      <p className="mt-2 text-sm leading-6 text-[#1B170D]/70">{stage.detail}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="how-terminal overflow-hidden rounded-3xl">
            <div className="flex items-center justify-between border-b border-[#f7fbe2]/10 px-5 py-4">
              <p className="font-mono text-[11px] text-[#f7fbe2]/80">robinhood-private.preview.json</p>
              <span className="font-mono text-[10px] tracking-[0.12em] text-[#C6F700]">LOCAL ONLY</span>
            </div>
            <pre className="how-json overflow-x-auto px-5 py-5 font-mono text-[11px] leading-[1.8] sm:text-[12px]" aria-label="Example payload preview">
              {JSON_LINES.map((line, i) => (
                <span key={i} data-line className="json-line">
                  <JsonLine text={line} />
                </span>
              ))}
            </pre>
            <ul className="border-t border-[#f7fbe2]/10 px-5 py-4 font-mono text-[11px]">
              {STATUS.map((row) => (
                <li key={row.label} data-status className="how-status flex items-center justify-between gap-4 py-1.5">
                  <span className="text-[#f7fbe2]/80">
                    {row.label} <span className="text-[#f7fbe2]/60">· {row.note}</span>
                  </span>
                  <span className="how-status-value">
                    <span className="how-status-waiting">WAITING</span>
                    <span className="how-status-ready">READY</span>
                  </span>
                </li>
              ))}
              <li className="flex items-center justify-between gap-4 py-1.5">
                <span className="text-[#f7fbe2]/80">RPC</span>
                <span className="font-semibold text-[#e2512f]">NOT CONNECTED</span>
              </li>
            </ul>
            <p className="border-t border-[#f7fbe2]/10 px-5 py-3 font-mono text-[10px] tracking-[0.06em] text-[#f7fbe2]/65">
              PREVIEW ONLY · NOTHING IS SIGNED OR SENT
            </p>
          </div>
        </div>

        <p className="mt-10 max-w-2xl font-mono text-[11px] leading-5 text-[#1B170D]/65">
          Private inclusion depends on a configured Robinhood Chain RPC and builder/sequencer support. This site does not submit transactions.
        </p>
      </div>
    </section>
  );
}
