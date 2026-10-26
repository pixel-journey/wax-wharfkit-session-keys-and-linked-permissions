import type { PermissionNameRow } from "./accountProbe";
import type { LimitedPermissionPlan } from "./types";

export interface MatchResult {
  permissionPresent: boolean;
  parentMatches: boolean | null;
  linkedMatched: number;
  linkedMissing: string[];
  messages: string[];
}

/** Compare planned limited permission + linkauth targets to get_account rows. */
export function matchPlanToProbe(
  plan: LimitedPermissionPlan,
  permissions: PermissionNameRow[] | undefined
): MatchResult {
  const messages: string[] = [];
  if (!permissions || permissions.length === 0) {
    return {
      permissionPresent: false,
      parentMatches: null,
      linkedMatched: 0,
      linkedMissing: plan.linkedActions.map(
        (l) => `${l.contract}::${l.action}`
      ),
      messages: ["No permission rows to compare (probe empty or failed)."],
    };
  }

  const row = permissions.find((p) => p.perm_name === plan.permissionName);
  if (!row) {
    messages.push(
      `Permission "${plan.permissionName}" not found — install (updateauth) may not have run.`
    );
    return {
      permissionPresent: false,
      parentMatches: null,
      linkedMatched: 0,
      linkedMissing: plan.linkedActions.map(
        (l) => `${l.contract}::${l.action}`
      ),
      messages,
    };
  }

  messages.push(`Found ${plan.permissionName} on-chain.`);
  const parentMatches =
    !plan.parent || row.parent === plan.parent || row.parent === "";
  if (plan.parent && row.parent && row.parent !== plan.parent) {
    messages.push(
      `Parent mismatch: plan "${plan.parent}" vs chain "${row.parent}".`
    );
  } else if (plan.parent) {
    messages.push(`Parent consistent with "${plan.parent}".`);
  }

  const onChain = new Set(
    (row.linked_actions ?? []).map((l) => `${l.account}::${l.action}`)
  );
  const missing: string[] = [];
  let matched = 0;
  for (const link of plan.linkedActions) {
    const key = `${link.contract}::${link.action}`;
    if (onChain.has(key)) matched += 1;
    else missing.push(key);
  }

  if (row.linked_actions && row.linked_actions.length > 0) {
    messages.push(
      `linked_actions on chain: ${row.linked_actions.length}; plan matches ${matched}/${plan.linkedActions.length}`
    );
  } else {
    messages.push(
      "No linked_actions on this permission in get_account (node may omit them, or none linked yet)."
    );
  }
  for (const m of missing) {
    messages.push(`Missing linkauth target: ${m}`);
  }

  return {
    permissionPresent: true,
    parentMatches: plan.parent ? parentMatches : null,
    linkedMatched: matched,
    linkedMissing: missing,
    messages,
  };
}
