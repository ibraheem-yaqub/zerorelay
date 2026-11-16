"use client";

import { useEffect } from "react";
import { canHoverFx } from "@/lib/motion/magnetic";
import { scramble } from "@/lib/motion/scramble";
import { splitWords } from "@/lib/motion/split-words";
import { bindTilt } from "@/lib/motion/tilt";

/**
 * Home-page scroll layer. Everything here is progressive enhancement on top of
 * the static page and the existing CSS reveals:
 *  - Lenis smooth scrolling (desktop fine pointers only), wired to ScrollTrigger
 *  - section headings reveal word by word
 *  - "0x1237" / "4663" values scramble in when they enter view
 *  - tilt + moving sheen on cards
 * GSAP, ScrollTrigger and Lenis are imported lazily after hydration. With
 * prefers-reduced-motion nothing runs and the page stays fully static.
 */
export default function ScrollEffects() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const main = document.querySelector<HTMLElement>("main.home");
    if (!main) return;

    let disposed = false;
    const cleanups: (() => void)[] = [];

    // --- scramble: cheap, no library -------------------------------------
    const scrambleTargets = Array.from(main.querySelectorAll<HTMLElement>("[data-scramble]"));
    const scrambleIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          scrambleIO.unobserve(entry.target);
          cleanups.push(scramble(entry.target as HTMLElement));
        });
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    scrambleTargets.forEach((el) => scrambleIO.observe(el));
    cleanups.push(() => scrambleIO.disconnect());

    // --- tilt + sheen: desktop pointers only -----------------------------
    if (canHoverFx()) {
      main.querySelectorAll<HTMLElement>(".tilt-card").forEach((card) => cleanups.push(bindTilt(card)));
    }

    // --- GSAP-powered pieces ---------------------------------------------
    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      if (disposed) return;
      gsap.registerPlugin(ScrollTrigger);
      const ctx = gsap.context(() => {
        // Headings: word by word, blur to sharp, as each enters view.
        main.querySelectorAll<HTMLElement>("h2[data-words]").forEach((h2) => {
          const words = splitWords(h2);
          gsap.fromTo(
            words,
            { opacity: 0, yPercent: 60, filter: "blur(10px)" },
            {
              opacity: 1,
              yPercent: 0,
              filter: "blur(0px)",
              duration: 0.9,
              ease: "power3.out",
              stagger: 0.06,
              clearProps: "filter",
              scrollTrigger: { trigger: h2, start: "top 88%", once: true },
            },
          );
        });
      }, main);
      cleanups.push(() => ctx.revert());

      // Lenis smooth scroll: desktop fine pointers only.
      if (canHoverFx()) {
        const { default: Lenis } = await import("lenis");
        if (disposed) return;
        const lenis = new Lenis({ lerp: 0.11, wheelMultiplier: 0.95 });
        lenis.on("scroll", ScrollTrigger.update);
        const raf = (time: number) => lenis.raf(time * 1000);
        gsap.ticker.add(raf);
        gsap.ticker.lagSmoothing(0);

        // In-page anchors glide via Lenis (and still update the URL hash).
        const onClick = (event: MouseEvent) => {
          const link = (event.target as Element).closest<HTMLAnchorElement>("a[href*='#']");
          if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey) return;
          const url = new URL(link.href);
          if (url.pathname !== window.location.pathname || !url.hash) return;
          const target = document.querySelector<HTMLElement>(url.hash);
          if (!target) return;
          event.preventDefault();
          lenis.scrollTo(target, { offset: -84 });
          history.pushState(null, "", url.hash);
        };
        document.addEventListener("click", onClick);
        cleanups.push(() => {
          document.removeEventListener("click", onClick);
          gsap.ticker.remove(raf);
          lenis.destroy();
        });
      }

      ScrollTrigger.refresh();
    })();

    return () => {
      disposed = true;
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return null;
}
