import type { AuthoritySketch, LimitedPermissionPlan, LinkedAction } from "./types";

const NAME = /^(?!.*\.\.)(?!\.)(?!.*\.$)[a-z1-5.]{1,12}$/;
const ACTION = /^[a-z1-5]{1,13}$/;
const PERM = /^[a-z1-5.]{1,13}$/;

export function validateLinkedAction(link: LinkedAction): string | null {
  if (!NAME.test(link.contract)) return `invalid contract: ${link.contract}`;
  if (!ACTION.test(link.action)) return `invalid action: ${link.action}`;
  return null;
}

export function validatePlan(plan: LimitedPermissionPlan): string[] {
  const errors: string[] = [];
  if (!PERM.test(plan.permissionName))
    errors.push("permissionName must be a valid Antelope name fragment");
  if (plan.permissionName === "owner" || plan.permissionName === "active")
    errors.push("do not reuse owner/active as the limited permission name");
  if (!plan.publicKey || plan.publicKey.length < 8)
    errors.push("publicKey placeholder looks empty");
  if (plan.linkedActions.length === 0)
    errors.push("link at least one contract::action or the key is useless");
  for (const link of plan.linkedActions) {
    const e = validateLinkedAction(link);
    if (e) errors.push(e);
  }
  return errors;
}

export function authorityFromPlan(plan: LimitedPermissionPlan): AuthoritySketch {
  return {
    threshold: 1,
    keys: [{ key: plan.publicKey, weight: 1 }],
  };
}

/** Educational gameplay-style plan — not a live chain config. */
export function demoGameplayPlan(): LimitedPermissionPlan {
  return {
    permissionName: "gameplay",
    parent: "active",
    publicKey: "PUB_K1_EXAMPLE_DO_NOT_USE_ON_MAINNET",
    linkedActions: [
      { contract: "pxfarmer.game", action: "claim" },
      { contract: "pxfarmer.game", action: "harvest" },
      { contract: "pxfarmer.game", action: "plant" },
    ],
    riskNote:
      "App may sign only linked actions. Keep owner/active offline or in a hardware wallet. Revoke via unlinkauth/updateauth if the key leaks.",
  };
}

/**
 * Conceptual eosio actions a wallet would sign once to install the plan.
 * This package does not broadcast them.
 */
export function installActionSketches(
  account: string,
  plan: LimitedPermissionPlan
): Array<{ account: string; name: string; summary: string }> {
  const auth = authorityFromPlan(plan);
  const out: Array<{ account: string; name: string; summary: string }> = [
    {
      account: "eosio",
      name: "updateauth",
      summary: `Create ${account}@${plan.permissionName} parent=${plan.parent} key=${auth.keys[0].key.slice(0, 12)}…`,
    },
  ];
  for (const link of plan.linkedActions) {
    out.push({
      account: "eosio",
      name: "linkauth",
      summary: `Link ${account}@${plan.permissionName} → ${link.contract}::${link.action}`,
    });
  }
  return out;
}
