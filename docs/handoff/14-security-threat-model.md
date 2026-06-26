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
- No custom production cryptography.
- No wallet, card storage, or bank credential storage.

Required next work:

- Add domain-specific threat notes before implementing identity, messaging, payments, mini-app runtime, or moderation workflows.
- Add security tests for auth/session behavior in Phase 1.
- Define incident response and access review process before admin tooling goes live.
