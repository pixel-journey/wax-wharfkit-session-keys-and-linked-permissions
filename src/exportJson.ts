import { exportPlanMarkdown } from "./exportPlan";
import { installActionSketches } from "./plans";
import { planSeverity } from "./severity";
import { revokeActionSketches } from "./revoke";
import { riskHintsForPlan } from "./riskHints";
import type { LimitedPermissionPlan } from "./types";

export function exportPlanJson(
  account: string,
  plan: LimitedPermissionPlan
): string {
  const payload = {
    trustLabel: "educational-reference",
    account,
    plan,
    severity: planSeverity(plan),
    risks: riskHintsForPlan(plan),
    installSketch: installActionSketches(account, plan),
    revokeSketch: revokeActionSketches(account, plan, {
      deletePermission: true,
    }),
    markdown: exportPlanMarkdown(account, plan),
  };
  return JSON.stringify(payload, null, 2);
}
