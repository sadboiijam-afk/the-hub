# Local Validation Notes

## Managed Work PC Constraint

Some development machines may not expose `node` on `PATH` and may block dependency postinstall scripts for packages such as Prisma, esbuild, or sharp. On those machines, do not bypass company controls with global installs, system changes, deployment logins, Docker daemon changes, or broad dependency build approval.

Allowed low-impact checks:

```bash
pnpm --version
pnpm exec node -v
pnpm ignored-builds
pnpm typecheck
pnpm test
```

If `pnpm exec node -v` fails with `Command "node" not found`, package scripts cannot be trusted to run on that machine. Document the blocker in the handoff and continue with file-level review only.

## Phase 0 Validation Intent

When a normal local development environment is available, expected checks are:

```bash
cp .env.example .env
pnpm install
pnpm --filter @lucid/database prisma:validate
pnpm lint
pnpm typecheck
pnpm test
```

Do not use Docker, deployment commands, external account login, token setup, or global package installation as part of ordinary Phase 0 validation.
