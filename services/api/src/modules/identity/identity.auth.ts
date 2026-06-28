import {
  CanActivate,
  createParamDecorator,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException
} from "@nestjs/common";

export interface AuthenticatedUserContext {
  readonly userId: string;
  readonly authBoundary: "placeholder";
}

export interface RequestWithUser {
  user?: AuthenticatedUserContext;
}

export const RequestUser = createParamDecorator((_data: unknown, context: ExecutionContext): AuthenticatedUserContext => {
  const request = context.switchToHttp().getRequest<RequestWithUser>();

  if (request.user === undefined) {
    throw new UnauthorizedException("Identity routes require an authenticated user context.");
  }

  return request.user;
});

@Injectable()
export class IdentityAuthBoundaryGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<RequestWithUser>();

    // SECURITY TODO: replace this placeholder with production auth/session verification before exposing identity routes.
    // SECURITY TODO: add identity-route rate limiting and audit review before production exposure.
    if (request.user === undefined) {
      throw new UnauthorizedException(
        "Identity routes require an upstream auth provider before production use."
      );
    }

    return true;
  }
}

export function assertAuthenticatedSelfAccess(user: AuthenticatedUserContext, targetUserId: string): void {
  if (user.userId !== targetUserId) {
    throw new ForbiddenException("Identity routes currently allow authenticated self-access only.");
  }
}
