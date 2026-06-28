# Database Model

The database package is currently schema-only. No migrations have been generated.

Primary schema file:

- `packages/database/prisma/schema.prisma`

Current Prisma config:

- `packages/database/prisma.config.ts`
- Uses Prisma 7 style config with datasource URL outside the schema file.
- Uses `DATABASE_URL` when set and a local placeholder URL for schema validation when it is not set.

Modeled domains:

- Identity: users, devices, sessions, privacy settings, consents, export requests, deletion requests.
- Preview intake: preview requests, preview roles, and review statuses.
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
- Preview requests store contact/intake fields only and do not store secrets, payment data, wallet data, or credentials.

Identity persistence review:

- Current identity API contracts map to existing Prisma models without schema changes:
  - privacy settings -> `UserPrivacySetting`
  - consent ledger -> `Consent`
  - data export requests -> `DataExportRequest`
  - account deletion requests -> `DeletionRequest`
  - redacted identity audit events -> `AuditLog`
- `PrismaIdentityRepository` is a structural adapter for these existing model names and fields.
- No migration was generated in this pass because the current schema already has the required tables and relation/cascade behavior still needs review before initial migration creation.
- `DeletionRequest.reason` can store the user-supplied intake reason, but service audit metadata must not copy raw deletion reasons into `AuditLog.metadata`.
- `Consent.lawfulBasis` is currently a string. The API restricts accepted values with DTO validation, but the database does not yet enforce an enum.

Preview request model:

- `PreviewRequest` was added for landing-page preview/waitlist intake.
- `PreviewRole` values are `user`, `merchant`, `creator`, `developer`, and `community`.
- `PreviewRequestStatus` values are `new`, `in_review`, `approved`, and `declined`.
- The model includes `consentGranted` and `lawfulBasisCandidate` with the value `consent_candidate_needs_legal_review`.
- No migration was generated in this pass; generate and review a migration only after relation/retention review and after deciding whether the API should use a Prisma-backed repository.

Next database tasks:

- Decide relation definitions and cascade behavior.
- Add reviewed initial migration.
- Add repository/service boundaries before using Prisma from domain code.
- Wire preview request repository persistence after migration review.
- Add retention and deletion strategy per domain.
