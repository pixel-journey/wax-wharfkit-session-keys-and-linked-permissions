import { probeAccountPermissions } from "./accountProbe";
import { matchPlanToProbe, type MatchResult } from "./matchProbe";
import { validatePlan } from "./plans";
import type { LimitedPermissionPlan } from "./types";

export type PreflightResult = {
  ok: boolean;
  validationErrors: string[];
  probeOk: boolean;
  match?: MatchResult;
  summary: string[];
};

/**
 * Offline validation + optional live get_account match before install/revoke.
 */
export async function preflightPlan(input: {
  account: string;
  plan: LimitedPermissionPlan;
  rpcUrl?: string;
}): Promise<PreflightResult> {
  const validationErrors = validatePlan(input.plan);
  const summary: string[] = [];
  if (validationErrors.length) {
    summary.push(`Validation: ${validationErrors.length} issue(s)`);
  } else {
    summary.push("Validation: ok");
  }

  const probe = await probeAccountPermissions(input.account, input.rpcUrl);
  if (!probe.ok) {
    summary.push(`Probe soft-fail: ${probe.reason}`);
    return {
      ok: validationErrors.length === 0,
      validationErrors,
      probeOk: false,
      summary,
    };
  }

  const match = matchPlanToProbe(input.plan, probe.permissions);
  summary.push(...match.messages);

  return {
    ok: validationErrors.length === 0,
    validationErrors,
    probeOk: true,
    match,
    summary,
  };
}
