import type { LimitedPermissionPlan } from "./types";
import { riskHintsForPlan } from "./riskHints";

export interface SeverityResult {
  /** 0 = calm, 100 = stop and redesign */
  score: number;
  label: "low" | "moderate" | "high" | "critical";
  dangerCount: number;
  warnCount: number;
}

export function planSeverity(plan: LimitedPermissionPlan): SeverityResult {
  const hints = riskHintsForPlan(plan);
  const dangerCount = hints.filter((h) => h.level === "danger").length;
  const warnCount = hints.filter((h) => h.level === "warn").length;
  let score = Math.min(100, dangerCount * 35 + warnCount * 12);
  if (plan.linkedActions.length === 0) score = Math.max(score, 15);
  let label: SeverityResult["label"] = "low";
  if (score >= 70) label = "critical";
  else if (score >= 45) label = "high";
  else if (score >= 20) label = "moderate";
  return { score, label, dangerCount, warnCount };
}
