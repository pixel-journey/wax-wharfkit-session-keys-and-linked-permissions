import type { PermissionNameRow } from "./accountProbe";
import type { LimitedPermissionPlan } from "./types";

export interface MatchResult {
  permissionPresent: boolean;
  parentMatches: boolean | null;
  messages: string[];
}

/**
 * Compare a planned limited permission to rows from get_account.
 * Does not verify linkauth tables (those need separate table queries).
 */
export function matchPlanToProbe(
  plan: LimitedPermissionPlan,
  permissions: PermissionNameRow[] | undefined
): MatchResult {
  const messages: string[] = [];
  if (!permissions || permissions.length === 0) {
    return {
      permissionPresent: false,
      parentMatches: null,
      messages: ["No permission rows to compare (probe empty or failed)."],
    };
  }

  const row = permissions.find(
    (p) => p.perm_name === plan.permissionName
  );
  if (!row) {
    messages.push(
      `Permission "${plan.permissionName}" not found on account — install (updateauth) may not have run.`
    );
    return { permissionPresent: false, parentMatches: null, messages };
  }

  messages.push(`Found ${plan.permissionName} on-chain.`);
  const parentMatches =
    !plan.parent || row.parent === plan.parent || row.parent === "";
  if (plan.parent && row.parent && row.parent !== plan.parent) {
    messages.push(
      `Parent mismatch: plan says "${plan.parent}", chain has "${row.parent}".`
    );
  } else if (plan.parent) {
    messages.push(`Parent looks consistent with "${plan.parent}".`);
  }
  messages.push(
    "Note: linkauth targets are not listed in get_account permission rows — confirm links separately."
  );

  return {
    permissionPresent: true,
    parentMatches: plan.parent ? parentMatches : null,
    messages,
  };
}
