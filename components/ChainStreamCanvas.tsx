"use client";

import { useEffect, useRef } from "react";

type ChainStreamCanvasProps = {
  className?: string;
};

type Stream = {
  offset: number;
  speed: number;
  amplitude: number;
  phase: number;
  alpha: number;
};

const streams: Stream[] = [
  { offset: 0.22, speed: 0.000035, amplitude: 0.1, phase: 0, alpha: 0.18 },
  { offset: 0.36, speed: 0.000025, amplitude: 0.075, phase: 2.2, alpha: 0.12 },
  { offset: 0.52, speed: 0.00003, amplitude: 0.09, phase: 4, alpha: 0.16 },
  { offset: 0.69, speed: 0.00002, amplitude: 0.065, phase: 1.4, alpha: 0.1 },
];

export default function ChainStreamCanvas({ className = "" }: ChainStreamCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let width = 0;
    let height = 0;
    let pixelRatio = 1;
    let pointerX = 0.5;
    let pointerY = 0.5;
    let visible = false;
    let startedAt = performance.now();

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      startedAt = performance.now();
    };

    const draw = (now: number) => {
      if (!visible) return;
      context.clearRect(0, 0, width, height);
      const elapsed = reducedMotion.matches ? 0 : now - startedAt;
      const parallaxX = (pointerX - 0.5) * 18;
      const parallaxY = (pointerY - 0.5) * 12;

      for (const stream of streams) {
        const baseY = height * stream.offset + Math.sin(elapsed * stream.speed + stream.phase) * height * 0.025 + parallaxY;
        const amplitude = height * stream.amplitude;
        const drift = Math.sin(elapsed * stream.speed * 0.7 + stream.phase) * width * 0.035;

        context.beginPath();
        context.moveTo(-40, baseY + Math.sin(stream.phase) * amplitude * 0.25);
        context.bezierCurveTo(
          width * 0.28 + drift + parallaxX,
          baseY - amplitude,
          width * 0.45 - drift,
          baseY + amplitude,
          width * 0.69 + parallaxX,
          baseY - amplitude * 0.15,
        );
        context.bezierCurveTo(
          width * 0.84 - drift,
          baseY - amplitude * 0.8,
          width * 0.91 + parallaxX,
          baseY + amplitude * 0.7,
          width + 40,
          baseY - amplitude * 0.25,
        );

        context.strokeStyle = `rgba(198, 247, 0, ${stream.alpha})`;
        context.lineWidth = 1;
        context.stroke();

        if (!reducedMotion.matches) {
          const progress = ((elapsed * stream.speed * 0.14 + stream.phase * 0.13) % 1 + 1) % 1;
          const x = progress * width;
          const y = baseY + Math.sin(progress * Math.PI * 2 + stream.phase) * amplitude * 0.35;
          const glow = context.createRadialGradient(x, y, 0, x, y, 12);
          glow.addColorStop(0, `rgba(198, 247, 0, ${stream.alpha * 1.8})`);
          glow.addColorStop(1, "rgba(198, 247, 0, 0)");
          context.fillStyle = glow;
          context.fillRect(x - 12, y - 12, 24, 24);
          context.beginPath();
          context.arc(x, y, 1.5, 0, Math.PI * 2);
          context.fillStyle = "rgba(222, 255, 120, 0.9)";
          context.fill();
        }
      }

      if (!reducedMotion.matches) frame = window.requestAnimationFrame(draw);
    };

    const observer = "IntersectionObserver" in window
      ? new IntersectionObserver(([entry]) => {
          visible = entry.isIntersecting;
          if (visible && !frame) frame = window.requestAnimationFrame(draw);
          else if (!visible && frame) {
            window.cancelAnimationFrame(frame);
            frame = 0;
          }
        })
      : null;

    const onPointerMove = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      pointerX = (event.clientX - bounds.left) / bounds.width;
      pointerY = (event.clientY - bounds.top) / bounds.height;
    };

    const onResize = () => {
      resize();
      if (visible && reducedMotion.matches) draw(performance.now());
    };

    const onMotionChange = () => {
      window.cancelAnimationFrame(frame);
      frame = 0;
      if (visible) {
        if (reducedMotion.matches) draw(performance.now());
        else frame = window.requestAnimationFrame(draw);
      }
    };

    resize();
    if (observer) {
      observer.observe(canvas);
    } else {
      visible = true;
    }
    canvas.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("resize", onResize);
    reducedMotion.addEventListener("change", onMotionChange);

    if (visible && reducedMotion.matches) draw(performance.now());
    else if (visible) frame = window.requestAnimationFrame(draw);

    return () => {
      window.cancelAnimationFrame(frame);
      observer?.disconnect();
      canvas.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", onResize);
      reducedMotion.removeEventListener("change", onMotionChange);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
