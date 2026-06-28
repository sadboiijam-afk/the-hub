import { CanActivate, ForbiddenException, Injectable } from "@nestjs/common";

@Injectable()
export class PreviewRequestAdminGuard implements CanActivate {
  canActivate(): boolean {
    // TODO(security): Replace this development-only switch with authenticated admin authorization before production.
    if (process.env.NODE_ENV !== "production" && process.env.PREVIEW_ADMIN_ENABLED === "true") {
      return true;
    }

    throw new ForbiddenException("Preview request admin endpoints are development-only until admin auth is implemented.");
  }
}
