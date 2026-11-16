const GLYPHS = "0123456789abcdefx";

/**
 * Scrambles an element's text through hex-ish glyphs and resolves it left to
 * right back to the original. The final text is always the original, so the
 * value (e.g. "0x1237") is never misreported. Returns a cancel function.
 */
export function scramble(el: HTMLElement, duration = 900): () => void {
  const final = el.dataset.scrambleText ?? el.textContent ?? "";
  el.dataset.scrambleText = final;
  const start = performance.now();
  let frame = 0;

  const tick = (now: number) => {
    const t = Math.min(1, (now - start) / duration);
    const settled = Math.floor(t * final.length);
    let out = "";
    for (let i = 0; i < final.length; i++) {
      const ch = final[i];
      out += i < settled || ch === " " || ch === "·" ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0];
    }
    el.textContent = out;
    if (t < 1) frame = requestAnimationFrame(tick);
    else el.textContent = final;
  };
  frame = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(frame);
    el.textContent = final;
  };
}
