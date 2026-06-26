import { describe, expect, it } from "vitest";
import { HealthService } from "../src/modules/health/health.service.js";

describe("HealthService", () => {
  it("returns a stable health payload", () => {
    expect(new HealthService().getHealth()).toEqual({
      status: "ok",
      service: "api",
      version: "0.0.0"
    });
  });
});
