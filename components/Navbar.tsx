import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Menu } from "lucide-react";

const links = [
  { label: "Robinhood Chain L2", href: "/#network" },
  { label: "Private RPC", href: "/dashboard#terminal" },
  { label: "Security", href: "/#security" },
  { label: "Docs", href: "/#docs" },
];

const xProfileUrl = "https://x.com/zerorelayhg";

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-3.5 w-3.5">
      <path d="M18.9 2h3.1l-6.8 7.8L23.2 22h-6.3l-5-7.5L5.4 22H2.2l7.3-8.4L1.8 2h6.5l4.5 6.9L18.9 2Zm-1.1 18h1.7L7.3 3.9H5.5L17.8 20Z" />
    </svg>
  );
}

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/[0.06] bg-[#070809]/75 backdrop-blur-2xl">
      <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link href="/" aria-label="ZeroRelay home" className="group flex shrink-0 items-center gap-2.5">
          <span className="relative flex h-8 w-8 items-center justify-center">
            <Image
              src="/zerorelay-emblem-lime.png"
              alt=""
              width={40}
              height={40}
              priority
              className="absolute max-w-none object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </span>
          <span className="text-[13px] font-medium tracking-[-0.03em] text-zinc-100">
            ZeroRelay <span className="ml-1 font-mono text-[8px] font-normal tracking-normal text-[#C6F700]/60">{"// Z-RELAY"}</span>
          </span>
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <a key={link.label} href={link.href} className="text-[11px] text-zinc-400 transition hover:text-[#C6F700]">
              {link.label}
            </a>
          ))}
          <a
            href={xProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[11px] text-zinc-400 transition hover:text-[#C6F700]"
          >
            <XIcon />
            Follow on X
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <span className="hidden items-center gap-2 rounded-full border border-zinc-700/50 bg-zinc-900/80 px-3 py-1.5 font-mono text-[8px] tracking-wide text-zinc-400 xl:inline-flex">
            <span className="h-1.5 w-1.5 rounded-full bg-[#C6F700] shadow-[0_0_10px_rgba(198,247,0,0.65)]" /> ROBINHOOD CHAIN · PREVIEW
          </span>
          <Link
            href="/dashboard"
            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-[#C6F700]/20 bg-[#C6F700] px-3 text-[10px] font-semibold text-[#1B170D] shadow-[0_0_24px_rgba(198,247,0,0.1)] transition hover:border-[#C6F700] hover:bg-[#d6ff1a] hover:shadow-[0_0_28px_rgba(198,247,0,0.2)]"
          >
            Enter App <ArrowUpRight size={12} />
          </Link>
          <details className="relative lg:hidden">
            <summary aria-label="Open navigation menu" className="flex h-9 w-9 cursor-pointer list-none items-center justify-center rounded-lg border border-[#C6F700]/15 bg-[#1B170D]/60 text-zinc-300 [&::-webkit-details-marker]:hidden">
              <Menu size={15} />
            </summary>
            <nav aria-label="Mobile navigation" className="absolute right-0 top-12 z-40 grid w-48 gap-1 rounded-xl border border-[#C6F700]/15 bg-[#1B170D] p-2 shadow-2xl">
              {links.map((link) => (
                <a key={link.label} href={link.href} className="rounded-lg px-3 py-2.5 text-xs text-zinc-400 transition hover:bg-[#C6F700]/[0.08] hover:text-[#C6F700]">
                  {link.label}
                </a>
              ))}
              <a
                href={xProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-xs text-zinc-400 transition hover:bg-[#C6F700]/[0.08] hover:text-[#C6F700]"
              >
                <XIcon />
                Follow on X
              </a>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
