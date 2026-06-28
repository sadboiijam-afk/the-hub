import { describe, expect, it } from "vitest";
import { InMemoryIdentityRepository } from "../src/modules/identity/identity.repository.js";
import {
  ConsentLedgerService,
  DataRightsService,
  PrivacySettingsService
} from "../src/modules/identity/identity.service.js";

const userId = "00000000-0000-4000-8000-000000000001";

describe("PrivacySettingsService", () => {
  it("creates conservative default privacy settings for a user", async () => {
    const repository = new InMemoryIdentityRepository();

    await expect(new PrivacySettingsService(repository).createDefaultSettings(userId)).resolves.toEqual({
      userId,
      discoverableByEmail: false,
      discoverableByPhone: false,
      allowBusinessMessages: true,
      allowPersonalizedFeed: false
    });
    expect(repository.privacySettings).toHaveLength(1);
  });
});

describe("ConsentLedgerService", () => {
  it("records the consent decision through the repository boundary", async () => {
    const repository = new InMemoryIdentityRepository();

    await expect(
      new ConsentLedgerService(repository).recordConsent({
        userId,
        consentKey: "privacy.terms",
        policyVersion: "2026-06-28",
        granted: true,
        lawfulBasis: "consent"
      })
    ).resolves.toEqual({
      userId,
      consentKey: "privacy.terms",
      policyVersion: "2026-06-28",
      granted: true,
      lawfulBasis: "consent",
      status: "recorded"
    });
    expect(repository.consents).toHaveLength(1);
  });
});

describe("DataRightsService", () => {
  it("creates data export and deletion request intake records", async () => {
    const repository = new InMemoryIdentityRepository();
    const service = new DataRightsService(repository);

    await expect(service.createExportRequest({ userId })).resolves.toEqual({
      userId,
      requestType: "export",
      status: "requested"
    });
    await expect(service.createDeletionRequest({ userId, reason: "user_request" })).resolves.toEqual({
      userId,
      requestType: "deletion",
      reason: "user_request",
      status: "requested"
    });
    expect(repository.dataExportRequests).toHaveLength(1);
    expect(repository.accountDeletionRequests).toHaveLength(1);
  });

  it("does not write deletion reasons to audit logs", async () => {
    const repository = new InMemoryIdentityRepository();
    const service = new DataRightsService(repository);

    await service.createDeletionRequest({
      userId,
      reason: "contains private deletion context"
    });

    expect(JSON.stringify(repository.auditEvents)).not.toContain("private deletion context");
  });
});
