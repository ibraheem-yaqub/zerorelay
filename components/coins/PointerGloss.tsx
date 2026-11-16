"use client";

import { useEffect } from "react";

/**
 * Feeds the pointer position to CSS as --gx / --gy (0–1) on <html>, so every
 * coin's gloss highlight drifts with the mouse. One listener, rAF-throttled;
 * skipped for touch and reduced motion (the gloss then rests top-left).
 */
export default function PointerGloss() {
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = document.documentElement;
    let frame = 0;
    let x = 0.3;
    let y = 0.25;
    const write = () => {
      frame = 0;
      root.style.setProperty("--gx", x.toFixed(3));
      root.style.setProperty("--gy", y.toFixed(3));
    };
    const onMove = (event: PointerEvent) => {
      x = event.clientX / window.innerWidth;
      y = event.clientY / window.innerHeight;
      if (!frame) frame = requestAnimationFrame(write);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      root.style.removeProperty("--gx");
      root.style.removeProperty("--gy");
    };
  }, []);
  return null;
}
