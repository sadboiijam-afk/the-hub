# Admin Panel Overview

The admin panel is a Next.js pre-production operations shell.

Current package:

- `apps/admin`

Current behavior:

- Displays Phase 7-oriented operations queues from `packages/shared-types`.
- Shows preview request intake records from `GET /preview-requests` when the API has `PREVIEW_ADMIN_ENABLED=true`.
- Allows preview request status updates through `PATCH /preview-requests/:id/status` only while the API development-only guard is enabled.
- Clearly marks the preview request review surface as pre-production.
- No production authentication, access control, moderation queue, merchant verification workflow, mini-app review workflow, or audit log viewer is implemented.

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
- `PREVIEW_ADMIN_ENABLED=true` is a local/pre-production development switch only, is ignored in `NODE_ENV=production`, and must not be treated as authorization.
- All privileged actions must create audit logs.
- Admin tooling must avoid exposing private message content unless a narrowly scoped, logged, policy-approved review path exists.
