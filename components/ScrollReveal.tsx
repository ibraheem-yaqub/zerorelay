"use client";

import { CSSProperties, PropsWithChildren, useEffect, useRef } from "react";

type ScrollRevealProps = PropsWithChildren<{
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right";
}>;

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: ScrollRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    if (!("IntersectionObserver" in window)) {
      element.classList.add("is-visible");
      return;
    }

    element.classList.add("reveal-ready");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add("is-visible");
          observer.unobserve(element);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -36px 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={elementRef}
      className={`scroll-reveal reveal-${direction} ${className}`}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}
