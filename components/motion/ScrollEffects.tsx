"use client";

import { useEffect } from "react";
import { bindMagnetic, canHoverFx } from "@/lib/motion/magnetic";
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
              scrollTrigger: { trigger: h2, start: "top 88%", once: true, refreshPriority: -1 },
            },
          );
        });
      }, main);
      cleanups.push(() => ctx.revert());

      const mm = gsap.matchMedia();
      cleanups.push(() => mm.revert());

      // ---- every size --------------------------------------------------
      mm.add("all", () => {
        // Section seams: a lime slash sweeps across as each band arrives.
        const bands = Array.from(main.querySelectorAll<HTMLElement>(":scope > [data-band]")).slice(1);
        const wipes = bands.map((band) => {
          const wipe = document.createElement("div");
          wipe.className = "band-wipe";
          wipe.setAttribute("aria-hidden", "true");
          wipe.innerHTML = '<span class="band-wipe-bar"></span>';
          band.prepend(wipe);
          gsap.fromTo(
            wipe.firstElementChild,
            { xPercent: -130 },
            { xPercent: 230, ease: "none", scrollTrigger: { trigger: band, start: "top 92%", end: "top 30%", scrub: 0.5, refreshPriority: -1 } },
          );
          return wipe;
        });

        // Final CTA: coins drop and settle into a stack behind the button.
        const rain = main.querySelector<HTMLElement>(".coin-rain");
        if (rain) {
          const drops = Array.from(rain.querySelectorAll<HTMLElement>(".rain-drop"));
          gsap.fromTo(
            drops,
            { y: () => -window.innerHeight * 0.6, opacity: 0, rotation: (i: number) => (i % 2 ? 40 : -50) },
            {
              y: 0,
              opacity: 1,
              rotation: 0,
              duration: 1.1,
              ease: "bounce.out",
              stagger: 0.14,
              scrollTrigger: { trigger: rain.closest("section"), start: "top 55%", once: true, refreshPriority: -1 },
            },
          );
        }

        // Magnetic CTAs outside the hero (the hero binds its own).
        const unbind = canHoverFx()
          ? Array.from(main.querySelectorAll<HTMLElement>("[data-magnetic]"))
              .filter((el) => !el.closest(".hero-light"))
              .map((el) => bindMagnetic(el))
          : [];

        return () => {
          wipes.forEach((w) => w.remove());
          unbind.forEach((fn) => fn());
        };
      });

      // ---- desktop only: pinning and horizontal scroll -----------------
      mm.add("(min-width: 1024px)", () => {
        // How it works: pin and scrub Shape → Seal → Route.
        const how = main.querySelector<HTMLElement>("#execution");
        const howPin = how?.querySelector<HTMLElement>(".how-pin");
        if (how && howPin) {
          how.dataset.driver = "pinned";
          const proxy = { p: 0 };
          gsap.to(proxy, {
            p: 1,
            ease: "none",
            onUpdate: () => {
              how.dispatchEvent(new CustomEvent("how:progress", { detail: proxy.p }));
            },
            scrollTrigger: {
              trigger: howPin,
              pin: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              // Pin under the navbar when it fits; otherwise once its bottom is in view.
              start: () => (howPin.offsetHeight > window.innerHeight - 68 ? "bottom bottom" : "top 68px"),
              end: "+=150%",
              scrub: 0.6,
            },
          });
        }

        // Coin strip: pinned horizontal scroll; each coin flips as it crosses.
        const strip = main.querySelector<HTMLElement>(".coin-strip");
        const stripPin = strip?.querySelector<HTMLElement>(".coin-strip-pin");
        const track = strip?.querySelector<HTMLElement>(".coin-strip-track");
        const viewport = strip?.querySelector<HTMLElement>(".coin-strip-viewport");
        if (strip && stripPin && track && viewport) {
          strip.classList.add("is-scrubbed");
          const distance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);
          const slide = gsap.to(track, {
            x: () => -distance(),
            ease: "none",
            scrollTrigger: {
              trigger: stripPin,
              pin: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              start: "top top",
              end: () => `+=${distance()}`,
              scrub: 0.6,
            },
          });
          track.querySelectorAll<HTMLElement>(".coin-strip-item").forEach((item) => {
            const coin = item.querySelector<HTMLElement>(".flip-coin");
            if (!coin) return;
            gsap.fromTo(
              coin,
              { "--flip": 0 },
              {
                "--flip": 1,
                ease: "none",
                scrollTrigger: { trigger: item, containerAnimation: slide, start: "left 72%", end: "left 38%", scrub: true },
              },
            );
          });
        }

        // Status cards: each earlier card settles back as the next one stacks on it.
        const cards = Array.from(main.querySelectorAll<HTMLElement>(".stack-card"));
        cards.slice(0, -1).forEach((card, i) => {
          gsap.fromTo(card, { scale: 1, filter: "brightness(1)" }, {
            scale: 0.93,
            filter: "brightness(0.9)",
            transformOrigin: "50% 0%",
            ease: "none",
            scrollTrigger: {
              trigger: cards[i + 1],
              start: "top 88%",
              end: () => `top ${112 + (i + 1) * 24}px`,
              scrub: true,
              refreshPriority: -1,
            },
          });
        });

        return () => {
          if (how) delete how.dataset.driver;
          strip?.classList.remove("is-scrubbed");
        };
      });

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
