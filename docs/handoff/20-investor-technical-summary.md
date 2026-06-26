# Investor Technical Summary

LUCID Hub is being built as a privacy-first European super-app foundation for trusted local digital services. The technical strategy is deliberately conservative: modular monolith first, separate realtime service, clear package boundaries, PostgreSQL as the primary data store, Redis for cache/queues, and compliance-aware domain modeling from day one.

The first implementation pass is not a demo of finished features. It is a reviewable technical foundation that shows how the product can grow without becoming an ungoverned all-in-one application.

What exists now:

- Monorepo scaffold.
- Mobile, web, admin, API, realtime, and worker shells.
- Shared packages for types, config, UI, database, compliance, crypto boundary, and mini-app SDK.
- Prisma schema covering identity, messaging, communities, merchants, bookings, coupons, mini-apps, commerce, payment-intent records, moderation, notifications, audit logs, and feature flags.
- Privacy, DSA, threat model, roadmap, and handoff documentation.
- Local infrastructure config for PostgreSQL and Redis.
- CI validation workflow scaffold.

What is intentionally excluded from MVP foundation:

- Own wallet.
- Peer-to-peer payments.
- Card or bank credential storage.
- Custom production cryptography.
- AI training on private chats.
- Public admin deployment.

Why this matters:

- The platform can expand into messaging, local commerce, bookings, mini-apps, and regulated partner payments without compromising the initial trust posture.
- Compliance and moderation workflows are part of the architecture, not afterthoughts.
- The repository is set up to support focused engineering phases and investor-visible progress without overbuilding too early.

Immediate next milestone:

- Phase 1 identity foundation with validated auth/session/device handling, consent ledger, privacy settings, data export/delete request intake, schema migration, and tests.
