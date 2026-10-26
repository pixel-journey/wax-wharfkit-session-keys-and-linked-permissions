import { describe, expect, it } from "vitest";
import { PRESET_CATALOG, presetHarvestLoop, presetRankingVote } from "./presets";

describe("presets", () => {
  it("catalog has harvest and caution vote", () => {
    expect(PRESET_CATALOG.some((p) => p.id === "harvest")).toBe(true);
    expect(PRESET_CATALOG.some((p) => p.id === "vote")).toBe(true);
  });

  it("vote preset links transfer as caution", () => {
    const p = presetRankingVote();
    expect(
      p.linkedActions.some(
        (a) => a.contract === "eosio.token" && a.action === "transfer"
      )
    ).toBe(true);
    expect(p.riskNote.toLowerCase()).toContain("risk");
  });

  it("harvest has no token transfer", () => {
    const p = presetHarvestLoop();
    expect(
      p.linkedActions.every((a) => a.contract !== "eosio.token")
    ).toBe(true);
  });
});
