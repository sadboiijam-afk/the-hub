import { describe, expect, it } from "vitest";
import { PrismaIdentityRepository } from "../src/modules/identity/identity.prisma.repository.js";

const userId = "00000000-0000-4000-8000-000000000001";

describe("PrismaIdentityRepository", () => {
  it("maps privacy settings to the existing UserPrivacySetting model", async () => {
    const writes: unknown[] = [];
    const repository = new PrismaIdentityRepository({
      userPrivacySetting: {
        upsert: async (input: unknown) => {
          writes.push(input);
          return input;
        }
      }
    });

    await expect(
      repository.savePrivacySettings({
        userId,
        discoverableByEmail: false,
        discoverableByPhone: false,
        allowBusinessMessages: true,
        allowPersonalizedFeed: false
      })
    ).resolves.toEqual({
      userId,
      discoverableByEmail: false,
      discoverableByPhone: false,
      allowBusinessMessages: true,
      allowPersonalizedFeed: false
    });
    expect(writes).toEqual([
      {
        where: { userId },
        update: {
          discoverableByEmail: false,
          discoverableByPhone: false,
          allowBusinessMessages: true,
          allowPersonalizedFeed: false
        },
        create: {
          userId,
          discoverableByEmail: false,
          discoverableByPhone: false,
          allowBusinessMessages: true,
          allowPersonalizedFeed: false
        }
      }
    ]);
  });

  it("maps identity intake records to existing Prisma models", async () => {
    const writes: {
      readonly consent: unknown[];
      readonly dataExportRequest: unknown[];
      readonly deletionRequest: unknown[];
    } = {
      consent: [],
      dataExportRequest: [],
      deletionRequest: []
    };
    const repository = new PrismaIdentityRepository({
      consent: {
        create: async (input: unknown) => {
          writes.consent.push(input);
          return input;
        }
      },
      dataExportRequest: {
        create: async (input: unknown) => {
          writes.dataExportRequest.push(input);
          return input;
        }
      },
      deletionRequest: {
        create: async (input: unknown) => {
          writes.deletionRequest.push(input);
          return input;
        }
      }
    });

    await repository.saveConsent({
      userId,
      consentKey: "privacy.terms",
      policyVersion: "2026-06-28",
      granted: true,
      lawfulBasis: "consent",
      status: "recorded"
    });
    await repository.saveDataExportRequest({
      userId,
      requestType: "export",
      status: "requested"
    });
    await repository.saveAccountDeletionRequest({
      userId,
      requestType: "deletion",
      reason: "user_request",
      status: "requested"
    });

    expect(writes).toEqual({
      consent: [
        {
          data: {
            userId,
            consentKey: "privacy.terms",
            policyVersion: "2026-06-28",
            granted: true,
            lawfulBasis: "consent"
          }
        }
      ],
      dataExportRequest: [
        {
          data: {
            userId,
            status: "requested"
          }
        }
      ],
      deletionRequest: [
        {
          data: {
            userId,
            reason: "user_request",
            status: "requested"
          }
        }
      ]
    });
  });
});
