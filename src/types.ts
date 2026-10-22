/**
 * Educational models for limited dApp permissions ("session keys").
 * Not the same as WharfKit SessionKit login sessions.
 */

export interface LinkedAction {
  contract: string;
  action: string;
}

export interface LimitedPermissionPlan {
  /** Permission name under active, e.g. gameplay */
  permissionName: string;
  parent: "active" | string;
  /** Public key string (PUB_K1_… / EOS…) — educational placeholder OK */
  publicKey: string;
  linkedActions: LinkedAction[];
  /** Human note: never put owner/active keys in the browser */
  riskNote: string;
}

export interface AuthoritySketch {
  threshold: number;
  keys: Array<{ key: string; weight: number }>;
}
