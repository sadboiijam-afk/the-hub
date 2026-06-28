import "reflect-metadata";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import { describe, expect, it } from "vitest";
import {
  RecordConsentDto,
  RequestAccountDeletionDto,
  RequestDataExportDto
} from "../src/modules/identity/identity.dto.js";

describe("identity DTO validation", () => {
  it("accepts a valid consent ledger command", async () => {
    const dto = plainToInstance(RecordConsentDto, {
      userId: "00000000-0000-4000-8000-000000000001",
      consentKey: "privacy.terms",
      policyVersion: "2026-06-28",
      granted: true,
      lawfulBasis: "consent"
    });

    await expect(validate(dto)).resolves.toEqual([]);
  });

  it("rejects invalid user identifiers for GDPR request intake", async () => {
    const exportDto = plainToInstance(RequestDataExportDto, { userId: "not-a-uuid" });
    const deletionDto = plainToInstance(RequestAccountDeletionDto, {
      userId: "not-a-uuid",
      reason: "user_request"
    });

    expect(await validate(exportDto)).toHaveLength(1);
    expect(await validate(deletionDto)).toHaveLength(1);
  });
});
