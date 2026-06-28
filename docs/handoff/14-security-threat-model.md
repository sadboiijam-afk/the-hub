# Security Threat Model

The current threat model covers scaffold boundaries and initial data model only.

Key assets:

- Account identifiers.
- Sessions and devices.
- Consent records.
- Private message metadata and future contents.
- Merchant verification data.
- Booking, coupon, order, and payment-intent metadata.
- Moderation reports, appeals, and audit logs.
- Mini-app manifests, permissions, launches, and webhooks.

Primary threats:

- Unauthorized access to private communications or sensitive profile data.
- PII leakage through logs, traces, analytics, support tooling, or admin views.
- Abuse of reports, appeals, channels, communities, or merchant profiles.
- Privilege escalation in admin and moderation workflows.
- Mini-app permission abuse or token replay.
- Payment webhook spoofing or replay.
- Vendor, storage, or observability misconfiguration.

Baseline controls:

- Strict TypeScript.
- DTO validation at API boundaries.
- Centralized error handling.
- Structured redacted logs.
- Feature flags.
- Audit logs for sensitive operations.
- Placeholder identity auth boundary requiring an explicit authenticated user context.
- Self-access checks on current identity privacy/data-rights routes.
- No custom production cryptography.
- No wallet, card storage, or bank credential storage.

Identity-specific notes:

- Current identity routes must not be considered production-authenticated.
- `IdentityAuthBoundaryGuard` only proves the controller cannot run without an upstream user context.
- A production auth provider must verify sessions/devices and populate `AuthenticatedUserContext`.
- Route and body `userId` values are treated as targets only, never as proof of authorization.
- Before production exposure, identity routes need real auth/session validation, audit review, rate limiting, and route-level integration tests.
- HTTP-level tests currently prove the placeholder boundary denies missing request users, rejects cross-user access, and preserves validation failures.

Required next work:

- Add deeper domain-specific threat notes before implementing messaging, payments, mini-app runtime, or moderation workflows.
- Add security tests for auth/session behavior in Phase 1.
- Add rate limiting and suspicious-request audit rules for identity data-rights routes.
- Define incident response and access review process before admin tooling goes live.
