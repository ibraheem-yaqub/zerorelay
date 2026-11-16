import Link from "next/link";

/** Shared site footer: brand mark on the left, the page's honest-status lines on the right. */
export default function SiteFooter({ lines }: { lines: string[] }) {
  return (
    <footer className="px-5 pb-10 pt-14 sm:px-8 sm:pt-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <Link href="/" aria-label="ZeroRelay home" className="group inline-flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element -- tiny static SVG */}
          <img src="/zerorelay-mark-lime.svg" alt="" width={36} height={36} className="h-9 w-9 transition-transform duration-500 group-hover:rotate-[15deg]" />
          <span className="text-lg font-semibold tracking-[-0.04em] text-[#f7fbe2]">ZeroRelay</span>
        </Link>
        <div className="flex flex-col gap-2 font-mono text-[10px] tracking-[0.08em] text-[#f7fbe2]/65 sm:items-end">
          {lines.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </div>
      </div>
    </footer>
  );
}
