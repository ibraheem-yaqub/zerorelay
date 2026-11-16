/**
 * Magnetic hover: the element leans toward the pointer while it is over it and
 * springs back on leave. Uses the CSS `translate` property so it composes with
 * the buttons' own hover `transform`. Caller decides when to bind (fine pointer,
 * no reduced motion). Returns a cleanup function.
 */
export function bindMagnetic(el: HTMLElement, strength = 0.28, max = 12): () => void {
  let frame = 0;
  let tx = 0;
  let ty = 0;
  const write = () => {
    frame = 0;
    el.style.translate = `${tx.toFixed(2)}px ${ty.toFixed(2)}px`;
  };
  const onMove = (event: PointerEvent) => {
    const r = el.getBoundingClientRect();
    const clamp = (v: number) => Math.max(-max, Math.min(max, v));
    tx = clamp((event.clientX - (r.left + r.width / 2)) * strength);
    ty = clamp((event.clientY - (r.top + r.height / 2)) * strength);
    el.classList.add("is-magnetic");
    if (!frame) frame = requestAnimationFrame(write);
  };
  const onLeave = () => {
    tx = 0;
    ty = 0;
    el.classList.remove("is-magnetic");
    if (!frame) frame = requestAnimationFrame(write);
  };
  el.addEventListener("pointermove", onMove);
  el.addEventListener("pointerleave", onLeave);
  return () => {
    cancelAnimationFrame(frame);
    el.removeEventListener("pointermove", onMove);
    el.removeEventListener("pointerleave", onLeave);
    el.style.translate = "";
  };
}

/** True when rich pointer effects should run: a mouse-like pointer and motion allowed. */
export function canHoverFx(): boolean {
  return (
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}
