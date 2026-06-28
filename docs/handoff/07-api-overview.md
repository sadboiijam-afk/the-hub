# API Overview

The API service is a NestJS shell only.

Current package:

- `services/api`

Current implemented surface:

- `GET /health` returns a typed health payload.
- Global validation pipe is configured in `main.ts`.
- `IdentityModule` is registered with DTOs and in-memory services for privacy defaults, consent ledger intake, and GDPR data-rights request intake.
- No domain HTTP endpoints are implemented beyond health.

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

Phase 1 API work:

- Identity module persistence and route integration.
- Auth/session flow.
- Device registration.
- Consent ledger.
- Privacy settings.
- Data export/delete request skeleton.

Do not add chat, payments, mini-app runtime, or moderation workflow endpoints until their planned phases.
