import { describe, expect, it } from "vitest";
import { adminQueues, phaseZeroModules } from "../src/index.js";

describe("shared phase metadata", () => {
  it("keeps Phase 0 module metadata reviewable", () => {
    expect(phaseZeroModules.length).toBeGreaterThanOrEqual(6);
    expect(phaseZeroModules.some((module) => module.name === "Payments")).toBe(true);
  });

  it("keeps admin queues gated to later phases", () => {
    expect(adminQueues.every((queue) => queue.phase === "phase-7")).toBe(true);
  });
});
