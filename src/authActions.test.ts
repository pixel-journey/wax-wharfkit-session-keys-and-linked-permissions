import { describe, expect, it } from "vitest";
import {
  buildInstallSequence,
  buildRevokeSequence,
} from "./authActions";
import { demoGameplayPlan } from "./plans";

describe("authActions", () => {
  it("install starts with updateauth and linkauth per action", () => {
    const plan = demoGameplayPlan();
    const seq = buildInstallSequence("alice.wam", plan);
    expect(seq[0].name).toBe("updateauth");
    expect(seq.filter((a) => a.name === "linkauth")).toHaveLength(
      plan.linkedActions.length
    );
  });
  it("revoke unlinks then deleteauth", () => {
    const plan = demoGameplayPlan();
    const seq = buildRevokeSequence("alice.wam", plan);
    expect(seq[seq.length - 1].name).toBe("deleteauth");
    expect(seq.filter((a) => a.name === "unlinkauth").length).toBe(
      plan.linkedActions.length
    );
  });
});
