import { describe, expect, it } from "vitest";
import {
  demoGameplayPlan,
  installActionSketches,
  validatePlan,
} from "./plans";

describe("validatePlan", () => {
  it("accepts demo gameplay plan", () => {
    expect(validatePlan(demoGameplayPlan())).toEqual([]);
  });

  it("rejects owner as permission name", () => {
    const bad = { ...demoGameplayPlan(), permissionName: "owner" };
    expect(validatePlan(bad).some((e) => e.includes("owner"))).toBe(true);
  });
});

describe("installActionSketches", () => {
  it("emits updateauth then linkauth rows", () => {
    const rows = installActionSketches("alice.wam", demoGameplayPlan());
    expect(rows[0].name).toBe("updateauth");
    expect(rows.some((r) => r.name === "linkauth")).toBe(true);
  });
});
