"use client";

import { useMemo, useState } from "react";
import { probeAccountPermissions } from "./accountProbe";
import { exportPlanMarkdown } from "./exportPlan";
import { installActionSketches, validatePlan } from "./plans";
import { PRESET_CATALOG } from "./presets";
import { RelatedBlueprints } from "./RelatedBlueprints";
import { riskHintsForPlan } from "./riskHints";
import type { LimitedPermissionPlan, LinkedAction } from "./types";
import {
  AVOID_FOR_GREENFIELD,
  RECOMMENDED_PACKAGES,
  WAX_MAINNET_CHAIN_ID,
  sessionArgsSketch,
} from "./wharfNotes";

export function PlanPlanner() {
  const [plan, setPlan] = useState<LimitedPermissionPlan>(() =>
    PRESET_CATALOG[0].build()
  );
  const [account, setAccount] = useState("alice.wam");
  const [newContract, setNewContract] = useState("pxfarmer.game");
  const [newAction, setNewAction] = useState("claim");
  const [message, setMessage] = useState<string | null>(null);
  const [probeText, setProbeText] = useState<string | null>(null);
  const [probing, setProbing] = useState(false);

  const errors = useMemo(() => validatePlan(plan), [plan]);
  const risks = useMemo(() => riskHintsForPlan(plan), [plan]);
  const installRows = useMemo(
    () => installActionSketches(account.trim() || "account", plan),
    [account, plan]
  );
  const sketch = useMemo(
    () =>
      sessionArgsSketch({
        actor: account.trim() || "alice.wam",
        permission: plan.permissionName,
        chainId: WAX_MAINNET_CHAIN_ID,
        rpcUrl: "https://wax.greymass.com",
      }),
    [account, plan.permissionName]
  );

  const addLink = () => {
    setPlan((p) => ({
      ...p,
      linkedActions: [
        ...p.linkedActions,
        { contract: newContract.trim(), action: newAction.trim() },
      ],
    }));
  };

  const removeLink = (idx: number) => {
    setPlan((p) => ({
      ...p,
      linkedActions: p.linkedActions.filter((_, i) => i !== idx),
    }));
  };

  const copyMd = async () => {
    try {
      await navigator.clipboard.writeText(
        exportPlanMarkdown(account.trim() || "account", plan)
      );
      setMessage("Plan markdown copied (includes revocation checklist)");
    } catch {
      setMessage("Clipboard unavailable");
    }
  };

  const runProbe = async () => {
    setProbing(true);
    setProbeText(null);
    const r = await probeAccountPermissions(account);
    setProbing(false);
    if (!r.ok) {
      setProbeText(`Probe soft-fail: ${r.reason ?? "unknown"}`);
      return;
    }
    const names = (r.permissions ?? [])
      .map((p) => `${p.perm_name} (parent ${p.parent || "—"})`)
      .join(", ");
    setProbeText(
      `Live permissions on ${r.account}: ${names || "(none listed)"}`
    );
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6 text-white">
      <header>
        <p className="text-xs uppercase tracking-widest text-emerald-400/80">
          Pixel Journey · WharfKit
        </p>
        <h1 className="text-2xl font-bold text-emerald-400 mt-1">
          Limited permission planner
        </h1>
        <p className="text-sm opacity-60 mt-2">
          Design a dApp “session key” (custom permission + linkauth). Not a live
          updateauth tool.
        </p>
      </header>

      <section
        className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-xs text-amber-100/90 space-y-2"
        role="note"
      >
        <p className="font-medium text-sm">Session Kit ≠ session key</p>
        <p>
          Session Kit = wallet login. Session key here = limited on-chain
          permission so routine game actions need not prompt the main wallet.
        </p>
        <p>Prefer: {RECOMMENDED_PACKAGES.slice(0, 3).join(", ")}…</p>
        <p className="opacity-80">
          Avoid for new work: {AVOID_FOR_GREENFIELD.join("; ")}.
        </p>
      </section>

      <section className="rounded-2xl border border-white/10 bg-black/40 p-4 space-y-3">
        <p className="text-xs opacity-70">Presets</p>
        <div className="flex flex-wrap gap-2">
          {PRESET_CATALOG.map((p) => (
            <button
              key={p.id}
              type="button"
              className="px-2 py-1 rounded-lg text-xs bg-white/10"
              onClick={() => {
                setPlan(p.build());
                setMessage(`Loaded preset: ${p.label}`);
              }}
            >
              {p.label}
            </button>
          ))}
        </div>
        <label className="block text-xs opacity-70">
          Account
          <input
            value={account}
            onChange={(e) => setAccount(e.target.value)}
            className="mt-1 w-full rounded-lg border border-white/15 bg-black/50 px-3 py-2 font-mono text-sm"
          />
        </label>
        <label className="block text-xs opacity-70">
          Permission name
          <input
            value={plan.permissionName}
            onChange={(e) =>
              setPlan((p) => ({ ...p, permissionName: e.target.value }))
            }
            className="mt-1 w-full rounded-lg border border-white/15 bg-black/50 px-3 py-2 font-mono text-sm"
          />
        </label>
        <label className="block text-xs opacity-70">
          Public key (placeholder OK in education)
          <input
            value={plan.publicKey}
            onChange={(e) =>
              setPlan((p) => ({ ...p, publicKey: e.target.value }))
            }
            className="mt-1 w-full rounded-lg border border-white/15 bg-black/50 px-3 py-2 font-mono text-sm"
          />
        </label>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="px-3 py-2 rounded-lg text-sm bg-sky-700"
            onClick={copyMd}
          >
            Copy plan markdown
          </button>
          <button
            type="button"
            className="px-3 py-2 rounded-lg text-sm bg-white/10"
            disabled={probing}
            onClick={runProbe}
          >
            {probing ? "Probing…" : "Probe get_account"}
          </button>
        </div>
        {probeText && (
          <p className="text-[11px] opacity-70 font-mono leading-relaxed">
            {probeText}
          </p>
        )}
      </section>

      <section className="rounded-2xl border border-white/10 bg-black/30 p-4 space-y-3">
        <h2 className="font-semibold text-emerald-300">Linked actions</h2>
        <ul className="space-y-2 text-sm font-mono">
          {plan.linkedActions.map((link, i) => (
            <li
              key={`${link.contract}-${link.action}-${i}`}
              className="flex justify-between gap-2 rounded-lg border border-white/10 px-3 py-2"
            >
              <span>
                {link.contract}::{link.action}
              </span>
              <button
                type="button"
                className="text-[10px] underline opacity-60"
                onClick={() => removeLink(i)}
              >
                remove
              </button>
            </li>
          ))}
        </ul>
        <div className="grid gap-2 sm:grid-cols-2">
          <input
            value={newContract}
            onChange={(e) => setNewContract(e.target.value)}
            placeholder="contract"
            className="rounded-lg border border-white/15 bg-black/50 px-3 py-2 font-mono text-sm"
          />
          <input
            value={newAction}
            onChange={(e) => setNewAction(e.target.value)}
            placeholder="action"
            className="rounded-lg border border-white/15 bg-black/50 px-3 py-2 font-mono text-sm"
          />
        </div>
        <button
          type="button"
          onClick={addLink}
          className="px-3 py-2 rounded-lg text-sm bg-emerald-700"
        >
          Add link
        </button>
      </section>

      {errors.length > 0 && (
        <ul className="text-xs text-amber-300 space-y-1">
          {errors.map((e) => (
            <li key={e}>{e}</li>
          ))}
        </ul>
      )}

      <ul className="text-xs space-y-1">
        {risks.map((h) => (
          <li
            key={h.message}
            className={
              h.level === "danger"
                ? "text-red-300"
                : h.level === "warn"
                  ? "text-amber-300"
                  : "text-white/50"
            }
          >
            [{h.level}] {h.message}
          </li>
        ))}
      </ul>

      <section className="rounded-2xl border border-violet-500/30 bg-violet-500/10 p-4 space-y-2">
        <h2 className="font-semibold text-violet-100">Install sketch (not sent)</h2>
        <ol className="list-decimal pl-5 text-xs space-y-1 font-mono text-violet-100/90">
          {installRows.map((row) => (
            <li key={row.summary}>
              {row.account}::{row.name} — {row.summary}
            </li>
          ))}
        </ol>
        <p className="text-[11px] opacity-70">{plan.riskNote}</p>
      </section>

      <section className="rounded-2xl border border-white/10 bg-black/30 p-4 text-xs space-y-2 opacity-90">
        <h2 className="font-semibold text-sm text-white">Revocation checklist</h2>
        <ol className="list-decimal pl-5 space-y-1 leading-relaxed">
          <li>Remove the limited key from the dApp / local storage.</li>
          <li>
            <code className="text-[10px]">unlinkauth</code> each linked action.
          </li>
          <li>
            <code className="text-[10px]">updateauth</code> to drop the key or
            permission.
          </li>
          <li>
            Confirm with <code className="text-[10px]">get_account</code>.
          </li>
        </ol>
      </section>

      {message && (
        <p className="text-xs text-emerald-200/80" role="status">
          {message}
        </p>
      )}

      <details className="text-[10px] opacity-50">
        <summary>Session args sketch for limited permission</summary>
        <pre className="overflow-x-auto mt-2 whitespace-pre-wrap">{sketch}</pre>
      </details>

      <RelatedBlueprints />
    </div>
  );
}
