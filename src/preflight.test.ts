import { describe, expect, it } from "vitest";
import { preflightPlan } from "./preflight";
import { demoGameplayPlan } from "./plans";

describe("preflightPlan", () => {
  it("returns validation for demo plan", async () => {
    const r = await preflightPlan({
      account: "",
      plan: demoGameplayPlan(),
    });
    // empty account → probe fails; plan still validates
    expect(r.validationErrors.length).toBe(0);
    expect(r.probeOk).toBe(false);
  });
});
