# Next Sprint Plan

Recommended next sprint: Phase 1 identity foundation.

Goals:

- Make local validation work on a normal Node-enabled development machine.
- Validate Prisma schema.
- Create reviewed initial migration.
- Continue identity module beyond the current HTTP/in-memory skeleton.
- Add auth/session/device primitives.
- Replace the current placeholder identity auth boundary with production-grade session/device validation.
- Add persisted consent ledger service.
- Add persisted privacy settings service.
- Add persisted data export/delete request intake.

Suggested tasks:

1. Fix local Node/pnpm environment outside the managed-PC constraints.
2. Run `pnpm install`, Prisma validation, typecheck, and tests.
3. Review and correct Prisma schema relations.
4. Add initial migration after review.
5. Replace the current in-memory identity repository with reviewed persistence boundaries after Prisma relation/cascade review.
6. Add user/session/device repositories.
7. Replace `IdentityAuthBoundaryGuard` placeholder behavior with real auth/session/device validation.
8. Extend route integration tests with production auth/session flows after the auth provider exists.
9. Update privacy and threat docs with identity-specific notes.
10. Add rate limiting and audit review rules for identity privacy/data-rights routes.

Do not include in next sprint:

- Chat implementation.
- Payment provider integration.
- Wallet behavior.
- Mini-app runtime.
- Public admin deployment.
