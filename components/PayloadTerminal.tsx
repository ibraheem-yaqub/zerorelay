"use client";

import { FormEvent, useMemo, useState } from "react";
import { Check, Clipboard, Code2, Radio, ShieldAlert, Terminal } from "lucide-react";
import ChainMark from "@/components/ChainMark";
import { ADDRESS_PATTERN, ROBINHOOD_CHAIN } from "@/lib/robinhood-chain";

type CompileIntent = {
  router: string;
  recipient: string;
  amountEth: string;
  slippagePercent: string;
  generatedAt: string;
};

const initialIntent: CompileIntent = {
  router: "",
  recipient: "",
  amountEth: "0.1",
  slippagePercent: "0.5",
  generatedAt: "",
};

export default function PayloadTerminal() {
  const [intent, setIntent] = useState(initialIntent);
  const [compiledIntent, setCompiledIntent] = useState<CompileIntent | null>(null);
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const payload = useMemo(() => {
    const active = compiledIntent ?? intent;
    return {
      previewOnly: true,
      transport: {
        protocol: "JSON-RPC over WebSocket",
        endpoint: null,
        submissionEnabled: false,
      },
      chain: {
        name: ROBINHOOD_CHAIN.name,
        network: ROBINHOOD_CHAIN.network,
        chainId: ROBINHOOD_CHAIN.chainId,
        chainIdHex: ROBINHOOD_CHAIN.chainIdHex,
        nativeCurrency: ROBINHOOD_CHAIN.nativeCurrency.symbol,
      },
      request: {
        jsonrpc: "2.0",
        method: "eth_sendRawTransaction",
        params: ["<signed raw transaction supplied by wallet>"],
        id: 1,
      },
      swapIntent: {
        router: active.router || "<DEX router address>",
        recipient: active.recipient || "<recipient address>",
        amountIn: {
          value: active.amountEth,
          unit: ROBINHOOD_CHAIN.nativeCurrency.symbol,
        },
        maxSlippagePercent: active.slippagePercent,
        calldata: "<ABI-encoded swap calldata required>",
      },
      generatedAt: compiledIntent?.generatedAt || "Not compiled",
      note: "A private WebSocket endpoint, router ABI, calldata, and wallet signature are not configured. Do not send this preview to a public RPC.",
    };
  }, [compiledIntent, intent]);

  function compile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setCopied(false);

    if (!ADDRESS_PATTERN.test(intent.router.trim())) {
      setMessage("Enter a valid 20-byte EVM DEX router address.");
      return;
    }
    if (!ADDRESS_PATTERN.test(intent.recipient.trim())) {
      setMessage("Enter a valid 20-byte EVM recipient address.");
      return;
    }
    const amount = Number(intent.amountEth);
    if (!Number.isFinite(amount) || amount <= 0) {
      setMessage("Amount must be greater than zero.");
      return;
    }
    const slippage = Number(intent.slippagePercent);
    if (!Number.isFinite(slippage) || slippage < 0 || slippage > 100) {
      setMessage("Slippage must be between 0 and 100 percent.");
      return;
    }

    setCompiledIntent({ ...intent, generatedAt: new Date().toISOString() });
  }

  function updateIntent(field: keyof CompileIntent, value: string) {
    setIntent((current) => ({ ...current, [field]: value }));
    setCompiledIntent(null);
    setMessage("");
    setCopied(false);
  }

  async function copyPayload() {
    try {
      await navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
      setCopied(true);
      setMessage("");
    } catch (error) {
      console.error("Could not copy the transaction preview.", error);
      setMessage("Clipboard access failed. Select and copy the JSON manually.");
    }
  }

  return (
    <section id="terminal" aria-labelledby="terminal-title" className="relative scroll-mt-24 px-5 pb-20 pt-10 sm:px-8 sm:pb-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-7 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="font-mono text-[9px] tracking-[0.2em] text-[#C6F700]/70">EXECUTION TERMINAL / 02</p>
            <h2 id="terminal-title" className="mt-3 text-2xl font-medium tracking-[-0.05em] text-zinc-100 sm:text-3xl">
              Compile a private-route preview.
            </h2>
            <p className="mt-2 max-w-xl text-xs leading-6 text-zinc-500">
              Configure a Robinhood Chain swap intent and inspect a WebSocket JSON-RPC envelope. No signing or network submission occurs here.
            </p>
          </div>
          <span className="flex w-fit items-center gap-2 rounded-full border border-[#C6F700]/15 bg-[#1B170D]/75 px-3 py-1.5 font-mono text-[9px] text-[#d6ff1a]/80">
            <Radio size={12} className="text-[#C6F700]" /> OFFLINE PREVIEW
          </span>
        </div>

        <div className="grid gap-3 xl:grid-cols-[0.84fr_1.16fr]">
          <form onSubmit={compile} className="route-panel rounded-3xl border border-zinc-800/70 p-5 shadow-[0_0_50px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#C6F700]/20 bg-[#1B170D]/60">
                  <Terminal size={14} className="text-[#C6F700]" />
                </span>
                <div>
                  <p className="font-mono text-[8px] tracking-[0.15em] text-zinc-600">TARGET NETWORK</p>
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-zinc-200">
                    <ChainMark chain="robinhood" className="h-4 w-4" /> Robinhood Chain
                  </p>
                </div>
              </div>
              <span className="font-mono text-[9px] text-[#C6F700]">{ROBINHOOD_CHAIN.chainIdHex}</span>
            </div>

            <div className="mt-7 space-y-4">
              <label className="block">
                <span className="mb-2 block font-mono text-[9px] text-zinc-500">DEX ROUTER ADDRESS</span>
                <input
                  inputMode="text"
                  autoComplete="off"
                  spellCheck={false}
                  value={intent.router}
                  onChange={(event) => updateIntent("router", event.target.value)}
                  placeholder="0x..."
                  className="h-11 w-full rounded-xl border border-zinc-800 bg-black/45 px-3 font-mono text-[10px] text-zinc-200 outline-none transition focus:border-[#C6F700]/50 focus:bg-[#1B170D]/35"
                />
              </label>
              <label className="block">
                <span className="mb-2 block font-mono text-[9px] text-zinc-500">RECIPIENT</span>
                <input
                  inputMode="text"
                  autoComplete="off"
                  spellCheck={false}
                  value={intent.recipient}
                  onChange={(event) => updateIntent("recipient", event.target.value)}
                  placeholder="0x..."
                  className="h-11 w-full rounded-xl border border-zinc-800 bg-black/45 px-3 font-mono text-[10px] text-zinc-200 outline-none transition focus:border-[#C6F700]/50 focus:bg-[#1B170D]/35"
                />
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className="block">
                  <span className="mb-2 block font-mono text-[9px] text-zinc-500">INPUT AMOUNT (ETH)</span>
                  <input
                    type="number"
                    min="0"
                    step="any"
                    required
                    value={intent.amountEth}
                    onChange={(event) => updateIntent("amountEth", event.target.value)}
                    className="h-11 w-full rounded-xl border border-zinc-800 bg-black/45 px-3 font-mono text-xs text-zinc-200 outline-none transition focus:border-[#C6F700]/50 focus:bg-[#1B170D]/35"
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block font-mono text-[9px] text-zinc-500">MAX SLIPPAGE (%)</span>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    required
                    value={intent.slippagePercent}
                    onChange={(event) => updateIntent("slippagePercent", event.target.value)}
                    className="h-11 w-full rounded-xl border border-zinc-800 bg-black/45 px-3 font-mono text-xs text-zinc-200 outline-none transition focus:border-[#C6F700]/50 focus:bg-[#1B170D]/35"
                  />
                </label>
              </div>
            </div>

            {message ? <p role="status" className="mt-4 text-[10px] leading-5 text-rose-300">{message}</p> : null}
            <button type="submit" className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[#C6F700] text-xs font-semibold text-[#1B170D] transition-all duration-300 hover:bg-[#d6ff1a] hover:shadow-[0_0_30px_rgba(198,247,0,0.24)]">
              <Code2 size={14} /> Compile preview
            </button>
            <div className="mt-4 flex gap-2 rounded-xl border border-[#C6F700]/10 bg-[#1B170D]/65 p-3 text-[9px] leading-5 text-zinc-400">
              <ShieldAlert size={13} className="mt-0.5 shrink-0 text-[#C6F700]/75" />
              JSON-RPC method shown for integration context only. A generic <code className="font-mono text-zinc-300">eth_sendRawTransaction</code> does not guarantee private routing.
            </div>
          </form>

          <div className="overflow-hidden rounded-3xl border border-zinc-800/70 bg-[#080a0b]/90 shadow-[0_0_50px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
            <div className="flex items-center justify-between border-b border-zinc-800/70 px-4 py-4 sm:px-5">
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#C6F700]/15 bg-[#1B170D]/55 text-[#C6F700]"><Code2 size={14} /></span>
                <div>
                  <p className="font-mono text-[8px] tracking-[0.15em] text-zinc-600">PAYLOAD OUTPUT</p>
                  <p className="mt-1 text-[10px] text-zinc-300">robinhood-private.preview.json</p>
                </div>
              </div>
              <button type="button" onClick={copyPayload} className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-800 px-2.5 py-1.5 font-mono text-[8px] text-zinc-400 transition hover:border-[#C6F700]/35 hover:text-[#C6F700]">
                {copied ? <Check size={11} /> : <Clipboard size={11} />}
                {copied ? "COPIED" : "COPY"}
              </button>
            </div>
            <div className="flex items-center justify-between border-b border-zinc-800/60 bg-black/35 px-4 py-2 font-mono text-[8px] text-zinc-600 sm:px-5">
              <span>JSON-RPC · WEBSOCKET FORMAT</span>
              <span>LOCAL ONLY</span>
            </div>
            <pre className="min-h-[400px] overflow-x-auto bg-[#1B170D]/20 p-4 font-mono text-[10px] leading-[1.85] text-[#d6ff1a]/85 sm:p-5 sm:text-[11px]">
              <code>{JSON.stringify(payload, null, 2)}</code>
            </pre>
            <div className="border-t border-zinc-800/70 px-4 py-3 font-mono text-[8px] text-zinc-600 sm:px-5">
              {compiledIntent ? "PREVIEW COMPILED LOCALLY · NOT SIGNED OR SENT" : "FILL IN THE FORM TO COMPILE A LOCAL PREVIEW"}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
