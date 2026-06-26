# Known Risks

Environment risks:

- Current managed work PC cannot run package scripts because `node` is not discoverable by pnpm.
- Dependency postinstall scripts may be blocked by company policy.
- Docker daemon access may not be available.

Technical risks:

- Prisma schema is broad and has been validated, but it still needs relation/cascade review before migrations.
- Prisma relations and cascade behavior are not defined yet.
- No migrations exist.
- No auth/session implementation exists.
- Admin panel has no access control.
- Realtime service is only a bootstrap WebSocket server.
- Mini-app runtime is not designed yet.
- Cloudflare runtime compatibility for API/realtime/worker services is unknown.
- Cloudflare dashboard must keep targeting the `apps/web` Worker Static Assets config. A Pages deploy command such as `npx wrangler pages deploy` is the wrong deployment path for the active Worker project.

Recently mitigated:

- Cloudflare deploy command confusion is documented and root Worker helper scripts now exist.
- Cloudflare root build failure caused by missing Node process types in service package boundaries.
- Mobile typecheck failure caused by undeclared `expo-status-bar`.
- Lint failures caused by generated Next static export files under `out/`.

Product/compliance risks:

- GDPR retention, deletion, and export workflows are not implemented.
- DSA report/appeal operational details are not defined.
- Merchant verification criteria are not defined.
- Payment provider requirements are not selected.
- Mini-app review standards are not defined.

Security risks:

- Sensitive workflows currently exist only as schema/docs, not enforced code.
- Future logging/tracing must be reviewed carefully to avoid PII leakage.
- Future admin tooling could become high risk without strict RBAC and audit logging.
