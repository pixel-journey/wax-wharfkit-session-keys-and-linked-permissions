import type { LimitedPermissionPlan } from "./types";

export const PLAN_STORAGE_KEY = "pxj.session-key-plan.v1";

export interface StorageResult<T> {
  ok: boolean;
  value?: T;
  reason?: string;
}

function store(): Storage | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

export function savePlanDraft(
  account: string,
  plan: LimitedPermissionPlan,
  key: string = PLAN_STORAGE_KEY
): StorageResult<void> {
  const s = store();
  if (!s) return { ok: false, reason: "localStorage unavailable" };
  try {
    s.setItem(key, JSON.stringify({ account, plan, savedAt: new Date().toISOString() }));
    return { ok: true };
  } catch (e) {
    return { ok: false, reason: e instanceof Error ? e.message : "setItem failed" };
  }
}

export function loadPlanDraft(
  key: string = PLAN_STORAGE_KEY
): StorageResult<{ account: string; plan: LimitedPermissionPlan }> {
  const s = store();
  if (!s) return { ok: false, reason: "localStorage unavailable" };
  try {
    const raw = s.getItem(key);
    if (!raw) return { ok: false, reason: "no draft" };
    const parsed = JSON.parse(raw) as {
      account?: string;
      plan?: LimitedPermissionPlan;
    };
    if (!parsed.plan || !parsed.account) {
      return { ok: false, reason: "invalid draft shape" };
    }
    return { ok: true, value: { account: parsed.account, plan: parsed.plan } };
  } catch (e) {
    return { ok: false, reason: e instanceof Error ? e.message : "parse failed" };
  }
}

export function clearPlanDraft(key: string = PLAN_STORAGE_KEY): StorageResult<void> {
  const s = store();
  if (!s) return { ok: false, reason: "localStorage unavailable" };
  try {
    s.removeItem(key);
    return { ok: true };
  } catch (e) {
    return { ok: false, reason: e instanceof Error ? e.message : "remove failed" };
  }
}
