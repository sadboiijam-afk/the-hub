# Local Development

Expected normal setup:

```bash
cp .env.example .env
pnpm install
docker compose -f infra/docker/docker-compose.yml up -d
pnpm lint
pnpm typecheck
pnpm test
```

Run individual surfaces:

```bash
pnpm --filter @lucid/web dev
pnpm --filter @lucid/admin dev
pnpm --filter @lucid/api dev
pnpm --filter @lucid/realtime dev
pnpm --filter @lucid/mobile start
```

Managed work PC rules:

- Do not run global installs.
- Do not run deployment commands.
- Do not run account login or token setup commands.
- Do not run Docker daemon changes.
- Do not run broad dependency build approval.
- Do not bypass blocked Prisma, esbuild, or sharp builds.

Allowed low-impact checks on restricted machines:

```bash
pnpm --version
pnpm exec node -v
pnpm ignored-builds
pnpm typecheck
pnpm test
```

Current local blocker:

- `pnpm exec node -v` fails because `node` is not discoverable by pnpm on this machine.
- Because of that, `pnpm typecheck` and `pnpm test` do not currently exercise the code.

See `docs/development/local-validation.md` for the managed-PC validation policy.
