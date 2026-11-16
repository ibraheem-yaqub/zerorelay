const ITEMS = ["ETH", "USDG", "STOCK TOKENS", "BRIDGED ASSETS", "NEW LAUNCHES", "SWAPS", "ROBINHOOD CHAIN", "0x1237", "LOCAL PREVIEW"];

function Row({ hidden = false }: { hidden?: boolean }) {
  return (
    <span className="marquee-row" aria-hidden={hidden || undefined}>
      {ITEMS.map((item) => (
        <span key={item} className="marquee-item">
          {item}
          <span className="marquee-sep" aria-hidden="true">·</span>
        </span>
      ))}
    </span>
  );
}

/** Tilted lime band with an infinite ticker. Second copy is for the seamless loop only. */
export default function Marquee() {
  return (
    <div className="marquee-wrap relative z-10">
      <div className="marquee">
        <div className="marquee-inner">
          <Row />
          <Row hidden />
        </div>
      </div>
    </div>
  );
}
