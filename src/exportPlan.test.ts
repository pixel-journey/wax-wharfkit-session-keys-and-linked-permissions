import { describe, expect, it } from "vitest";
import { demoGameplayPlan } from "./plans";
import { exportPlanMarkdown } from "./exportPlan";

describe("exportPlanMarkdown", () => {
  it("includes links and revocation section", () => {
    const md = exportPlanMarkdown("alice.wam", demoGameplayPlan());
    expect(md).toContain("alice.wam@gameplay");
    expect(md).toContain("pxfarm.game::claim");
    expect(md).toContain("Revocation checklist");
    expect(md).toContain("WharfKit");
    expect(md).toContain("eosjs");
  });
});
