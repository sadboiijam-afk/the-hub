import { UnauthorizedException } from "@nestjs/common";
import { describe, expect, it } from "vitest";
import {
  assertAuthenticatedSelfAccess,
  IdentityAuthBoundaryGuard
} from "../src/modules/identity/identity.auth.js";

const userId = "00000000-0000-4000-8000-000000000001";

describe("IdentityAuthBoundaryGuard", () => {
  it("requires an upstream authenticated user context", () => {
    const guard = new IdentityAuthBoundaryGuard();
    const context = {
      switchToHttp: () => ({
        getRequest: () => ({})
      })
    };

    expect(() => guard.canActivate(context as never)).toThrow(UnauthorizedException);
  });
});

describe("assertAuthenticatedSelfAccess", () => {
  it("authorizes only explicit self-access from the request user context", () => {
    expect(() =>
      assertAuthenticatedSelfAccess(
        {
          userId,
          authBoundary: "placeholder"
        },
        userId
      )
    ).not.toThrow();
  });
});
