import { describe, expect, it } from "vitest";
import { createHelloMessage } from "../src/index.js";

describe("realtime skeleton", () => {
  it("creates a non-chat bootstrap message", () => {
    expect(createHelloMessage()).toEqual({
      type: "hello",
      service: "realtime",
      version: "0.0.0"
    });
  });
});
