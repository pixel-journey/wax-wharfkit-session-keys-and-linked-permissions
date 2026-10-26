/**
 * Soft-fail get_account probe: permission names + linked_actions when present.
 */

export interface LinkedActionRow {
  account: string;
  action: string;
}

export interface PermissionNameRow {
  perm_name: string;
  parent: string;
  linked_actions?: LinkedActionRow[];
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
      permissions?: Array<{
        perm_name: string;
        parent: string;
        linked_actions?: Array<{ account?: string; action?: string }>;
      }>;
    };
    const permissions = (data.permissions ?? []).map((p) => ({
      perm_name: String(p.perm_name),
      parent: String(p.parent ?? ""),
      linked_actions: (p.linked_actions ?? [])
        .filter((l) => l.account && l.action)
        .map((l) => ({
          account: String(l.account),
          action: String(l.action),
        })),
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
