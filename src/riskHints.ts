import type { LimitedPermissionPlan, LinkedAction } from "./types";

export interface RiskHint {
  level: "info" | "warn" | "danger";
  message: string;
}

const HIGH_VALUE_ACTIONS = new Set([
  "transfer",
  "updateauth",
  "deleteauth",
  "linkauth",
  "unlinkauth",
  "delegatebw",
  "undelegatebw",
  "buyram",
  "sellram",
  "regproducer",
]);

export function riskHintsForLink(link: LinkedAction): RiskHint[] {
  const hints: RiskHint[] = [];
  const key = `${link.contract}::${link.action}`;

  if (link.contract === "eosio.token" && link.action === "transfer") {
    hints.push({
      level: "danger",
      message: `${key} can move any token balance the permission can spend — avoid on session keys unless unavoidable.`,
    });
  } else if (link.contract === "eosio" && HIGH_VALUE_ACTIONS.has(link.action)) {
    hints.push({
      level: "danger",
      message: `${key} is account-control / resource surface — do not link to a dApp session key.`,
    });
  } else if (HIGH_VALUE_ACTIONS.has(link.action)) {
    hints.push({
      level: "warn",
      message: `${key} looks high-impact; double-check the ABI and amounts.`,
    });
  } else {
    hints.push({
      level: "info",
      message: `${key} looks like a routine contract action — still revoke if the key leaks.`,
    });
  }

  return hints;
}

export function riskHintsForPlan(plan: LimitedPermissionPlan): RiskHint[] {
  const out: RiskHint[] = [];
  if (plan.permissionName === "active" || plan.permissionName === "owner") {
    out.push({
      level: "danger",
      message: "Permission name must not be owner/active for a disposable session key.",
    });
  }
  if (plan.linkedActions.length === 0) {
    out.push({
      level: "warn",
      message: "No linked actions — the key cannot call contracts until linkauth runs.",
    });
  }
  for (const link of plan.linkedActions) {
    out.push(...riskHintsForLink(link));
  }
  const dangers = out.filter((h) => h.level === "danger").length;
  if (dangers >= 2) {
    out.push({
      level: "danger",
      message: "Multiple danger-level links — prefer splitting into narrower permissions.",
    });
  }
  return out;
}
