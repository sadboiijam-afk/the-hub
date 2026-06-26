# LUCID Hub Plans

## Phase 0: Foundation

- Scaffold pnpm monorepo.
- Add config, CI, Docker Compose, and database schema skeleton.
- Add product, compliance, and security docs.
- Create Expo, Next.js, NestJS, realtime, worker, and shared package shells.

## Phase 1: Identity

- Users, sessions, devices, verification, consent ledger, privacy settings, export requests, and deletion requests.
- Add validated API DTOs, auth guards, audit logs, and service tests.

## Phase 2: Messaging MVP

- Conversations, participants, messages, attachments metadata, receipts, typing indicators, blocking, and reporting.
- Preserve future E2EE boundaries and avoid logging message contents.

## Phase 3: Communities

- Community roles, invites, rules, reports, appeals, moderation actions, and audit trails.

## Phase 4: Merchants

- Merchant profiles, verification, service catalog, opening hours, availability, bookings, and customer chat links.

## Phase 5: Mini-App Platform v1

- Manifest schema, permissions, review workflow, launch token abstraction, WebView wrapper, JS bridge, developer SDK, and booking example.

## Phase 6: Commerce And Payment Abstraction

- Orders, coupons, loyalty cards, payment intents, refunds, mock provider, webhook events, and idempotency.
- No wallet balance, peer-to-peer transfers, card storage, or bank credential storage.

## Phase 7: Admin And Trust Operations

- User management, merchant approval, report queue, moderation actions, mini-app review, audit viewer, and feature flags.
