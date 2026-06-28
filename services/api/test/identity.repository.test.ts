import { describe, expect, it } from "vitest";
import { InMemoryIdentityRepository } from "../src/modules/identity/identity.repository.js";

describe("InMemoryIdentityRepository", () => {
  it("stores immutable snapshots for identity intake records", async () => {
    const repository = new InMemoryIdentityRepository();
    const consent = await repository.saveConsent({
      userId: "00000000-0000-4000-8000-000000000001",
      consentKey: "privacy.terms",
      policyVersion: "2026-06-28",
      granted: true,
      lawfulBasis: "consent",
      status: "recorded"
    });

    (consent as { consentKey: string }).consentKey = "mutated";

    expect(repository.consents[0]?.consentKey).toBe("privacy.terms");
  });
});
