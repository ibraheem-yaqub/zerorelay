import { ArrowUpRight } from "lucide-react";

const routes = [
  { label: "SOLANA", className: "route-label route-label-sol" },
  { label: "ROBINHOOD L2", className: "route-label route-label-rh" },
  { label: "EVM NETWORKS", className: "route-label route-label-evm" },
];

export default function RelayConstellation() {
  return (
    <div className="relative mx-auto aspect-[1.55/1] w-full max-w-[980px] overflow-hidden px-3 py-3 sm:aspect-[2.25/1] sm:px-8 sm:py-5">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[68%] w-[65%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-200/[0.045] blur-[60px]" aria-hidden="true" />
      <svg viewBox="0 0 900 390" className="relative h-full w-full" role="img" aria-labelledby="relay-map-title relay-map-desc">
        <title id="relay-map-title">Illustration of ZeroRelay private execution routes</title>
        <desc id="relay-map-desc">A local private ingress connects to ZeroRelay, then branches toward Solana, Robinhood Chain, and EVM builders.</desc>
        <defs>
          <linearGradient id="route-flow" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#8296a3" stopOpacity="0.08" />
            <stop offset="0.5" stopColor="#b9dbe8" stopOpacity="0.72" />
            <stop offset="1" stopColor="#83cde2" stopOpacity="0.12" />
          </linearGradient>
          <radialGradient id="relay-core">
            <stop offset="0" stopColor="#d7f4ff" stopOpacity="0.4" />
            <stop offset="1" stopColor="#9bd5e7" stopOpacity="0" />
          </radialGradient>
          <filter id="route-glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="7" />
          </filter>
        </defs>

        <g fill="none" stroke="#fff" strokeOpacity="0.075">
          <ellipse cx="451" cy="197" rx="190" ry="115" />
          <ellipse cx="451" cy="197" rx="280" ry="166" />
          <ellipse cx="451" cy="197" rx="376" ry="225" />
        </g>
        <g fill="none" stroke="url(#route-flow)" strokeWidth="1.4">
          <path d="M92 195 C208 195 292 195 399 195" />
          <path d="M503 195 C625 195 680 88 790 88" />
          <path d="M503 195 C625 195 680 195 790 195" />
          <path d="M503 195 C625 195 680 302 790 302" />
        </g>
        <g fill="none" stroke="#c6e8f2" strokeOpacity="0.55" strokeWidth="1.5" filter="url(#route-glow)">
          <path className="route-scan" d="M92 195 C208 195 292 195 399 195" />
          <path className="route-scan route-scan-delayed" d="M503 195 C625 195 680 88 790 88" />
          <path className="route-scan route-scan-delayed" d="M503 195 C625 195 680 195 790 195" />
          <path className="route-scan route-scan-delayed" d="M503 195 C625 195 680 302 790 302" />
        </g>

        <g>
          <circle cx="451" cy="195" r="80" fill="url(#relay-core)" />
          <circle cx="451" cy="195" r="52" fill="#0c1114" stroke="#bce6f2" strokeOpacity="0.34" />
          <circle cx="451" cy="195" r="44" fill="none" stroke="#fff" strokeOpacity="0.07" />
          <path d="M451 173v44m-15-29h30m-30 14h30" stroke="#c7e9f2" strokeOpacity="0.9" strokeWidth="1.2" strokeLinecap="round" />
          <text x="451" y="255" fill="#c6d3d9" fontSize="10" letterSpacing="2" textAnchor="middle">ZERO RELAY</text>
        </g>

        <g>
          <circle cx="92" cy="195" r="24" fill="#101416" stroke="#fff" strokeOpacity="0.13" />
          <circle cx="92" cy="195" r="4" fill="#c8eaf3" />
          <text x="92" y="240" fill="#7e8a90" fontSize="9" letterSpacing="1.3" textAnchor="middle">YOUR SIGNER</text>
        </g>

        {[
          { y: 88, id: "solana" },
          { y: 195, id: "robinhood" },
          { y: 302, id: "evm" },
        ].map(({ y, id }) => (
          <g key={y}>
            <circle cx="790" cy={y} r="23" fill="#101416" stroke="#c7e9f2" strokeOpacity="0.25" />
            {id === "solana" ? (
              <g fill="#d9c8ff">
                <path d="M784 82h11l2 2h-11l-2-2Z" />
                <path d="M782 87h11l2 2h-11l-2-2Z" />
                <path d="M784 92h11l2 2h-11l-2-2Z" />
              </g>
            ) : null}
            {id === "robinhood" ? (
              <path d="M786 202v-14h7c3 0 5 1.6 5 4.2 0 1.9-1 3.2-2.8 3.8l3.2 6h-3.8l-2.8-5h-1.6v5H786Zm3.2-7.5h2.6c1.3 0 2-.6 2-1.7s-.7-1.6-2-1.6h-2.6v3.3Z" fill="#c6f2d5" />
            ) : null}
            {id === "evm" ? (
              <path d="m790 291 7 11-7 4.1-7-4.1 7-11Zm0 17 7-4-7 9-7-9 7 4Z" fill="#c7e9f2" />
            ) : null}
          </g>
        ))}
      </svg>

      <span className="route-caption route-caption-ingress">PRIVATE INGRESS</span>
      {routes.map(({ label, className }) => (
        <span key={label} className={className}>
          <span className="mr-1.5 h-1 w-1 rounded-full bg-cyan-100/80" />{label}
          <ArrowUpRight size={9} className="ml-1 text-zinc-700" />
        </span>
      ))}
    </div>
  );
}
