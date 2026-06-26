# Next Sprint Plan

Recommended next sprint: Phase 1 identity foundation.

Goals:

- Make local validation work on a normal Node-enabled development machine.
- Validate Prisma schema.
- Create reviewed initial migration.
- Implement identity module skeleton.
- Add auth/session/device primitives.
- Add consent ledger service.
- Add privacy settings service.
- Add data export/delete request intake skeleton.

Suggested tasks:

1. Fix local Node/pnpm environment outside the managed-PC constraints.
2. Run `pnpm install`, Prisma validation, typecheck, and tests.
3. Review and correct Prisma schema relations.
4. Add initial migration after review.
5. Create NestJS identity module with DTO validation.
6. Add user/session/device repositories.
7. Add redacted logging and audit events for identity actions.
8. Add service tests and route integration tests.
9. Update privacy and threat docs with identity-specific notes.

Do not include in next sprint:

- Chat implementation.
- Payment provider integration.
- Wallet behavior.
- Mini-app runtime.
- Public admin deployment.
