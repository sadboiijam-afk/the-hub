# Onboarding Checklist

For a new engineer or future Codex session:

- Read `README.md`.
- Read `AGENTS.md`.
- Read `PLANS.md`.
- Read `docs/handoff/00-project-overview.md`.
- Read `docs/handoff/02-current-status.md`.
- Read `docs/handoff/04-local-development.md`.
- Confirm `docs/handoff/` still contains files `00-project-overview.md` through `20-investor-technical-summary.md`.
- Confirm whether the machine can run `pnpm exec node -v`.
- If Node works, run `pnpm install`.
- Validate Prisma schema before creating migrations.
- Run `pnpm typecheck` and `pnpm test` before changing behavior.
- Do not deploy anything during onboarding.
- Do not add auth, chat, payments, mini-app runtime, or admin workflows without reading the relevant handoff docs.

Project-specific reminders:

- Keep MVP modular.
- Keep privacy and DSA posture explicit.
- Do not store card data or bank credentials.
- Do not create wallet behavior.
- Do not log private message contents or secrets.
- Do not build custom production cryptography.
- Keep future E2EE possible.
- Add tests for every domain service.
- Update handoff docs whenever changing features, architecture, schema, deployment, or compliance-sensitive behavior.
