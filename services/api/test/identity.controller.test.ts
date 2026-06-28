import { describe, expect, it } from "vitest";
import { IdentityController } from "../src/modules/identity/identity.controller.js";
import { InMemoryIdentityRepository } from "../src/modules/identity/identity.repository.js";
import {
  ConsentLedgerService,
  DataRightsService,
  PrivacySettingsService
} from "../src/modules/identity/identity.service.js";

const userId = "00000000-0000-4000-8000-000000000001";

function createController() {
  const repository = new InMemoryIdentityRepository();

  return {
    controller: new IdentityController(
      new PrivacySettingsService(repository),
      new ConsentLedgerService(repository),
      new DataRightsService(repository)
    ),
    repository
  };
}

describe("IdentityController", () => {
  it("exposes conservative privacy defaults for a user", async () => {
    const { controller } = createController();

    await expect(controller.getPrivacyDefaults(userId)).resolves.toEqual({
      userId,
      discoverableByEmail: false,
      discoverableByPhone: false,
      allowBusinessMessages: true,
      allowPersonalizedFeed: false
    });
  });

  it("records consent and data-rights intake commands", async () => {
    const { controller, repository } = createController();

    await expect(
      controller.recordConsent({
        userId,
        consentKey: "privacy.terms",
        policyVersion: "2026-06-28",
        granted: true,
        lawfulBasis: "consent"
      })
    ).resolves.toMatchObject({ status: "recorded" });
    await expect(controller.requestDataExport({ userId })).resolves.toEqual({
      userId,
      requestType: "export",
      status: "requested"
    });
    await expect(controller.requestAccountDeletion({ userId })).resolves.toEqual({
      userId,
      requestType: "deletion",
      status: "requested"
    });

    expect(repository.consents).toHaveLength(1);
    expect(repository.dataExportRequests).toHaveLength(1);
    expect(repository.accountDeletionRequests).toHaveLength(1);
  });
});
