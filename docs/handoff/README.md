# LUCID Hub Final Handoff

Last updated: 2026-06-26

This is the entry point for continuing LUCID Hub from another machine. The repository is already pushed to GitHub and the Phase 0 web shell is deployed to Cloudflare.

## Current State

Facts:

- GitHub repository: `sadboiijam-afk/the-hub`
- Main branch is the source of truth.
- Phase 0 foundation is complete.
- Public web shell is live at `https://the-hub.sadboiijam.workers.dev/`.
- Cloudflare target is a Worker named `the-hub` using Workers Static Assets.
- The deployed shell renders the `LUCID Hub` landing surface.
- Handoff docs from `00-project-overview.md` through `20-investor-technical-summary.md` exist and should remain current.

Incomplete or prototype-only:

- No production authentication.
- No real chat implementation.
- No private-chat AI training.
- No payment integration, wallet, stored cards, bank credentials, or production payment secrets.
- No mini-app runtime.
- No database migrations yet.
- No production admin access control.

## Read First

Start with these files in order:

1. `AGENTS.md`
2. `docs/handoff/02-current-status.md`
3. `docs/handoff/05-deployment-cloudflare.md`
4. `docs/handoff/15-known-risks.md`
5. `docs/handoff/17-next-sprint-plan.md`
6. `docs/handoff/18-codex-workflow.md`
7. `docs/deployment/cloudflare.md`

Use the numbered handoff docs for deeper context:

- Product and scope: `00-project-overview.md`, `01-product-vision.md`, `20-investor-technical-summary.md`
- Architecture: `03-architecture-overview.md`, `06-database-model.md`, `07-api-overview.md`
- App surfaces: `08-mobile-app-overview.md`, `09-admin-panel-overview.md`, `10-miniapp-platform.md`
- Compliance and safety: `11-payments-boundaries.md`, `12-privacy-gdpr.md`, `13-moderation-dsa.md`, `14-security-threat-model.md`
- Execution: `04-local-development.md`, `16-open-decisions.md`, `19-onboarding-checklist.md`

## Continue From Home

Use a normal non-managed development environment if possible.

Required:

- Node.js `>=22.13.0`
- pnpm `>=11.7.0`
- Git

Recommended first commands:

```bash
git clone https://github.com/sadboiijam-afk/the-hub.git
cd the-hub
pnpm install
pnpm lint
pnpm typecheck
pnpm test
pnpm build:web
```

Optional local infrastructure:

```bash
cp .env.example .env
docker compose -f infra/docker/docker-compose.yml up -d
```

Do not commit real `.env` files, tokens, API keys, account credentials, payment credentials, private keys, or production secrets.

## Validation Status

Latest local validation on the managed work PC used the bundled Codex Node runtime because `node` is not on the normal system PATH.

Passed:

- `pnpm build:web`
- `pnpm typecheck`
- `pnpm test`
- `pnpm lint`

Cloudflare:

- Build command: `pnpm build:web`
- Deploy command: `pnpm cloudflare:deploy:web`
- Production deploy from commit `bccfd15` succeeded.
- Manual smoke test passed at `https://the-hub.sadboiijam.workers.dev/`.

GitHub:

- CI uses Node.js 22 and pnpm 11.7.0.
- Cloudflare preview workflow exists, but requires repository secrets before GitHub Actions can deploy previews.

## Cloudflare Setup

Active deployment:

- App/service: `apps/web`
- Product: Cloudflare Workers with Static Assets
- Worker name: `the-hub`
- Config: `apps/web/wrangler.jsonc`
- Static output: `apps/web/out`

Dashboard settings:

- Repository: `sadboiijam-afk/the-hub`
- Root directory: `/`
- Build command: `pnpm build:web`
- Deploy command: `pnpm cloudflare:deploy:web`
- Non-production deploy command: `pnpm cloudflare:preview:web`

GitHub/Cloudflare secrets required for CI preview deployment:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

Keep Cloudflare tokens in Cloudflare or GitHub Secrets only. Do not write real values into docs, `.env.example`, workflow files, or committed config.

## Important Codex Skills And Plugins

Use these when continuing work in Codex:

- `lucid-cloudflare-deployment`: required for Cloudflare target/config/workflow/docs changes.
- `cloudflare:wrangler`: use for Wrangler config and command troubleshooting.
- `cloudflare:workers-best-practices`: use for Worker runtime compatibility and bindings review.
- `github:gh-fix-ci`: use when GitHub Actions fail.
- `github:yeet`: use when publishing local changes to GitHub.
- `coderabbit:code-review`: use for review-style feedback when available.
- `codex-security:security-scan` and `codex-security:threat-model`: use before implementing sensitive auth, admin, messaging, moderation, payments, or data-export behavior.
- `build-web-apps:react-best-practices`: use for web/admin UI implementation.
- `expo:expo-deployment` and related Expo skills: use when moving the mobile app beyond scaffold.
- `supabase:supabase-postgres-best-practices`: use only if a Supabase/Postgres path is selected later.
- `superpowers:verification-before-completion`: use before declaring major implementation work done.

Always keep `docs/handoff/` updated after deployment, schema, architecture, compliance, or major feature changes.

## Guardrails

Do not implement without explicit scope:

- Private-chat AI training.
- Custom production cryptography.
- Real payment flows or credential storage.
- Public admin panel without access control.
- D1 as default production database.
- Cloudflare REST API calls from Workers when bindings are available.

Security/privacy rules:

- Do not log private message contents, auth secrets, payment data, raw tokens, or sensitive personal data.
- Keep GDPR deletion/export/retention needs visible in docs and task plans.
- Keep DSA moderation report/action/appeal/audit requirements visible in docs and task plans.
- Use regulated payment providers only.

## Recommended Phase 1 Work

Next sprint should focus on a narrow vertical slice:

1. Identity and session model.
2. Database migrations for the existing Prisma schema skeleton.
3. API foundation with health checks and validated DTO boundaries.
4. Admin access-control plan before any public admin deployment.
5. First real web/admin workflow backed by the API.
6. Automated deployed smoke test for Cloudflare.

Before Phase 1 coding, review:

- `docs/handoff/06-database-model.md`
- `docs/handoff/12-privacy-gdpr.md`
- `docs/handoff/14-security-threat-model.md`
- `docs/handoff/16-open-decisions.md`

## Known Gaps

- Prisma schema needs relation/cascade review before migrations.
- No deployed smoke test in CI.
- No production observability setup.
- No secrets plan beyond documented Cloudflare/GitHub secret names.
- API/realtime/worker services need Cloudflare runtime compatibility review before deployment.
- Legal/security/compliance expert review is still required before regulated payments, moderation operations, GDPR workflows, or private messaging production release.
