/**
 * Educational notes for host apps. This package does not depend on @wharfkit/*
 * so unit tests stay pure — copy patterns into a real dApp carefully.
 */

export const RECOMMENDED_PACKAGES = [
  "@wharfkit/session",
  "@wharfkit/web-renderer",
  "@wharfkit/wallet-plugin-anchor",
  "@wharfkit/antelope",
  "@wharfkit/account",
] as const;

export const AVOID_FOR_GREENFIELD = [
  "eosjs",
  "@greymass/anchor-link (as primary app integration)",
  "universal-authenticator-library (UAL)",
] as const;

/**
 * Conceptual Session construction for a limited permission.
 * Host must supply a real signer for the limited key only.
 */
export function sessionArgsSketch(input: {
  actor: string;
  permission: string;
  chainId: string;
  rpcUrl: string;
}): string {
  return `// Educational — do not paste private keys into production frontends
// import { Session } from "@wharfkit/session"
// import { WalletPluginPrivateKey } from "@wharfkit/wallet-plugin-privatekey"

const sessionArgs = {
  chain: { id: "${input.chainId}", url: "${input.rpcUrl}" },
  actor: "${input.actor}",
  permission: "${input.permission}",
  // walletPlugin: new WalletPluginPrivateKey(LIMITED_KEY_ONLY),
};
`;
}

export const WAX_MAINNET_CHAIN_ID =
  "1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4";
