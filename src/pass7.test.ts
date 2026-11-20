import { describe, expect, it } from "vitest";
import { exportPlanJson } from "./exportJson";
import { demoGameplayPlan } from "./plans";
import { presetRankingVote } from "./presets";
import { planSeverity } from "./severity";
import { revokeActionSketches } from "./revoke";

describe("planSeverity", () => {
  it("gameplay is lower than vote caution", () => {
    expect(planSeverity(demoGameplayPlan())).toEqual({
      score: 0,
      label: "low",
      dangerCount: 0,
      warnCount: 0,
    });
    expect(planSeverity(presetRankingVote())).toEqual({
      score: 35,
      label: "moderate",
      dangerCount: 1,
      warnCount: 0,
    });
  });
});

describe("revokeActionSketches", () => {
  it("emits unlinkauth then deleteauth", () => {
    const steps = revokeActionSketches("alice.wam", demoGameplayPlan(), {
      deletePermission: true,
    });
    expect(steps.some((s) => s.name === "unlinkauth")).toBe(true);
    expect(steps[steps.length - 1].name).toBe("deleteauth");
  });
});

describe("exportPlanJson", () => {
  it("is valid JSON with severity", () => {
    const raw = exportPlanJson("alice.wam", demoGameplayPlan());
    const parsed = JSON.parse(raw);
    expect(parsed.severity.label).toBeTruthy();
    expect(parsed.installSketch.length).toBeGreaterThan(0);
  });
});
