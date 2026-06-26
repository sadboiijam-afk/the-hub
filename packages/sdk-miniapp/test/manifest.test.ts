import { describe, expect, it } from "vitest";
import { validateManifestShape } from "../src/index.js";

describe("mini-app manifest skeleton", () => {
  it("requires HTTPS entry URLs", () => {
    expect(
      validateManifestShape({
        appId: "booking-demo",
        name: "Booking Demo",
        version: "0.0.1",
        entryUrl: "https://example.test/miniapp",
        permissions: ["booking:create"]
      })
    ).toBe(true);
  });
});
