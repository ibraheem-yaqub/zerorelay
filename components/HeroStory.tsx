"use client";

import { CSSProperties, useEffect, useRef } from "react";
import CoinDisc from "@/components/coins/CoinDisc";
import { COIN_ORDER } from "@/lib/coin-types";
import { slashGeometry, type Point } from "@/lib/hero-geometry";

const PARTICLES = 10;
const CYCLE_GAP = 3.4; // s between coins entering the lane
const LANE_T = 0.4; // where the public lane meets the relay line
const SEQ_T = 0.7; // where the sequencer node sits on the line

/**
 * The hero's looping story, layered on the coin stage after the opening relay
 * moment: a coin drifts through the public lane, coral scanners lock on and
 * tag it READ, it snaps onto the lime relay line, a seal closes with a small
 * burst, the scanners glitch and drop, and it rides the line to the sequencer.
 * Cycles through every coin type. Decorative (the whole stage is aria-hidden).
 * GSAP is loaded lazily, only once the loop is about to start.
 */
export default function HeroStory() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const stage = root?.closest<HTMLElement>(".coin-stage");
    if (!root || !stage) return;

    const actors = Array.from(root.querySelectorAll<HTMLElement>(".story-actor"));
    const scanners = Array.from(root.querySelectorAll<HTMLElement>(".story-scan"));
    const tag = root.querySelector<HTMLElement>(".story-tag")!;
    const lane = root.querySelector<SVGLineElement>(".story-lane line")!;
    const laneLabel = root.querySelector<HTMLElement>(".story-lane-label")!;
    const seq = root.querySelector<HTMLElement>(".story-seq")!;
    const seqPulse = root.querySelector<HTMLElement>(".story-seq-pulse")!;

    const place = (el: HTMLElement, p: Point) => {
      el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0)`;
    };

    // Static furniture: lane, its label and the sequencer node.
    const geometry = () => {
      const { width: w, height: h } = stage.getBoundingClientRect();
      const g = slashGeometry(w, h);
      // Mobile stage is short and has fewer coins: spread the story over more of the line.
      const P = g.at(g.mobile ? 0.3 : LANE_T);
      const S = g.at(g.mobile ? 0.86 : SEQ_T);
      const laneLen = w * (g.mobile ? 0.42 : 0.4);
      const A = { x: P.x - laneLen, y: P.y };
      const B = { x: P.x - (g.mobile ? 46 : 74), y: P.y };
      lane.setAttribute("x1", `${A.x}`);
      lane.setAttribute("y1", `${P.y}`);
      lane.setAttribute("x2", `${P.x}`);
      lane.setAttribute("y2", `${P.y}`);
      place(laneLabel, { x: A.x + 8, y: P.y + 14 });
      place(seq, S);
      return { A, B, P, S, mobile: g.mobile };
    };

    let geo = geometry();
    let reducedStatic = false;

    // Reduced motion: the opening composition already rests the coins on the line,
    // so the story shows only its lane and sequencer node — no travelling coin.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      reducedStatic = true;
      root.classList.add("is-on", "is-static");
      const ro = new ResizeObserver(() => {
        geo = geometry();
      });
      ro.observe(stage);
      return () => ro.disconnect();
    }

    let disposed = false;
    let master: { kill: () => void; pause: () => void; play: () => void; progress: (v?: number) => number } | null = null;
    let visible = true;
    let resizeTimer = 0;
    let build: (() => void) | null = null;

    const start = async () => {
      const { gsap } = await import("gsap");
      if (disposed) return;
      root.classList.add("is-on");

      build = () => {
        const progress = master ? master.progress() : 0;
        master?.kill();
        geo = geometry();
        const { A, B, P, S, mobile } = geo;
        const tl = gsap.timeline({ repeat: -1, paused: !visible });
        gsap.set([...actors, ...scanners, tag], { x: A.x, y: A.y, opacity: 0 });

        actors.forEach((actor, i) => {
          const t0 = i * CYCLE_GAP;
          const seal = actor.querySelector<SVGCircleElement>(".story-seal circle")!;
          const sealSvg = actor.querySelector<SVGSVGElement>(".story-seal")!;
          const bits = Array.from(actor.querySelectorAll<HTMLElement>(".story-particle"));
          const drift = 2.0;
          const lockT = 0.9;
          const C = { x: A.x + (B.x - A.x) * (lockT / drift), y: A.y };

          // 1. drift through the public lane
          tl.call(() => actor.classList.add("is-live"), undefined, t0)
            .set(actor, { x: A.x, y: A.y, opacity: 0, scale: 0.92 }, t0)
            .set(seal, { strokeDashoffset: 1 }, t0)
            .set(sealSvg, { opacity: 0, scale: 1.5 }, t0)
            .to(actor, { opacity: 1, duration: 0.45, ease: "power1.out" }, t0)
            .to(actor, { x: B.x, duration: drift, ease: "none" }, t0);

          // 2. scanners converge, lock and tag READ, then track the coin
          tl.fromTo(
            scanners,
            { x: (k: number) => C.x + (k ? 70 : -80), y: (k: number) => C.y + (k ? 64 : -58), opacity: 0, scale: 1.7, rotation: (k: number) => (k ? 50 : -40) },
            { x: C.x, y: C.y, opacity: 1, scale: 1, rotation: 0, duration: 0.6, ease: "power3.out", stagger: 0.06 },
            t0 + 0.3,
          )
            .set(tag, { x: C.x, y: C.y, opacity: 0, scale: 0.4 }, t0 + 0.3)
            .to(tag, { opacity: 1, scale: 1, duration: 0.25, ease: "back.out(3)" }, t0 + lockT)
            .to([...scanners, tag], { x: B.x, duration: drift - lockT, ease: "none" }, t0 + lockT);

          // 3. snap onto the relay line; the seal closes with a burst
          tl.to(actor, { x: P.x, y: P.y, scale: 1, duration: 0.3, ease: "back.out(2.2)" }, t0 + drift)
            .to(sealSvg, { opacity: 1, scale: 1, duration: 0.45, ease: "power3.out" }, t0 + drift + 0.1)
            .to(seal, { strokeDashoffset: 0, duration: 0.45, ease: "power2.inOut" }, t0 + drift + 0.1);
          bits.forEach((bit, k) => {
            const angle = (k / bits.length) * Math.PI * 2 + i;
            const r = (mobile ? 40 : 58) + (k % 3) * 10;
            tl.fromTo(
              bit,
              { x: 0, y: 0, opacity: 1, scale: 1 },
              { x: Math.cos(angle) * r, y: Math.sin(angle) * r, opacity: 0, scale: 0.2, duration: 0.65, ease: "power2.out" },
              t0 + drift + 0.28,
            );
          });

          // 4. scanners glitch and fall away
          tl.call(() => root.classList.add("is-glitch"), undefined, t0 + drift + 0.12)
            .to([...scanners, tag], { x: "+=7", duration: 0.04, repeat: 5, yoyo: true, ease: "steps(1)" }, t0 + drift + 0.12)
            .call(() => root.classList.remove("is-glitch"), undefined, t0 + drift + 0.4)
            .to(
              [...scanners, tag],
              { y: `+=${mobile ? 90 : 140}`, rotation: (k: number) => [-34, 42, 16][k] ?? 0, opacity: 0, duration: 0.7, ease: "power2.in", stagger: 0.05 },
              t0 + drift + 0.42,
            );

          // 5. ride the line to the sequencer and hand off
          tl.to(actor, { x: S.x, y: S.y, duration: 1.5, ease: "power2.inOut" }, t0 + drift + 0.55)
            .fromTo(seqPulse, { scale: 0.6, opacity: 0.9 }, { scale: 2.4, opacity: 0, duration: 0.9, ease: "power2.out" }, t0 + drift + 2.0)
            .to(actor, { scale: 0.35, opacity: 0, duration: 0.4, ease: "power2.in" }, t0 + drift + 2.0)
            .call(() => actor.classList.remove("is-live"), undefined, t0 + drift + 2.45);
        });

        // Pad so the loop period is exactly coins × gap (the last tail overlaps the first entry).
        tl.set({}, {}, actors.length * CYCLE_GAP);
        tl.progress(progress);
        master = tl;
      };
      build();
    };

    const onRelease = () => void start();
    stage.addEventListener("relay:released", onRelease, { once: true });

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) master?.play();
      else master?.pause();
    });
    io.observe(stage);

    const ro = new ResizeObserver(() => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        if (reducedStatic) return;
        if (build) build();
        else geo = geometry();
      }, 150);
    });
    ro.observe(stage);

    return () => {
      disposed = true;
      stage.removeEventListener("relay:released", onRelease);
      io.disconnect();
      ro.disconnect();
      window.clearTimeout(resizeTimer);
      master?.kill();
    };
  }, []);

  return (
    <div ref={rootRef} className="story">
      <svg className="story-lane" width="100%" height="100%">
        <line />
      </svg>
      <span className="story-lane-label">PUBLIC MEMPOOL · VISIBLE</span>

      <div className="story-seq">
        <span className="story-seq-pulse" />
        <span className="story-seq-dot" />
        <span className="story-seq-label">SEQUENCER</span>
      </div>

      {[0, 1].map((k) => (
        <div key={k} className={`story-scan story-scan-${k}`}>
          <svg viewBox="0 0 100 100" fill="none">
            {k === 0 ? (
              <>
                <circle cx="50" cy="50" r="30" />
                <path d="M50 4v18M50 78v18M4 50h18M78 50h18" />
                <circle cx="50" cy="50" r="2.5" className="story-scan-dot" />
              </>
            ) : (
              <path d="M8 30V8h22M70 8h22v22M92 70v22H70M30 92H8V70" />
            )}
          </svg>
        </div>
      ))}
      <div className="story-tag">
        <span>READ</span>
      </div>

      {COIN_ORDER.map((kind) => (
        <div key={kind} className="story-actor">
          <div className="story-coin" style={{ "--size": "var(--story-size)" } as CSSProperties}>
            <CoinDisc kind={kind} spin="wobble" />
          </div>
          <svg className="story-seal" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="46" pathLength={1} />
          </svg>
          {Array.from({ length: PARTICLES }, (_, k) => (
            <span key={k} className="story-particle" />
          ))}
        </div>
      ))}
    </div>
  );
}
