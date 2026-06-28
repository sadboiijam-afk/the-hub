import "reflect-metadata";
import { type INestApplication, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import { AppModule } from "../src/app.module.js";

describe("Preview request HTTP routes", () => {
  let app: INestApplication;
  let baseUrl: string;
  const previousAdminEnabled = process.env.PREVIEW_ADMIN_ENABLED;
  const previousNodeEnv = process.env.NODE_ENV;

  beforeAll(async () => {
    app = await NestFactory.create(AppModule, { logger: false });
    app.useGlobalPipes(
      new ValidationPipe({
        forbidNonWhitelisted: true,
        transform: true,
        whitelist: true
      })
    );
    await app.listen(0);
    baseUrl = await app.getUrl();
  });

  afterEach(() => {
    if (previousAdminEnabled === undefined) {
      delete process.env.PREVIEW_ADMIN_ENABLED;
    } else {
      process.env.PREVIEW_ADMIN_ENABLED = previousAdminEnabled;
    }

    if (previousNodeEnv === undefined) {
      delete process.env.NODE_ENV;
    } else {
      process.env.NODE_ENV = previousNodeEnv;
    }
  });

  afterAll(async () => {
    await app.close();
  });

  it("creates preview requests through the public endpoint", async () => {
    const response = await postJson("/preview-requests", {
      email: "preview-http@example.com",
      role: "creator",
      consentGranted: true
    });

    expect(response.status).toBe(201);
    await expect(response.json()).resolves.toMatchObject({
      email: "preview-http@example.com",
      role: "creator",
      status: "new"
    });
  });

  it("rejects invalid preview request payloads", async () => {
    const response = await postJson("/preview-requests", {
      email: "invalid",
      role: "unknown",
      consentGranted: false
    });

    expect(response.status).toBe(400);
  });

  it("rejects duplicate email addresses through the public endpoint", async () => {
    const body = {
      email: "duplicate-http@example.com",
      role: "user",
      consentGranted: true
    };

    expect((await postJson("/preview-requests", body)).status).toBe(201);
    expect((await postJson("/preview-requests", body)).status).toBe(409);
  });

  it("keeps admin listing behind the development-only guard", async () => {
    delete process.env.PREVIEW_ADMIN_ENABLED;

    const response = await fetch(`${baseUrl}/preview-requests`);

    expect(response.status).toBe(403);
  });

  it("keeps admin status updates behind the development-only guard", async () => {
    delete process.env.PREVIEW_ADMIN_ENABLED;

    const response = await fetch(`${baseUrl}/preview-requests/missing/status`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ status: "approved" })
    });

    expect(response.status).toBe(403);
  });

  it("allows admin listing when explicitly enabled for development", async () => {
    process.env.PREVIEW_ADMIN_ENABLED = "true";

    const response = await fetch(`${baseUrl}/preview-requests`);

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual(expect.any(Array));
  });

  it("does not allow the development admin switch in production mode", async () => {
    process.env.PREVIEW_ADMIN_ENABLED = "true";
    process.env.NODE_ENV = "production";

    const response = await fetch(`${baseUrl}/preview-requests`);

    expect(response.status).toBe(403);
  });

  it("allows admin status updates when explicitly enabled for development", async () => {
    process.env.PREVIEW_ADMIN_ENABLED = "true";

    const createResponse = await postJson("/preview-requests", {
      email: "status-http@example.com",
      role: "community",
      consentGranted: true
    });
    const created = (await createResponse.json()) as { id: string };
    const updateResponse = await fetch(`${baseUrl}/preview-requests/${created.id}/status`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ status: "in_review" })
    });

    expect(updateResponse.status).toBe(200);
    await expect(updateResponse.json()).resolves.toMatchObject({
      id: created.id,
      status: "in_review"
    });
  });

  async function postJson(path: string, body: unknown): Promise<Response> {
    return await fetch(`${baseUrl}${path}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body)
    });
  }
});
