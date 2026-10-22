/**
 * Optional soft-fail probe: fetch get_account and list permission names.
 * Never throws to callers; educational — not a full authority auditor.
 */

export interface PermissionNameRow {
  perm_name: string;
  parent: string;
}

export interface AccountProbeResult {
  ok: boolean;
  account?: string;
  permissions?: PermissionNameRow[];
  reason?: string;
}

const DEFAULT_RPC = "https://wax.greymass.com";

export async function probeAccountPermissions(
  account: string,
  rpcUrl: string = DEFAULT_RPC
): Promise<AccountProbeResult> {
  const name = account.trim();
  if (!name) return { ok: false, reason: "empty account" };

  try {
    const res = await fetch(`${rpcUrl.replace(/\/$/, "")}/v1/chain/get_account`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ account_name: name }),
    });
    if (!res.ok) {
      return { ok: false, reason: `HTTP ${res.status}` };
    }
    const data = (await res.json()) as {
      account_name?: string;
      permissions?: Array<{ perm_name: string; parent: string }>;
    };
    const permissions = (data.permissions ?? []).map((p) => ({
      perm_name: String(p.perm_name),
      parent: String(p.parent ?? ""),
    }));
    return {
      ok: true,
      account: data.account_name ?? name,
      permissions,
    };
  } catch (e) {
    return {
      ok: false,
      reason: e instanceof Error ? e.message : "fetch failed",
    };
  }
}
