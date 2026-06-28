# API Overview

The API service is a NestJS shell with health and early Phase 1 identity intake routes.

Current package:

- `services/api`

Current implemented surface:

- `GET /health` returns a typed health payload.
- Global validation pipe is configured in `main.ts`.
- `IdentityModule` exposes validated HTTP endpoints:
  - `GET /identity/privacy-defaults/:userId`
  - `POST /identity/consents`
  - `POST /identity/data-export-requests`
  - `POST /identity/account-deletion-requests`
- Identity services use an `IdentityRepository` interface boundary with an in-memory repository implementation for now.
- Identity audit events are redacted and do not store account deletion reasons.

Prototype-only:

- Identity routes are not authenticated yet.
- Identity data is not persisted to PostgreSQL yet.
- The in-memory repository exists only to stabilize service/controller boundaries before schema and migration review.

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
- PostgreSQL-backed identity repositories after Prisma relation/cascade review.
- Route integration tests with the real Nest application pipeline.
- Consent ledger, privacy settings, and data export/delete request persistence.

Do not add chat, payments, mini-app runtime, or moderation workflow endpoints until their planned phases.
