"use client";

import { CSSProperties, useEffect, useRef } from "react";
import { Fingerprint, ShieldCheck, Waypoints } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const routeStages = [
  { index: "01", name: "Transaction intent", detail: "Swap · launch · tokenized asset", icon: Fingerprint },
  { index: "02", name: "Private route", detail: "Policy and payload compilation", icon: Waypoints },
  { index: "03", name: "Execution layer", detail: "Builder / sequencer integration", icon: ShieldCheck },
];

/**
 * Home "Execution model" section. A lime relay line draws from stage to stage as
 * the section scrolls through the viewport, lighting each stage when it arrives.
 * Illustrates a concept only — nothing here is connected.
 */
export default function ExecutionRoute() {
  const routeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const route = routeRef.current;
    if (!route) return;
    const stages = Array.from(route.querySelectorAll<HTMLElement>("[data-stage]"));
    const track = route.querySelector<HTMLElement>(".exec-track");
    const nodes = Array.from(route.querySelectorAll<HTMLElement>(".exec-node"));

    // Run the track from the first node's centre to the last (horizontal on desktop,
    // vertical on mobile), whatever the card heights turn out to be.
    const measure = () => {
      if (!track || nodes.length < 2) return;
      const origin = route.getBoundingClientRect();
      const centre = (el: HTMLElement) => {
        const r = el.getBoundingClientRect();
        return { x: r.left - origin.left + r.width / 2, y: r.top - origin.top + r.height / 2 };
      };
      const a = centre(nodes[0]);
      const b = centre(nodes[nodes.length - 1]);
      const horizontal = Math.abs(b.x - a.x) > Math.abs(b.y - a.y);
      const length = horizontal ? b.x - a.x : b.y - a.y;
      track.dataset.axis = horizontal ? "x" : "y";
      track.style.left = `${a.x}px`;
      track.style.top = `${a.y}px`;
      track.style.width = horizontal ? `${length}px` : "";
      track.style.height = horizontal ? "" : `${length}px`;
      route.style.setProperty("--len", `${length}px`);
    };
    measure();
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(route);

    const apply = (progress: number) => {
      route.style.setProperty("--p", progress.toFixed(4));
      stages.forEach((stage, i) => {
        stage.toggleAttribute("data-lit", progress >= i / (stages.length - 1) - 0.001);
      });
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      apply(1);
      return () => resizeObserver.disconnect();
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const { top, height } = route.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the route's top reaches 85% of the viewport, 1 when its bottom reaches 55%.
      const start = vh * 0.85;
      const end = vh * 0.55 - height;
      apply(Math.min(1, Math.max(0, (start - top) / (start - end))));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    // Only listen while the section is near the viewport.
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
    io.observe(route);
    update();

    return () => {
      io.disconnect();
      resizeObserver.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section id="execution" className="relative scroll-mt-24 px-5 py-24 sm:px-8 sm:py-32">
      <div className="relative z-10 mx-auto max-w-6xl">
        <ScrollReveal className="mb-16 flex flex-col justify-between gap-6 sm:mb-20 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-[10px] tracking-[0.22em] text-[#C6F700]">EXECUTION MODEL / 02</p>
            <h2 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.02] tracking-[-0.05em] text-[#f7fbe2] sm:text-5xl lg:text-6xl">
              Move value without <span className="whitespace-nowrap font-serif font-normal italic tracking-[-0.02em] text-[#C6F700]">exposing intent.</span>
            </h2>
          </div>
          <span className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-[#C6F700]/20 bg-[#C6F700]/[0.06] px-3.5 py-2 font-mono text-[10px] tracking-[0.08em] text-[#f7fbe2]/75">
            <span className="h-1.5 w-1.5 rounded-full bg-[#f7fbe2]/35" aria-hidden="true" />
            CONCEPTUAL FLOW · NOT CONNECTED
          </span>
        </ScrollReveal>

        <div ref={routeRef} className="exec-route relative" style={{ "--p": 0 } as CSSProperties}>
          <div className="exec-track" aria-hidden="true">
            <span className="exec-track-fill" />
            <span className="exec-track-head" />
          </div>

          <ol className="relative grid gap-10 md:grid-cols-3 md:gap-6">
            {routeStages.map((stage) => {
              const Icon = stage.icon;
              return (
                <li key={stage.index} data-stage className="exec-stage group relative pl-20 md:pl-0">
                  <span className="exec-node absolute left-0 top-0 flex h-14 w-14 items-center justify-center rounded-2xl md:relative" aria-hidden="true">
                    <Icon size={20} strokeWidth={1.7} />
                  </span>
                  <div className="exec-card mt-0 rounded-3xl p-6 md:mt-8 md:p-7">
                    <p className="font-mono text-[10px] tracking-[0.16em] text-[#f7fbe2]/45">{stage.index} / ROUTE</p>
                    <h3 className="mt-5 text-2xl font-semibold tracking-[-0.04em] text-[#f7fbe2]">{stage.name}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#f7fbe2]/55">{stage.detail}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        <p className="mt-10 max-w-2xl font-mono text-[10px] leading-5 text-[#f7fbe2]/45">
          Private inclusion depends on a configured Robinhood Chain RPC and builder/sequencer support. This site does not submit transactions.
        </p>
      </div>
    </section>
  );
}
