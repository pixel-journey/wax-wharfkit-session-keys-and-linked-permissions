'use client';

import React, { useState } from 'react';
import { LiveAuthPanel } from '../src/LiveAuthPanel';
import { PlanPlanner } from '../src/PlanPlanner';
import { demoGameplayPlan } from '../src/plans';
import type { LimitedPermissionPlan } from '../src/types';

export default function Page() {
  const [account, setAccount] = useState('alice.wam');
  const [plan, setPlan] = useState<LimitedPermissionPlan>(() => demoGameplayPlan());

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6 max-w-3xl mx-auto">
      <PlanPlanner />
      <label className="block text-xs opacity-70 mt-8">
        Account for live install/revoke
        <input
          className="w-full mt-1 bg-black/60 border border-white/10 rounded-xl px-3 py-2 font-mono text-sm"
          value={account}
          onChange={(e) => setAccount(e.target.value)}
        />
      </label>
      <button
        type="button"
        className="text-[10px] underline opacity-70 mt-2"
        onClick={() => setPlan(demoGameplayPlan())}
      >
        reset plan to demo gameplay
      </button>
      <LiveAuthPanel account={account} plan={plan} />
    </div>
  );
}
