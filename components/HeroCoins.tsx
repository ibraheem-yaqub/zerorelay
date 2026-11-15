"use client";

import { CSSProperties, useEffect, useRef } from "react";

/**
 * Decorative brand art for the home hero: ZeroRelay-mark coins floating at three
 * depths, with a one-time "relay" moment where a lime line draws through the
 * stage and the coins line up along it. Purely visual — no data, prices or
 * balances are shown, and the whole layer is hidden from assistive tech.
 */

type Coin = {
  layer: 0 | 1 | 2; // 0 = far, 2 = near
  tone: "lime" | "ink";
  size: number; // px at desktop scale
  fx: number; // floating position, % of stage width
  fy: number; // floating position, % of stage height
  t: number; // position along the relay line, 0 (top) → 1 (bottom)
  spin: "flip" | "wobble";
  dur: number; // spin duration, s
  bob: number; // float duration, s
  mobile?: boolean; // also shown on small screens
};

const COINS: Coin[] = [
  { layer: 0, tone: "ink", size: 58, fx: 20, fy: 16, t: 0.14, spin: "wobble", dur: 11, bob: 7.5 },
  { layer: 0, tone: "lime", size: 52, fx: 88, fy: 82, t: 0.84, spin: "flip", dur: 16, bob: 8.2 },
  { layer: 0, tone: "lime", size: 46, fx: 12, fy: 70, t: 0.93, spin: "wobble", dur: 13, bob: 6.8 },
  { layer: 1, tone: "lime", size: 92, fx: 74, fy: 14, t: 0.24, spin: "flip", dur: 12, bob: 6.4, mobile: true },
  { layer: 1, tone: "ink", size: 84, fx: 30, fy: 46, t: 0.47, spin: "wobble", dur: 9.5, bob: 7.1 },
  { layer: 1, tone: "ink", size: 78, fx: 86, fy: 54, t: 0.59, spin: "flip", dur: 14, bob: 5.9, mobile: true },
  { layer: 2, tone: "ink", size: 132, fx: 46, fy: 24, t: 0.35, spin: "wobble", dur: 10.5, bob: 6.6, mobile: true },
  { layer: 2, tone: "lime", size: 150, fx: 58, fy: 74, t: 0.72, spin: "flip", dur: 13.5, bob: 7.4, mobile: true },
];

// Uniform-ish scale coins take when they settle on the line, so the row reads as one route.
const LINE_SCALE = [0.95, 0.85, 0.66];
// Parallax amplitude per layer: [mouse px, scroll factor].
const DEPTH = [
  [10, 0.12],
  [22, 0.26],
  [40, 0.48],
];
// The logo's slash leans 15° from vertical (top to the right).
const SLASH = Math.tan((15 * Math.PI) / 180);
const EDGE_LAYERS = 6;

export default function HeroCoins({ className = "" }: { className?: string }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const packetRef = useRef<HTMLDivElement>(null);
  const slotRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const stage = stageRef.current;
    const svg = svgRef.current;
    const packet = packetRef.current;
    if (!stage || !svg || !packet) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const timers: number[] = [];
    // Scroll drift is gentler on small screens, where the art sits below the copy.
    let drift = 1;

    // ---- geometry: relay line + where each coin sits on it -------------------
    const layout = () => {
      const { width: w, height: h } = stage.getBoundingClientRect();
      if (!w || !h) return;
      const mobile = w < 640;
      drift = mobile ? 0.1 : 1;
      const cx = w * (mobile ? 0.5 : 0.42);
      const top = { x: cx + SLASH * h * 0.56, y: -h * 0.06 };
      const bottom = { x: cx - SLASH * h * 0.56, y: h * 1.06 };
      svg.querySelectorAll("line").forEach((line) => {
        line.setAttribute("x1", `${top.x}`);
        line.setAttribute("y1", `${top.y}`);
        line.setAttribute("x2", `${bottom.x}`);
        line.setAttribute("y2", `${bottom.y}`);
      });
      packet.style.setProperty("--ax", `${top.x}px`);
      packet.style.setProperty("--ay", `${top.y}px`);
      packet.style.setProperty("--bx", `${bottom.x}px`);
      packet.style.setProperty("--by", `${bottom.y}px`);

      COINS.forEach((coin, i) => {
        const slot = slotRefs.current[i];
        if (!slot) return;
        const lx = top.x + (bottom.x - top.x) * coin.t;
        const ly = top.y + (bottom.y - top.y) * coin.t;
        slot.style.setProperty("--dx", `${lx - (coin.fx / 100) * w}px`);
        slot.style.setProperty("--dy", `${ly - (coin.fy / 100) * h}px`);
      });
    };
    layout();
    const resizeObserver = new ResizeObserver(layout);
    resizeObserver.observe(stage);

    if (reduced) {
      stage.classList.add("is-routing", "is-aligned", "is-static");
      return () => resizeObserver.disconnect();
    }

    // ---- parallax: one rAF loop that eases toward targets, then sleeps ------
    const target = { mx: 0, my: 0, sy: 0, strength: 1 };
    const current = { mx: 0, my: 0, sy: 0, strength: 1 };
    let frame = 0;
    let visible = true;

    const tick = () => {
      frame = 0;
      let moving = false;
      (Object.keys(current) as (keyof typeof current)[]).forEach((key) => {
        const delta = target[key] - current[key];
        if (Math.abs(delta) > 0.0005) {
          current[key] += delta * (key === "strength" ? 0.06 : 0.09);
          moving = true;
        } else {
          current[key] = target[key];
        }
      });
      const s = current.strength;
      stage.style.setProperty("--px", `${current.mx * s}`);
      stage.style.setProperty("--py", `${current.my * s}`);
      stage.style.setProperty("--sy", `${current.sy * s}`);
      if (moving && visible) frame = requestAnimationFrame(tick);
    };
    const kick = () => {
      if (!frame && visible) frame = requestAnimationFrame(tick);
    };

    const onPointer = (event: PointerEvent) => {
      target.mx = (event.clientX / window.innerWidth - 0.5) * 2;
      target.my = (event.clientY / window.innerHeight - 0.5) * 2;
      kick();
    };
    const onScroll = () => {
      target.sy = Math.min(window.scrollY, window.innerHeight * 1.2) * drift;
      kick();
    };
    if (finePointer) window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    // ---- the relay moment: draw → align → packet → release ------------------
    // Timed from when the art is first seen (CSS entrance is paused until then too),
    // so on mobile — where the stage starts below the fold — the moment isn't missed.
    let started = false;
    const at = (ms: number, fn: () => void) => timers.push(window.setTimeout(fn, ms));
    const startRelay = () => {
      started = true;
      at(1900, () => stage.classList.add("is-routing"));
      at(2300, () => {
        target.strength = 0; // freeze parallax so the row lines up exactly
        kick();
        stage.classList.add("is-aligned");
      });
      at(3500, () => stage.classList.add("is-packet"));
      at(6200, () => {
        stage.classList.remove("is-aligned");
        stage.classList.add("is-released");
        target.strength = 1;
        kick();
      });
    };

    // Pause every CSS loop and the rAF loop while the hero is off screen.
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      stage.classList.toggle("is-paused", !visible);
      if (visible) kick();
      if (!started && entry.intersectionRatio >= 0.35) startRelay();
    }, { threshold: [0, 0.35] });
    io.observe(stage);

    return () => {
      timers.forEach(clearTimeout);
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div ref={stageRef} className={`coin-stage ${className}`} aria-hidden="true">
      <div className="coin-glow" />
      <svg ref={svgRef} className="relay-line" width="100%" height="100%">
        <line className="relay-line-halo" pathLength={1} />
        <line className="relay-line-core" pathLength={1} />
      </svg>

      {[0, 1, 2].map((layer) => (
        <div
          key={layer}
          className="coin-layer"
          style={{ "--k": DEPTH[layer][0], "--ks": DEPTH[layer][1], zIndex: layer + 1 } as CSSProperties}
        >
          {COINS.map((coin, i) =>
            coin.layer !== layer ? null : (
              <div
                key={i}
                ref={(el) => {
                  slotRefs.current[i] = el;
                }}
                className={`coin-slot coin-layer-${layer} ${coin.mobile ? "" : "coin-desktop-only"}`}
                style={
                  {
                    left: `${coin.fx}%`,
                    top: `${coin.fy}%`,
                    "--size-d": `${coin.size}px`,
                    "--size-m": `${Math.round(coin.size * 0.7)}px`,
                    "--ls": LINE_SCALE[layer],
                    "--i": i,
                    "--t": coin.t,
                  } as CSSProperties
                }
              >
                <div className="coin-shadow" style={{ animationDuration: `${coin.bob}s`, animationDelay: `${-i * 1.3}s` }} />
                <div className="coin-enter">
                  <div className="coin-bob" style={{ animationDuration: `${coin.bob}s`, animationDelay: `${-i * 1.3}s` }}>
                    <div
                      className={`coin coin-${coin.tone} coin-spin-${coin.spin}`}
                      style={{ animationDuration: `${coin.dur}s`, animationDelay: `${-i * 2.1}s` }}
                    >
                      {Array.from({ length: EDGE_LAYERS }, (_, e) => (
                        <span
                          key={e}
                          className="coin-edge"
                          style={{ "--z": (e / (EDGE_LAYERS - 1) - 0.5) * 2 } as CSSProperties}
                        />
                      ))}
                      <CoinFace tone={coin.tone} />
                      <CoinFace tone={coin.tone} back />
                    </div>
                  </div>
                </div>
              </div>
            ),
          )}
        </div>
      ))}

      <div ref={packetRef} className="relay-packet" />
    </div>
  );
}

function CoinFace({ tone, back = false }: { tone: Coin["tone"]; back?: boolean }) {
  return (
    <div className={`coin-face ${back ? "coin-face-back" : ""}`}>
      {/* eslint-disable-next-line @next/next/no-img-element -- tiny static SVG, no optimisation needed */}
      <img src={tone === "lime" ? "/zerorelay-mark.svg" : "/zerorelay-mark-lime.svg"} alt="" draggable={false} className="coin-mark" />
      <span className="coin-sheen" />
      <span className="coin-ping" />
    </div>
  );
}

/** A single standalone brand coin (same styles as the hero coins) for accent art elsewhere. */
export function BrandCoin({
  tone,
  size,
  spin = "wobble",
  delay = 0,
  className = "",
}: {
  tone: Coin["tone"];
  size: number;
  spin?: Coin["spin"];
  delay?: number;
  className?: string;
}) {
  return (
    <div
      className={`brand-coin ${className}`}
      style={{ "--size": `${size}px`, "--i": delay } as CSSProperties}
      aria-hidden="true"
    >
      <div className="coin-bob" style={{ animationDelay: `${-delay * 1.7}s` }}>
        <div className={`coin coin-${tone} coin-spin-${spin}`} style={{ animationDelay: `${-delay * 2.3}s` }}>
          {Array.from({ length: EDGE_LAYERS }, (_, e) => (
            <span key={e} className="coin-edge" style={{ "--z": (e / (EDGE_LAYERS - 1) - 0.5) * 2 } as CSSProperties} />
          ))}
          <CoinFace tone={tone} />
          <CoinFace tone={tone} back />
        </div>
      </div>
    </div>
  );
}
