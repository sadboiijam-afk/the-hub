# Database Model

The database package is currently schema-only. No migrations have been generated.

Primary schema file:

- `packages/database/prisma/schema.prisma`

Current Prisma config:

- `packages/database/prisma.config.ts`
- Uses Prisma 7 style config with datasource URL outside the schema file.

Modeled domains:

- Identity: users, devices, sessions, privacy settings, consents, export requests, deletion requests.
- Social graph: contacts, blocks, friend requests.
- Messaging: conversations, participants, messages, attachments, receipts, message reports.
- Communities: communities, members, roles, invites, rules.
- Moderation: actions and appeals.
- Channels: channels, posts, reactions, comments.
- Merchants: profiles, verifications, services, availability, bookings.
- Commerce: coupons, loyalty cards, orders.
- Mini-apps: apps, manifests, permissions, reviews, launches, webhook events.
- Payments: payment intents, refunds, provider webhook events.
- Notifications: notifications, push tokens, preferences.
- Operations: audit logs and feature flags.

Privacy-sensitive modeling choices:

- Email and phone are represented as hashes in the initial user model.
- Session tokens and invite tokens are stored as hashes.
- Message bodies are represented by `bodyRef`, not raw body content.
- Webhook payloads use `payloadRef`, not committed inline sensitive payload storage.
- Payment records do not store card data or bank credentials.

Next database tasks:

- Validate schema on a normal Node-enabled dev machine.
- Decide relation definitions and cascade behavior.
- Add reviewed initial migration.
- Add repository/service boundaries before using Prisma from domain code.
- Add retention and deletion strategy per domain.
