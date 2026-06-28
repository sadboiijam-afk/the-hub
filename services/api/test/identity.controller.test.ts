import { describe, expect, it } from "vitest";
import { ForbiddenException } from "@nestjs/common";
import { IdentityController } from "../src/modules/identity/identity.controller.js";
import { IdentityAuthBoundaryGuard } from "../src/modules/identity/identity.auth.js";
import { InMemoryIdentityRepository } from "../src/modules/identity/identity.repository.js";
import {
  ConsentLedgerService,
  DataRightsService,
  PrivacySettingsService
} from "../src/modules/identity/identity.service.js";

const userId = "00000000-0000-4000-8000-000000000001";
const otherUserId = "00000000-0000-4000-8000-000000000002";
const requestUser = {
  userId,
  authBoundary: "placeholder" as const
};

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
  it("requires the identity auth boundary guard", () => {
    expect(Reflect.getMetadata("__guards__", IdentityController)).toEqual([IdentityAuthBoundaryGuard]);
  });

  it("exposes conservative privacy defaults for a user", async () => {
    const { controller } = createController();

    await expect(controller.getPrivacyDefaults(userId, requestUser)).resolves.toEqual({
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
      controller.recordConsent(
        {
          userId,
          consentKey: "privacy.terms",
          policyVersion: "2026-06-28",
          granted: true,
          lawfulBasis: "consent"
        },
        requestUser
      )
    ).resolves.toMatchObject({ status: "recorded" });
    await expect(controller.requestDataExport({ userId }, requestUser)).resolves.toEqual({
      userId,
      requestType: "export",
      status: "requested"
    });
    await expect(controller.requestAccountDeletion({ userId }, requestUser)).resolves.toEqual({
      userId,
      requestType: "deletion",
      status: "requested"
    });

    expect(repository.consents).toHaveLength(1);
    expect(repository.dataExportRequests).toHaveLength(1);
    expect(repository.accountDeletionRequests).toHaveLength(1);
  });

  it("does not treat a userId parameter as authorization", async () => {
    const { controller } = createController();

    await expect(controller.getPrivacyDefaults(otherUserId, requestUser)).rejects.toBeInstanceOf(ForbiddenException);
  });

  it("rejects body userIds that do not match the authenticated user context", async () => {
    const { controller } = createController();

    await expect(controller.requestDataExport({ userId: otherUserId }, requestUser)).rejects.toBeInstanceOf(
      ForbiddenException
    );
  });
});
