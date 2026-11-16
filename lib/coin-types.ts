/**
 * Decorative coin types for home-page animations. These illustrate the kinds of
 * value a private route on Robinhood Chain could carry — they are NOT a token
 * list, carry no prices or balances, and are not wired to the payload compiler
 * (which only handles the chain's native ETH; see lib/robinhood-chain.ts).
 */

export type CoinKind = "eth" | "usdg" | "stock" | "bridged" | "new" | "swap" | "launch" | "asset";

/** Coin material: lime body/ink face art, ink body/lime art, or cream body/ink art. */
export type CoinMaterial = "lime" | "ink" | "cream";

export type CoinType = {
  kind: CoinKind;
  label: string;
  group: "asset" | "intent";
  material: CoinMaterial;
  /** One honest line for the back of the coin in the flip strip. */
  description: string;
};

export const COIN_TYPES: Record<CoinKind, CoinType> = {
  eth: {
    kind: "eth",
    label: "ETH",
    group: "asset",
    material: "ink",
    description: "Robinhood Chain's native gas token. Every route pays its fees in ETH.",
  },
  usdg: {
    kind: "usdg",
    label: "USDG",
    group: "asset",
    material: "lime",
    description: "Dollar stablecoin transfers, designed to stay out of the public queue.",
  },
  stock: {
    kind: "stock",
    label: "STOCK",
    group: "asset",
    material: "cream",
    description: "Tokenized stock routes, designed to reduce front-running.",
  },
  bridged: {
    kind: "bridged",
    label: "BRIDGED",
    group: "asset",
    material: "ink",
    description: "Crypto bridged onto the chain, then routed privately on arrival.",
  },
  new: {
    kind: "new",
    label: "NEW",
    group: "asset",
    material: "lime",
    description: "Freshly launched tokens, designed to resist first-block sniping.",
  },
  swap: {
    kind: "swap",
    label: "SWAP",
    group: "intent",
    material: "lime",
    description: "Swap intents shaped and sealed before they reach a signer.",
  },
  launch: {
    kind: "launch",
    label: "LAUNCH",
    group: "intent",
    material: "ink",
    description: "Token launch transactions kept away from public watchers.",
  },
  asset: {
    kind: "asset",
    label: "ASSET",
    group: "intent",
    material: "cream",
    description: "Tokenized asset settlement with a private route as the target.",
  },
};

/** Display order: assets first, then intents. */
export const COIN_ORDER: CoinKind[] = ["eth", "usdg", "stock", "bridged", "new", "swap", "launch", "asset"];

export const COIN_CAPTION = "Asset types shown are illustrative · local preview";
