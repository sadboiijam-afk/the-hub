# Architecture Overview

The intended architecture is a modular monolith plus a separate realtime service.

Core runtime components:

- Next.js web app for customer/business-facing web workflows.
- Expo React Native mobile app for the main consumer and merchant mobile surface.
- Next.js admin panel for trust, safety, verification, and operations.
- NestJS API service as the modular monolith.
- WebSocket realtime service for typing, receipts, and future realtime coordination.
- Worker service for asynchronous jobs.
- PostgreSQL for primary relational data.
- Redis for cache and queues.
- S3-compatible abstraction later for object storage.
- Search abstraction later, likely Meilisearch or OpenSearch.

Why modular monolith first:

- Keeps compliance, audit, and domain rules centralized.
- Avoids premature microservice complexity.
- Allows clear module boundaries before operational extraction.
- Keeps the first implementation small enough to review.

Important package boundaries:

- Public contracts belong in `packages/shared-types`.
- Database schema and future Prisma client access belong in `packages/database`.
- Shared feature flags and log event shapes belong in `packages/config`.
- Mini-app contracts belong in `packages/sdk-miniapp`.
- Crypto package must remain an integration boundary, not a custom crypto implementation.

All future API endpoints must include validation, authentication/authorization, tests, and audit-relevant logging where appropriate.
