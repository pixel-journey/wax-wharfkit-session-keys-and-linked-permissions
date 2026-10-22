import type { LimitedPermissionPlan } from "./types";

export interface RevokeStep {
  account: string;
  name: string;
  summary: string;
}

/** Conceptual reverse of install — not broadcast. */
export function revokeActionSketches(
  account: string,
  plan: LimitedPermissionPlan,
  options?: { deletePermission?: boolean }
): RevokeStep[] {
  const steps: RevokeStep[] = [];
  for (const link of plan.linkedActions) {
    steps.push({
      account: "eosio",
      name: "unlinkauth",
      summary: `Unlink ${account}@${plan.permissionName} from ${link.contract}::${link.action}`,
    });
  }
  if (options?.deletePermission) {
    steps.push({
      account: "eosio",
      name: "deleteauth",
      summary: `Delete permission ${account}@${plan.permissionName}`,
    });
  } else {
    steps.push({
      account: "eosio",
      name: "updateauth",
      summary: `Optional: updateauth ${account}@${plan.permissionName} to remove keys (keep empty auth only if chain rules allow)`,
    });
  }
  return steps;
}
