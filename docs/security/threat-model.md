# Threat Model

## Phase 0 Scope

This model covers the scaffold, architecture boundaries, and initial data model. Domain-specific threat notes must be added before implementing identity, messaging, payments, mini-app runtime, or moderation workflows.

## Key Assets

- Account identifiers, sessions, devices, and consent records.
- Private message metadata and future message contents.
- Merchant verification data.
- Booking, coupon, order, and payment-intent metadata.
- Moderation reports, appeals, and audit logs.
- Mini-app manifests, permissions, launch events, and webhook events.

## Primary Threats

- Unauthorized access to private communications or sensitive profile data.
- PII leakage through logs, traces, analytics, or support tooling.
- Abuse of reports, appeals, channels, communities, or merchant profiles.
- Privilege escalation in admin and moderation workflows.
- Mini-app permission abuse or token replay.
- Payment webhook spoofing, replay, or idempotency failures.
- Vendor, storage, or observability misconfiguration.

## Baseline Controls

- Strict TypeScript and validation at API boundaries.
- Centralized error handling and structured redacted logs.
- Feature flags for unfinished behavior.
- Audit logs for sensitive administrative and moderation actions.
- PSP abstraction only; no wallet, card storage, or bank credential storage.
- Cryptography integration boundary only; no custom production cryptography.
