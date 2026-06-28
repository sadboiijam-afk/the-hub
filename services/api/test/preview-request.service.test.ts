import { ConflictException, NotFoundException } from "@nestjs/common";
import { describe, expect, it } from "vitest";
import { InMemoryPreviewRequestRepository } from "../src/modules/preview-requests/preview-request.repository.js";
import { PreviewRequestService } from "../src/modules/preview-requests/preview-request.service.js";

describe("PreviewRequestService", () => {
  it("creates a normalized preview request record", async () => {
    const service = new PreviewRequestService(new InMemoryPreviewRequestRepository());

    await expect(
      service.create({
        email: "Person@Example.COM ",
        role: "developer",
        consentGranted: true,
        name: " Person ",
        city: " Berlin ",
        country: " Germany ",
        message: " SDK access "
      })
    ).resolves.toMatchObject({
      email: "person@example.com",
      role: "developer",
      status: "new",
      consentGranted: true,
      name: "Person",
      city: "Berlin",
      country: "Germany",
      message: "SDK access"
    });
  });

  it("rejects duplicate email addresses", async () => {
    const service = new PreviewRequestService(new InMemoryPreviewRequestRepository());

    await service.create({
      email: "person@example.com",
      role: "user",
      consentGranted: true
    });

    await expect(
      service.create({
        email: "PERSON@example.com",
        role: "merchant",
        consentGranted: true
      })
    ).rejects.toBeInstanceOf(ConflictException);
  });

  it("lists and updates preview request status for admin review", async () => {
    const service = new PreviewRequestService(new InMemoryPreviewRequestRepository());
    const request = await service.create({
      email: "merchant@example.com",
      role: "merchant",
      consentGranted: true
    });

    await expect(service.list()).resolves.toHaveLength(1);
    await expect(service.updateStatus(request.id, { status: "approved" })).resolves.toMatchObject({
      id: request.id,
      status: "approved"
    });
  });

  it("throws when updating a missing preview request", async () => {
    const service = new PreviewRequestService(new InMemoryPreviewRequestRepository());

    await expect(service.updateStatus("missing", { status: "declined" })).rejects.toBeInstanceOf(NotFoundException);
  });
});
