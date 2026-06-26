# Project Overview

LUCID Hub is an EU-native, privacy-first super-app foundation for local digital life. It is inspired by the breadth of WeChat but is not a clone: the product direction is modular, legally aware, and trust-first.

The MVP focuses on small European businesses, creators, clubs, venues, local communities, and customers. The goal is to let verified businesses communicate with customers, publish updates, accept bookings, issue coupons and loyalty rewards, and later accept regulated partner-based payments.

The repository is currently a Phase 0 scaffold. It defines the monorepo structure, app and service shells, shared packages, Prisma schema skeleton, local infrastructure config, CI config, and core product/compliance/security documentation.

Current working name: LUCID Hub.

Current repository shape:

- `apps/mobile`: Expo React Native shell.
- `apps/web`: Next.js web shell.
- `apps/admin`: Next.js admin shell.
- `services/api`: NestJS API shell with health module only.
- `services/realtime`: WebSocket bootstrap shell only.
- `services/worker`: worker shell only.
- `packages/database`: Prisma schema package.
- `packages/shared-types`: public shared TypeScript contracts.
- `packages/ui`: shared UI primitives.
- `packages/config`: feature flags and redacted logging primitives.
- `packages/sdk-miniapp`: future mini-app SDK boundary.
- `packages/crypto`: future audited crypto integration boundary only.
- `packages/compliance`: compliance record primitives.

Phase 0 intentionally does not implement chat, payments, wallet behavior, mini-app runtime, production authentication, or admin moderation workflows.
