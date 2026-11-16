/** The logo's slash leans 15° from vertical (top to the right). */
export const SLASH = Math.tan((15 * Math.PI) / 180);

export type Point = { x: number; y: number };

/**
 * Where the hero relay line runs inside a coin stage of size w×h, plus helpers
 * for points along it. Shared by the floating coins and the story layer so both
 * agree on the line exactly.
 */
export function slashGeometry(w: number, h: number) {
  const mobile = w < 640;
  const cx = w * (mobile ? 0.5 : 0.42);
  const top: Point = { x: cx + SLASH * h * 0.56, y: -h * 0.06 };
  const bottom: Point = { x: cx - SLASH * h * 0.56, y: h * 1.06 };
  const at = (t: number): Point => ({ x: top.x + (bottom.x - top.x) * t, y: top.y + (bottom.y - top.y) * t });
  return { mobile, top, bottom, at };
}
