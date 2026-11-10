export const ROBINHOOD_CHAIN = {
  name: "Robinhood Chain",
  chainId: 4663,
  chainIdHex: "0x1237",
  network: "mainnet",
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
  },
} as const;

export const ADDRESS_PATTERN = /^0x[a-fA-F0-9]{40}$/;
