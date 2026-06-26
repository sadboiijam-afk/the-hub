# Admin Panel Overview

The admin panel is a Next.js shell only.

Current package:

- `apps/admin`

Current behavior:

- Displays Phase 7-oriented operations queues from `packages/shared-types`.
- No authentication, access control, moderation queue, merchant verification workflow, mini-app review workflow, or audit log viewer is implemented.

Future admin responsibilities:

- User management.
- Merchant verification.
- Mini-app review.
- Report queue.
- Moderation actions.
- Appeal handling.
- Audit log viewer.
- Feature flag management.

Security boundary:

- Do not deploy the admin panel publicly until authentication, authorization, logging, and access-control review are complete.
- All privileged actions must create audit logs.
- Admin tooling must avoid exposing private message content unless a narrowly scoped, logged, policy-approved review path exists.
