# LUCID Hub

LUCID Hub is a privacy-first European super-app MVP for messaging-adjacent local business workflows: verified profiles, customer communication, communities, channels, bookings, coupons, commerce, and later regulated partner-based payments.

This repository starts as a modular monolith plus a separate realtime service. The goal is to build a legally aware, trust-first platform that can expand without becoming a chaotic all-in-one app.

## Stack

- Monorepo: pnpm workspace
- Mobile: Expo React Native
- Web and admin: Next.js
- API: NestJS with TypeScript
- Database: PostgreSQL with Prisma schema
- Cache and queues: Redis
- Realtime: WebSocket service
- Testing: Vitest now, Playwright E2E later
- CI: GitHub Actions
- Observability posture: OpenTelemetry-compatible structure and Sentry-compatible error reporting abstraction

## Local Setup

```bash
cp .env.example .env
pnpm install
docker compose -f infra/docker/docker-compose.yml up -d
pnpm lint
pnpm typecheck
pnpm test
```

Run individual surfaces with filtered commands:

```bash
pnpm --filter @lucid/web dev
pnpm --filter @lucid/admin dev
pnpm --filter @lucid/api dev
pnpm --filter @lucid/realtime dev
pnpm --filter @lucid/mobile start
```

On managed work PCs, do not bypass blocked dependency build scripts or missing system runtimes. See `docs/development/local-validation.md` for the low-impact validation path.

## Handoff

Start here when continuing from another machine: `docs/handoff/README.md`.

## Phase 0 Scope

This pass includes repository scaffold, configuration, CI, Docker Compose, documentation, a Prisma schema skeleton, and compile/test smoke coverage. It intentionally does not implement chat, payments, mini-app runtime, wallet behavior, or production authentication.

## Non-Negotiables

- GDPR-aware privacy-by-design.
- DSA-aware moderation workflows.
- No own wallet or peer-to-peer money transfer in MVP.
- No stored card data, bank credentials, raw tokens, private message contents, or auth secrets in logs.
- Payments only through regulated providers.
- No custom production cryptography.
- Private messaging architecture must allow future audited E2EE.
