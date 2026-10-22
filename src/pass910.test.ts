import { describe, expect, it } from "vitest";
import { comparePresetSeverities } from "./comparePresets";

describe("comparePresetSeverities", () => {
  it("orders higher risk first", () => {
    const rows = comparePresetSeverities();
    expect(rows.length).toBeGreaterThanOrEqual(3);
    for (let i = 1; i < rows.length; i++) {
      expect(rows[i - 1].severity.score).toBeGreaterThanOrEqual(
        rows[i].severity.score
      );
    }
    const vote = rows.find((r) => r.id === "vote");
    const claim = rows.find((r) => r.id === "claim");
    expect(vote && claim && vote.severity.score >= claim.severity.score).toBe(
      true
    );
  });
});
