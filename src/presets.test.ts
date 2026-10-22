import { describe, expect, it } from "vitest";
import { validatePlan } from "./plans";
import { PRESET_CATALOG, presetClaimOnly, presetRankingVote } from "./presets";

describe("presets", () => {
  it("claim-only validates", () => {
    expect(validatePlan(presetClaimOnly())).toEqual([]);
  });

  it("vote preset validates but documents transfer risk", () => {
    const p = presetRankingVote();
    expect(validatePlan(p)).toEqual([]);
    expect(p.riskNote.toLowerCase()).toContain("transfer");
  });

  it("catalog has three entries", () => {
    expect(PRESET_CATALOG).toHaveLength(3);
  });
});
