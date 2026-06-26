import { describe, expect, it } from "vitest";
import { getWorkerStatus } from "../src/index.js";

describe("worker skeleton", () => {
  it("starts with no production queues configured", () => {
    expect(getWorkerStatus()).toEqual({
      service: "worker",
      queuesConfigured: []
    });
  });
});
