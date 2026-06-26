# ADR 0001: Modular Monolith With Separate Realtime Service

## Status

Accepted for Phase 0.

## Context

LUCID Hub needs strong domain boundaries, privacy controls, and compliance workflows without the operational complexity of premature microservices.

## Decision

Start with a pnpm monorepo, a NestJS modular monolith API, a separate WebSocket realtime service, a worker service, shared packages, PostgreSQL, and Redis.

## Consequences

- Domain modules can evolve behind clear package and service boundaries.
- Compliance and audit rules can be enforced consistently.
- Realtime scaling can be handled separately from request/response API traffic.
- Service extraction remains possible later when traffic and ownership justify it.
