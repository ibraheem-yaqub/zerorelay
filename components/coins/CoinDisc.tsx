import type { CSSProperties } from "react";
import { COIN_TYPES, type CoinKind } from "@/lib/coin-types";
import CoinGlyph from "@/components/coins/CoinGlyph";

export const EDGE_LAYERS = 6;

type Spin = "flip" | "wobble" | "none";

/**
 * The 3D disc itself (edge stack + front/back faces) for an asset or intent coin.
 * Size comes from the `--size` custom property on an ancestor. Purely decorative.
 * `back="description"` prints the type's one-liner on the reverse (flip strip).
 */
export default function CoinDisc({
  kind,
  spin = "none",
  back = "face",
  className = "",
  style,
}: {
  kind: CoinKind;
  spin?: Spin;
  back?: "face" | "description";
  className?: string;
  style?: CSSProperties;
}) {
  const type = COIN_TYPES[kind];
  return (
    <div className={`coin coin-${type.material} ${spin === "none" ? "" : `coin-spin-${spin}`} ${className}`} style={style}>
      {Array.from({ length: EDGE_LAYERS }, (_, e) => (
        <span key={e} className="coin-edge" style={{ "--z": (e / (EDGE_LAYERS - 1) - 0.5) * 2 } as CSSProperties} />
      ))}
      <div className="coin-face">
        <FaceArt kind={kind} />
        <span className="coin-sheen" />
        <span className="coin-gloss" />
        <span className="coin-ping" />
      </div>
      <div className="coin-face coin-face-back">
        {back === "description" ? (
          <span className="coin-desc">
            <span className="coin-desc-label">{type.label}</span>
            <span className="coin-desc-text">{type.description}</span>
          </span>
        ) : (
          <FaceArt kind={kind} />
        )}
        <span className="coin-gloss coin-gloss-back" />
      </div>
    </div>
  );
}

function FaceArt({ kind }: { kind: CoinKind }) {
  const { label } = COIN_TYPES[kind];
  return (
    <span className="coin-art">
      <CoinGlyph kind={kind} className="coin-glyph" />
      <span className={`coin-label ${label.length > 5 ? "coin-label-long" : ""}`}>{label}</span>
    </span>
  );
}

/** Standalone floating asset coin (same wrapper pattern as BrandCoin). */
export function AssetCoin({
  kind,
  size,
  spin = "wobble",
  delay = 0,
  className = "",
}: {
  kind: CoinKind;
  size: number;
  spin?: Spin;
  delay?: number;
  className?: string;
}) {
  return (
    <div className={`brand-coin ${className}`} style={{ "--size": `${size}px`, "--i": delay } as CSSProperties} aria-hidden="true">
      <div className="coin-bob" style={{ animationDelay: `${-delay * 1.7}s` }}>
        <CoinDisc kind={kind} spin={spin} style={{ animationDelay: `${-delay * 2.3}s` }} />
      </div>
    </div>
  );
}
