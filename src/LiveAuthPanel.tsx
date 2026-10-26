'use client';

import React, { useEffect, useState } from 'react';
import {
  buildInstallSequence,
  buildRevokeSequence,
  type ChainAction,
} from './authActions';
import type { LimitedPermissionPlan } from './types';
import {
  actorString,
  createWaxSessionKit,
  type SessionKitLike,
  type SessionLike,
} from './sessionKit';

export type LiveAuthPanelProps = {
  account: string;
  plan: LimitedPermissionPlan;
};

/**
 * Confirm-gated live path for install / revoke sequences.
 * Requires a real public key on the plan — example PUB_K1 placeholders will fail on chain.
 */
export function LiveAuthPanel({ account, plan }: LiveAuthPanelProps) {
  const [session, setSession] = useState<SessionLike | null>(null);
  const [kit, setKit] = useState<SessionKitLike | null>(null);
  const [wallets, setWallets] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [mode, setMode] = useState<'install' | 'revoke'>('install');
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const r = await createWaxSessionKit();
      if (cancelled || !r.ok) return;
      setKit(r.kit);
      setWallets(r.wallets);
      try {
        const restored = await r.kit.restore();
        if (!cancelled && restored) {
          setSession(restored);
          setStatus(`Restored ${actorString(restored)}`);
        }
      } catch {
        /* none */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const login = async () => {
    setBusy(true);
    let active = kit;
    if (!active) {
      const r = await createWaxSessionKit();
      if (!r.ok) {
        setStatus(r.reason);
        setBusy(false);
        return;
      }
      active = r.kit;
      setKit(r.kit);
      setWallets(r.wallets);
    }
    try {
      const { session: s } = await active.login();
      setSession(s);
      setStatus(`Logged in as ${actorString(s)}`);
    } catch (e) {
      setStatus(e instanceof Error ? e.message : 'login failed');
    }
    setBusy(false);
  };

  const run = async () => {
    if (!session) {
      setStatus('Login first');
      return;
    }
    if (!confirmed) {
      setStatus('Confirm required');
      return;
    }
    if (plan.publicKey.includes('EXAMPLE') || plan.publicKey.includes('DO_NOT_USE')) {
      setStatus('Replace placeholder publicKey with a real PUB_K1 key before broadcast');
      return;
    }
    setBusy(true);
    const seq: ChainAction[] =
      mode === 'install'
        ? buildInstallSequence(account, plan)
        : buildRevokeSequence(account, plan);
    try {
      await session.transact({ actions: seq });
      setStatus(`${mode} submitted (${seq.length} actions) — verify on explorer`);
    } catch (e) {
      setStatus(
        e instanceof Error ? `${mode} soft-fail: ${e.message}` : `${mode} failed`
      );
    }
    setConfirmed(false);
    setBusy(false);
  };

  return (
    <div className="rounded-2xl border border-amber-500/40 bg-black/50 p-4 space-y-3 mt-6">
      <h3 className="text-sm tracking-widest text-amber-400">LIVE WHARFKIT (GUARDED)</h3>
      <p className="text-[11px] opacity-70">
        Wallets: <strong>Anchor</strong> + <strong>My Cloud Wallet</strong> only.
        Install = updateauth + linkauth×N. Revoke = unlinkauth×N + deleteauth.
        Never put owner keys in the browser.
      </p>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          disabled={busy}
          onClick={() => void login()}
          className="px-3 py-2 rounded-xl text-sm bg-sky-900 disabled:opacity-50"
        >
          {session ? `Session: ${actorString(session)}` : 'Login'}
        </button>
        <button
          type="button"
          className={`px-2 py-1 rounded text-[10px] ${
            mode === 'install' ? 'bg-emerald-800' : 'bg-white/10'
          }`}
          onClick={() => setMode('install')}
        >
          install
        </button>
        <button
          type="button"
          className={`px-2 py-1 rounded text-[10px] ${
            mode === 'revoke' ? 'bg-emerald-800' : 'bg-white/10'
          }`}
          onClick={() => setMode('revoke')}
        >
          revoke
        </button>
      </div>
      {wallets.length > 0 && (
        <p className="text-[10px] opacity-50">Plugins: {wallets.join(', ')}</p>
      )}
      <label className="flex items-center gap-2 text-xs">
        <input
          type="checkbox"
          checked={confirmed}
          onChange={(e) => setConfirmed(e.target.checked)}
        />
        I understand this may change account permissions on WAX for mode:{' '}
        <span className="font-mono text-amber-300">{mode}</span>
      </label>
      <button
        type="button"
        disabled={busy || !session || !confirmed}
        onClick={() => void run()}
        className="w-full px-4 py-3 rounded-xl bg-amber-700 disabled:opacity-40 text-sm"
      >
        {busy ? 'Working…' : `Broadcast ${mode}`}
      </button>
      {status && (
        <p className="text-[11px] font-mono text-emerald-200/80" role="status">
          {status}
        </p>
      )}
    </div>
  );
}
