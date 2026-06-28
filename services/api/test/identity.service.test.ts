import { describe, expect, it } from "vitest";
import {
  ConsentLedgerService,
  DataRightsService,
  PrivacySettingsService
} from "../src/modules/identity/identity.service.js";

const userId = "00000000-0000-4000-8000-000000000001";

describe("PrivacySettingsService", () => {
  it("creates conservative default privacy settings for a user", () => {
    expect(new PrivacySettingsService().createDefaultSettings(userId)).toEqual({
      userId,
      discoverableByEmail: false,
      discoverableByPhone: false,
      allowBusinessMessages: true,
      allowPersonalizedFeed: false
    });
  });
});

describe("ConsentLedgerService", () => {
  it("records the consent decision without storing sensitive metadata", () => {
    expect(
      new ConsentLedgerService().recordConsent({
        userId,
        consentKey: "privacy.terms",
        policyVersion: "2026-06-28",
        granted: true,
        lawfulBasis: "consent"
      })
    ).toEqual({
      userId,
      consentKey: "privacy.terms",
      policyVersion: "2026-06-28",
      granted: true,
      lawfulBasis: "consent",
      status: "recorded"
    });
  });
});

describe("DataRightsService", () => {
  it("creates data export and deletion request intake records", () => {
    const service = new DataRightsService();

    expect(service.createExportRequest({ userId })).toEqual({
      userId,
      requestType: "export",
      status: "requested"
    });
    expect(service.createDeletionRequest({ userId, reason: "user_request" })).toEqual({
      userId,
      requestType: "deletion",
      reason: "user_request",
      status: "requested"
    });
  });
});
