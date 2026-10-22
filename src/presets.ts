import type { LimitedPermissionPlan } from "./types";
import { demoGameplayPlan } from "./plans";

/** Claim-only surface — narrowest educational example. */
export function presetClaimOnly(): LimitedPermissionPlan {
  return {
    permissionName: "claim",
    parent: "active",
    publicKey: "PUB_K1_EXAMPLE_CLAIM_ONLY",
    linkedActions: [{ contract: "pxfarmer.game", action: "claim" }],
    riskNote:
      "Claim-only link. Still revoke if the key leaks; never reuse for transfer.",
  };
}

/** Ranking / Hot-or-Not style vote memo pattern (illustrative contract names). */
export function presetRankingVote(): LimitedPermissionPlan {
  return {
    permissionName: "vote",
    parent: "active",
    publicKey: "PUB_K1_EXAMPLE_VOTE_ONLY",
    linkedActions: [
      { contract: "hot.pxj", action: "vote" },
      { contract: "eosio.token", action: "transfer" },
    ],
    riskNote:
      "If vote is paid via transfer, linking eosio.token::transfer is high risk — prefer a dedicated vote action without open transfer. This preset is a cautionary example.",
  };
}

export const PRESET_CATALOG: Array<{
  id: string;
  label: string;
  build: () => LimitedPermissionPlan;
}> = [
  { id: "gameplay", label: "PxFarmer gameplay", build: demoGameplayPlan },
  { id: "claim", label: "Claim only", build: presetClaimOnly },
  { id: "vote", label: "Vote (caution)", build: presetRankingVote },
];
