# API Overview

The API service is a NestJS shell with health, early Phase 1 identity intake routes, and preview request intake.

Current package:

- `services/api`

Current implemented surface:

- `GET /health` returns a typed health payload.
- Global validation pipe is configured in `main.ts`.
- CORS is enabled for local web/admin development origins `http://localhost:3000` and `http://localhost:3001`.
- `PreviewRequestModule` exposes:
  - `POST /preview-requests` for public waitlist/preview intake.
  - `GET /preview-requests` for development-only admin review.
  - `PATCH /preview-requests/:id/status` for development-only status updates.
- `IdentityModule` exposes validated HTTP endpoints:
  - `GET /identity/privacy-defaults/:userId`
  - `POST /identity/consents`
  - `POST /identity/data-export-requests`
  - `POST /identity/account-deletion-requests`
- Identity services use an `IdentityRepository` interface boundary with an in-memory repository implementation for now.
- `PrismaIdentityRepository` maps identity privacy/data-rights records to existing Prisma model names through a structural client interface, but it is not wired into `IdentityModule` yet.
- Identity audit events are redacted and do not store account deletion reasons.
- Identity routes are decorated with `IdentityAuthBoundaryGuard` and require an explicit `AuthenticatedUserContext`.
- Identity controllers enforce self-access checks so route/body `userId` values cannot act as authorization by themselves.
- HTTP-level tests cover missing request users, cross-user denial, invalid UUIDs, and invalid consent lawful bases.
- Preview request tests cover DTO validation, email normalization, duplicate email rejection, status updates, invalid payload rejection, and the development-only admin guard.

Prototype-only:

- Identity auth is a placeholder boundary only. No production password, session, JWT, OAuth, or device authentication is implemented yet.
- Preview request admin endpoints are protected only by `PREVIEW_ADMIN_ENABLED=true` outside `NODE_ENV=production`; this is a development-only guard, not production authorization.
- Preview request storage is currently in-memory at runtime even though a Prisma model now exists.
- Identity data is not persisted to PostgreSQL yet.
- The in-memory repository exists only to stabilize service/controller boundaries before schema and migration review.
- The Prisma repository adapter is covered by fake-client tests only and does not connect to a live database.

Required API standards:

- TypeScript strict mode.
- DTO validation for every endpoint.
- Authentication and authorization for all non-public endpoints.
- Centralized error handling.
- Structured logs with PII redaction.
- No private message contents, auth secrets, payment data, raw tokens, or sensitive personal data in logs.
- Audit-relevant events for security-sensitive workflows.
- Tests for every domain service.
- Integration tests for critical routes.

Remaining Phase 1 API work:

- Auth/session flow.
- Device registration.
- Production implementation of the request-user/auth provider that feeds `AuthenticatedUserContext`.
- Rate limiting and audit review for identity privacy/data-rights endpoints.
- PostgreSQL-backed identity repositories after Prisma relation/cascade review.
- Dependency injection switch from `InMemoryIdentityRepository` to a real Prisma client provider after migration review.
- Broader route integration tests with the real Nest application pipeline.
- Consent ledger, privacy settings, and data export/delete request persistence.
- Wire preview requests to a reviewed Prisma repository and migration after schema review.
- Replace the preview request admin development switch with authenticated admin authorization and audit logging.

Do not add chat, payments, mini-app runtime, or moderation workflow endpoints until their planned phases.
