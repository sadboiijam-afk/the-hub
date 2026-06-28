import "reflect-metadata";
import { type INestApplication, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import type { IncomingHttpHeaders } from "node:http";
import { AppModule } from "../src/app.module.js";
import type { RequestWithUser } from "../src/modules/identity/identity.auth.js";

const userId = "00000000-0000-4000-8000-000000000001";
const otherUserId = "00000000-0000-4000-8000-000000000002";

interface TestAuthRequest extends RequestWithUser {
  readonly headers: IncomingHttpHeaders;
}

describe("Identity HTTP routes", () => {
  let app: INestApplication;
  let baseUrl: string;

  beforeAll(async () => {
    app = await NestFactory.create(AppModule, {
      logger: false
    });
    app.useGlobalPipes(
      new ValidationPipe({
        forbidNonWhitelisted: true,
        transform: true,
        whitelist: true
      })
    );
    app.use((request: TestAuthRequest, _response: unknown, next: () => void) => {
      const header = request.headers["x-test-user-id"];
      const testUserId = Array.isArray(header) ? header[0] : header;

      if (testUserId !== undefined) {
        request.user = {
          userId: testUserId,
          authBoundary: "placeholder"
        };
      }

      next();
    });

    await app.listen(0);
    baseUrl = await app.getUrl();
  });

  afterAll(async () => {
    await app.close();
  });

  it("denies identity requests without request.user", async () => {
    const response = await fetch(`${baseUrl}/identity/privacy-defaults/${userId}`);

    expect(response.status).toBe(401);
  });

  it("requires request.user to match the privacy-defaults userId parameter", async () => {
    const response = await fetch(`${baseUrl}/identity/privacy-defaults/${otherUserId}`, {
      headers: { "x-test-user-id": userId }
    });

    expect(response.status).toBe(403);
  });

  it("rejects consent requests for another user", async () => {
    const response = await postJson("/identity/consents", {
      headers: { "x-test-user-id": userId },
      body: {
        userId: otherUserId,
        consentKey: "privacy.terms",
        policyVersion: "2026-06-28",
        granted: true,
        lawfulBasis: "consent"
      }
    });

    expect(response.status).toBe(403);
  });

  it("rejects data export requests for another user", async () => {
    const response = await postJson("/identity/data-export-requests", {
      headers: { "x-test-user-id": userId },
      body: { userId: otherUserId }
    });

    expect(response.status).toBe(403);
  });

  it("rejects deletion requests for another user", async () => {
    const response = await postJson("/identity/account-deletion-requests", {
      headers: { "x-test-user-id": userId },
      body: { userId: otherUserId }
    });

    expect(response.status).toBe(403);
  });

  it("rejects invalid userId route parameters", async () => {
    const response = await fetch(`${baseUrl}/identity/privacy-defaults/not-a-uuid`, {
      headers: { "x-test-user-id": userId }
    });

    expect(response.status).toBe(400);
  });

  it("rejects invalid consent lawfulBasis values", async () => {
    const response = await postJson("/identity/consents", {
      headers: { "x-test-user-id": userId },
      body: {
        userId,
        consentKey: "privacy.terms",
        policyVersion: "2026-06-28",
        granted: true,
        lawfulBasis: "unsupported_basis"
      }
    });

    expect(response.status).toBe(400);
  });

  async function postJson(
    path: string,
    options: { readonly headers: Record<string, string>; readonly body: unknown }
  ): Promise<Response> {
    return await fetch(`${baseUrl}${path}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...options.headers
      },
      body: JSON.stringify(options.body)
    });
  }
});
