"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, Search } from "lucide-react";

export default function EndpointInspector() {
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");

  function inspect(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = query.trim();
    if (!value) {
      setMessage("Enter an RPC endpoint or wallet address to continue.");
      return;
    }
    setMessage("Ready to inspect. Connect a private RPC in the dashboard to run a live check.");
  }

  return (
    <div>
      <form
        onSubmit={inspect}
        className="flex flex-col gap-2 rounded-2xl border border-zinc-700/70 bg-zinc-950/80 p-2 shadow-[0_10px_60px_rgba(0,0,0,0.35)] sm:flex-row"
      >
        <label htmlFor="endpoint" className="sr-only">RPC endpoint or wallet address</label>
        <div className="flex min-w-0 flex-1 items-center gap-3 px-3">
          <Search size={16} className="shrink-0 text-zinc-500" />
          <input
            id="endpoint"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setMessage("");
            }}
            placeholder="Paste an RPC endpoint or wallet address..."
            className="h-11 min-w-0 flex-1 bg-transparent text-xs text-zinc-200 outline-none placeholder:text-zinc-600"
          />
        </div>
        <button
          type="submit"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-zinc-100 px-5 text-xs font-semibold text-zinc-950 transition hover:bg-white"
        >
          Inspect route <ArrowRight size={14} />
        </button>
      </form>
      <p aria-live="polite" className="mt-2 min-h-4 px-2 text-[10px] text-zinc-500">
        {message || "No transaction is sent. Route checks require a connected RPC."}
      </p>
    </div>
  );
}
