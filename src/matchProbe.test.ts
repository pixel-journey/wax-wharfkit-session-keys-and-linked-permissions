import { describe, expect, it } from "vitest";
import { matchPlanToProbe } from "./matchProbe";
import { demoGameplayPlan } from "./plans";

describe("matchPlanToProbe", () => {
  it("detects missing permission", () => {
    const r = matchPlanToProbe(demoGameplayPlan(), [
      { perm_name: "active", parent: "owner" },
    ]);
    expect(r.permissionPresent).toBe(false);
  });

  it("counts linked_actions matches", () => {
    const plan = demoGameplayPlan();
    const r = matchPlanToProbe(plan, [
      {
        perm_name: "gameplay",
        parent: "active",
        linked_actions: [
          { account: "pxfarm.game", action: "claim" },
          { account: "pxfarm.game", action: "harvest" },
        ],
      },
    ]);
    expect(r.permissionPresent).toBe(true);
    expect(r.linkedMatched).toBe(2);
    expect(r.linkedMissing).toContain("pxfarm.game::plant");
  });
});
