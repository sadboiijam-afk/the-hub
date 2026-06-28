import "reflect-metadata";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { describe, expect, it } from "vitest";
import { CreatePreviewRequestDto, UpdatePreviewRequestStatusDto } from "../src/modules/preview-requests/preview-request.dto.js";

describe("preview request DTO validation", () => {
  it("accepts a valid preview request command", async () => {
    const dto = plainToInstance(CreatePreviewRequestDto, {
      email: "person@example.com",
      role: "merchant",
      consentGranted: true,
      name: "Sophie Martin",
      city: "Paris",
      country: "France",
      message: "I want to test bookings and coupons."
    });

    await expect(validate(dto)).resolves.toEqual([]);
  });

  it("rejects invalid email, role, and missing consent", async () => {
    const dto = plainToInstance(CreatePreviewRequestDto, {
      email: "not-an-email",
      role: "operator",
      consentGranted: false
    });

    const errors = await validate(dto);

    expect(errors.map((error) => error.property).sort()).toEqual(["consentGranted", "email", "role"]);
  });

  it("accepts only supported admin status values", async () => {
    const valid = plainToInstance(UpdatePreviewRequestStatusDto, { status: "in_review" });
    const invalid = plainToInstance(UpdatePreviewRequestStatusDto, { status: "archived" });

    await expect(validate(valid)).resolves.toEqual([]);
    await expect(validate(invalid)).resolves.toHaveLength(1);
  });
});
