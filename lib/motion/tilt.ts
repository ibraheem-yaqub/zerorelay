/**
 * Tilt-on-hover with a moving sheen. Uses the standalone CSS `rotate` property
 * (a single rotation about the axis (-dy, dx, 0)) so it composes with the
 * reveal animations' `transform` and the cards' hover `translate` lift.
 * Appends one decorative `.tilt-sheen` span to the card. Returns cleanup.
 */
export function bindTilt(card: HTMLElement, maxDeg = 6): () => void {
  const sheen = document.createElement("span");
  sheen.className = "tilt-sheen";
  sheen.setAttribute("aria-hidden", "true");
  card.appendChild(sheen);
  if (card.parentElement && !card.parentElement.style.perspective) card.parentElement.style.perspective = "1400px";

  let frame = 0;
  let nx = 0;
  let ny = 0;
  let mx = 50;
  let my = 50;
  const write = () => {
    frame = 0;
    const len = Math.hypot(nx, ny);
    card.style.rotate = len < 0.001 ? "" : `${(-ny / len).toFixed(3)} ${(nx / len).toFixed(3)} 0 ${(len * maxDeg).toFixed(2)}deg`;
    card.style.setProperty("--mx", `${mx}%`);
    card.style.setProperty("--my", `${my}%`);
  };
  const onMove = (event: PointerEvent) => {
    const r = card.getBoundingClientRect();
    const px = (event.clientX - r.left) / r.width;
    const py = (event.clientY - r.top) / r.height;
    nx = Math.max(-1, Math.min(1, (px - 0.5) * 2));
    ny = Math.max(-1, Math.min(1, (py - 0.5) * 2));
    mx = px * 100;
    my = py * 100;
    card.classList.add("is-tilting");
    if (!frame) frame = requestAnimationFrame(write);
  };
  const onLeave = () => {
    nx = 0;
    ny = 0;
    card.classList.remove("is-tilting");
    if (!frame) frame = requestAnimationFrame(write);
  };
  card.addEventListener("pointermove", onMove);
  card.addEventListener("pointerleave", onLeave);
  return () => {
    cancelAnimationFrame(frame);
    card.removeEventListener("pointermove", onMove);
    card.removeEventListener("pointerleave", onLeave);
    card.style.rotate = "";
    sheen.remove();
  };
}
