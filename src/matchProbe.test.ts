import { describe, expect, it } from "vitest";
import { demoGameplayPlan } from "./plans";
import { matchPlanToProbe } from "./matchProbe";

describe("matchPlanToProbe", () => {
  it("detects missing permission", () => {
    const r = matchPlanToProbe(demoGameplayPlan(), [
      { perm_name: "active", parent: "owner" },
    ]);
    expect(r.permissionPresent).toBe(false);
  });

  it("finds gameplay under active", () => {
    const r = matchPlanToProbe(demoGameplayPlan(), [
      { perm_name: "active", parent: "owner" },
      { perm_name: "gameplay", parent: "active" },
    ]);
    expect(r.permissionPresent).toBe(true);
    expect(r.parentMatches).toBe(true);
  });
});
