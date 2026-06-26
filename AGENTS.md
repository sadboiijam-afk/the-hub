# AGENTS.md

## Project Overview

- LUCID Hub is an EU-native, privacy-first super-app MVP for local businesses, creators, communities, bookings, coupons, commerce, and later regulated partner payments.
- Keep the architecture modular and boring: pnpm monorepo, modular monolith API, separate realtime service, worker service, shared packages, PostgreSQL, Redis, and Prisma.
- Phase 0 is scaffold only. Do not implement chat, payments, wallet behavior, mini-app runtime, or production auth without an explicit task.

## Dev Environment Tips

- Use `pnpm install` from the repository root.
- Use `pnpm dev` only when you need all runnable packages; otherwise run filtered commands such as `pnpm --filter @lucid/api dev`.
- Local infrastructure lives in `infra/docker/docker-compose.yml` and starts PostgreSQL plus Redis.
- Keep generated outputs out of review unless they are intentionally required.

## Useful Commands

- `pnpm lint` checks repository lint rules.
- `pnpm typecheck` runs TypeScript checks for all packages with a typecheck script.
- `pnpm test` runs root Vitest smoke tests.
- `pnpm build` builds packages and services that expose build scripts.
- `docker compose -f infra/docker/docker-compose.yml up -d` starts local PostgreSQL and Redis.

## Coding Conventions

- Use TypeScript strict mode and avoid `any`.
- Validate DTOs at API boundaries before adding endpoints.
- Put public API contracts in `packages/shared-types`.
- Keep database access behind domain repositories/services; Prisma schema changes must be reviewed.
- Use feature flags for incomplete production behavior.
- Do not log private message contents, auth secrets, payment data, raw tokens, or sensitive personal data.
- Do not add custom production cryptography. `packages/crypto` is for abstractions and integration boundaries only.
- Do not train AI features on private chats.

## Security, Privacy, And Compliance

- Every user-facing domain needs privacy, security, abuse, and observability notes before production implementation.
- Keep private messaging compatible with future audited E2EE, but do not invent crypto protocols.
- Payments must go through regulated PSP/payment partners. No wallet balances, peer-to-peer transfer, card storage, or bank credential storage in this repo.
- Moderation workflows must preserve report, action, appeal, and audit trails for DSA-aware operations.

## Handoff Documentation

- Keep `docs/handoff/` handoff-ready at all times.
- Update handoff docs after every major feature, architectural change, schema change, deployment change, or compliance-sensitive change.
- Required files are `00-project-overview.md` through `20-investor-technical-summary.md`; do not delete or rename them without replacing the handoff structure.
- Write for a new engineer with no prior conversation context.
- Separate facts from assumptions and mark incomplete, mocked, or prototype-only behavior clearly.
- Do not hide legal, security, privacy, compliance, deployment, or validation risks.
- Include relevant commands, environment variables, deployment targets, test status, known gaps, and next recommended tasks.
- Mark legal/security/compliance questions that still need expert review.

## Validation Expectations

- Before finishing code changes, run the lowest-cost relevant validation command and report any command that could not run.
- Add or update tests for changed behavior.
- Keep PRs small enough to review and summarize security/privacy impact when touching sensitive domains.
