"use client";

import { CSSProperties, useEffect, useRef, useState } from "react";
import CoinDisc from "@/components/coins/CoinDisc";
import type { CoinKind } from "@/lib/coin-types";
import { SLASH } from "@/lib/hero-geometry";

/** Coin type the rider shows while each section is under it. */
const SECTION_KIND: Record<string, CoinKind> = {
  network: "eth",
  execution: "swap",
  assets: "stock",
  status: "bridged",
  security: "asset",
  terminal: "launch",
};

const JOG = 72; // vertical span of each slash between sections, px

type Sample = { l: number; x: number; y: number };

/**
 * One lime relay line down the page gutter, linking every band below the hero.
 * It draws itself as you scroll; a coin rides the drawn head as the progress
 * indicator and changes type per section. At each section boundary the line
 * jogs at the logo's 15° slash. Desktop (≥1280px) only, never with reduced
 * motion. Decorative.
 */
export default function RelayRail() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [kind, setKind] = useState<CoinKind>("eth");
  const kindRef = useRef<CoinKind>("eth");

  useEffect(() => {
    const root = rootRef.current;
    const main = root?.parentElement;
    if (!root || !main) return;
    const desktop = window.matchMedia("(min-width: 1280px)");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const svg = root.querySelector("svg")!;
    const paths = Array.from(root.querySelectorAll<SVGPathElement>("path[data-draw]"));
    const track = root.querySelector<SVGPathElement>("path.rail-track")!;
    const rider = root.querySelector<HTMLElement>(".rail-rider")!;
    let samples: Sample[] = [];
    let total = 0;
    let nodes: { el: SVGCircleElement; l: number }[] = [];
    let bands: { id: string; top: number; bottom: number }[] = [];
    let start = 0;
    let end = 0;
    let frame = 0;
    let active = false;

    const layout = () => {
      active = desktop.matches;
      root.classList.toggle("is-active", active);
      if (!active) return;
      const sections = Array.from(main.querySelectorAll<HTMLElement>(":scope > [data-band]"));
      if (sections.length < 2) return;
      const height = main.scrollHeight;
      svg.setAttribute("height", `${height}`);
      svg.setAttribute("viewBox", `0 0 ${main.clientWidth} ${height}`);
      bands = sections.map((s) => ({ id: s.id, top: s.offsetTop, bottom: s.offsetTop + s.offsetHeight }));

      // Sit in the gutter, 42px left of the content column (max-w-6xl, ≥32px padding).
      const contentLeft = Math.max(32, (main.clientWidth - 1152) / 2);
      let x = Math.max(20, contentLeft - 42);
      let dir = 1;
      const dx = SLASH * JOG;
      start = bands[0].top + 70;
      end = bands[bands.length - 1].bottom - 90;
      let d = `M ${x} ${start}`;
      const nodePts: { x: number; y: number }[] = [];
      bands.slice(1).forEach((band) => {
        d += ` L ${x} ${band.top - JOG / 2} L ${x + dir * dx} ${band.top + JOG / 2}`;
        nodePts.push({ x: x + (dir * dx) / 2, y: band.top });
        x += dir * dx;
        dir *= -1;
      });
      d += ` L ${x} ${end}`;
      [track, ...paths].forEach((p) => p.setAttribute("d", d));
      total = paths[0].getTotalLength();
      paths.forEach((p) => {
        p.style.strokeDasharray = `${total}`;
      });

      samples = [];
      for (let l = 0; l <= total; l += 12) {
        const pt = paths[0].getPointAtLength(l);
        samples.push({ l, x: pt.x, y: pt.y });
      }
      const last = paths[0].getPointAtLength(total);
      samples.push({ l: total, x: last.x, y: last.y });

      const group = root.querySelector("g.rail-nodes")!;
      group.replaceChildren();
      nodes = nodePts.map((pt) => {
        const el = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        el.setAttribute("cx", `${pt.x}`);
        el.setAttribute("cy", `${pt.y}`);
        el.setAttribute("r", "5");
        group.appendChild(el);
        const near = samples.reduce((a, b) => (Math.abs(b.y - pt.y) < Math.abs(a.y - pt.y) ? b : a));
        return { el, l: near.l };
      });
      update();
    };

    const update = () => {
      frame = 0;
      if (!active || !samples.length) return;
      const headY = window.scrollY + window.innerHeight * 0.55 - (main.getBoundingClientRect().top + window.scrollY);
      // Samples are monotonic in y: binary search the head.
      let lo = 0;
      let hi = samples.length - 1;
      while (lo < hi) {
        const mid = (lo + hi) >> 1;
        if (samples[mid].y < headY) lo = mid + 1;
        else hi = mid;
      }
      const s = samples[lo];
      const len = headY <= start ? 0 : s.l;
      paths.forEach((p) => {
        p.style.strokeDashoffset = `${total - len}`;
      });
      nodes.forEach((n) => n.el.classList.toggle("is-lit", len >= n.l));
      rider.style.transform = `translate3d(${s.x}px, ${Math.max(start, Math.min(end, s.y))}px, 0)`;
      root.classList.toggle("has-head", headY > start - 40 && headY < end + 120);

      const band = bands.find((b) => headY >= b.top && headY < b.bottom);
      const next = band ? SECTION_KIND[band.id] : undefined;
      if (next && next !== kindRef.current) {
        kindRef.current = next;
        setKind(next);
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    layout();
    const ro = new ResizeObserver(() => layout());
    ro.observe(main);
    window.addEventListener("scroll", onScroll, { passive: true });
    desktop.addEventListener("change", layout);
    return () => {
      ro.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      desktop.removeEventListener("change", layout);
    };
  }, []);

  return (
    <div ref={rootRef} className="rail" aria-hidden="true">
      <svg width="100%" fill="none">
        <path className="rail-track" />
        <path className="rail-glow" data-draw />
        <path className="rail-under" data-draw />
        <path className="rail-core" data-draw />
        <g className="rail-nodes" />
      </svg>
      <div className="rail-rider">
        <span className="rail-coin" style={{ "--size": "40px" } as CSSProperties}>
          <CoinDisc key={kind} kind={kind} className="rail-coin-flip" />
        </span>
      </div>
    </div>
  );
}
