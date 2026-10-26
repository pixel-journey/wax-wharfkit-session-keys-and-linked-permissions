/**
 * Educational eosio authority action shapes for limited "session key" permissions.
 * Host signs via WharfKit session.transact — never store owner keys in the browser.
 */

import type { LimitedPermissionPlan } from "./types";
import { authorityFromPlan } from "./plans";

export type Auth = { actor: string; permission: string };

export type ChainAction = {
  account: string;
  name: string;
  authorization: Auth[];
  data: Record<string, unknown>;
};

export function buildUpdateAuthAction(input: {
  account: string;
  plan: LimitedPermissionPlan;
  authPermission?: string;
}): ChainAction {
  const auth = authorityFromPlan(input.plan);
  return {
    account: "eosio",
    name: "updateauth",
    authorization: [
      {
        actor: input.account,
        permission: input.authPermission ?? "active",
      },
    ],
    data: {
      account: input.account,
      permission: input.plan.permissionName,
      parent: input.plan.parent,
      auth: {
        threshold: auth.threshold,
        keys: auth.keys.map((k) => ({
          key: k.key,
          weight: k.weight,
        })),
        accounts: [],
        waits: [],
      },
    },
  };
}

export function buildLinkAuthAction(input: {
  account: string;
  permissionName: string;
  contract: string;
  action: string;
  authPermission?: string;
}): ChainAction {
  return {
    account: "eosio",
    name: "linkauth",
    authorization: [
      {
        actor: input.account,
        permission: input.authPermission ?? "active",
      },
    ],
    data: {
      account: input.account,
      code: input.contract,
      type: input.action,
      requirement: input.permissionName,
    },
  };
}

export function buildUnlinkAuthAction(input: {
  account: string;
  contract: string;
  action: string;
  authPermission?: string;
}): ChainAction {
  return {
    account: "eosio",
    name: "unlinkauth",
    authorization: [
      {
        actor: input.account,
        permission: input.authPermission ?? "active",
      },
    ],
    data: {
      account: input.account,
      code: input.contract,
      type: input.action,
    },
  };
}

export function buildDeleteAuthAction(input: {
  account: string;
  permissionName: string;
  authPermission?: string;
}): ChainAction {
  return {
    account: "eosio",
    name: "deleteauth",
    authorization: [
      {
        actor: input.account,
        permission: input.authPermission ?? "active",
      },
    ],
    data: {
      account: input.account,
      permission: input.permissionName,
    },
  };
}

/** Full install sequence: updateauth then one linkauth per linked action. */
export function buildInstallSequence(
  account: string,
  plan: LimitedPermissionPlan
): ChainAction[] {
  const seq: ChainAction[] = [buildUpdateAuthAction({ account, plan })];
  for (const link of plan.linkedActions) {
    seq.push(
      buildLinkAuthAction({
        account,
        permissionName: plan.permissionName,
        contract: link.contract,
        action: link.action,
      })
    );
  }
  return seq;
}

export function buildRevokeSequence(
  account: string,
  plan: LimitedPermissionPlan
): ChainAction[] {
  const seq: ChainAction[] = [];
  for (const link of plan.linkedActions) {
    seq.push(
      buildUnlinkAuthAction({
        account,
        contract: link.contract,
        action: link.action,
      })
    );
  }
  seq.push(
    buildDeleteAuthAction({
      account,
      permissionName: plan.permissionName,
    })
  );
  return seq;
}
