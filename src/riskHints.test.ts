import { describe, expect, it } from "vitest";
import { demoGameplayPlan } from "./plans";
import { presetRankingVote } from "./presets";
import { riskHintsForPlan } from "./riskHints";

describe("riskHintsForPlan", () => {
  it("flags token transfer as danger", () => {
    const hints = riskHintsForPlan(presetRankingVote());
    expect(hints.some((h) => h.level === "danger" && h.message.includes("transfer"))).toBe(
      true
    );
  });

  it("gameplay links are mostly info", () => {
    const hints = riskHintsForPlan(demoGameplayPlan());
    expect(hints.every((h) => h.level !== "danger")).toBe(true);
  });
});
