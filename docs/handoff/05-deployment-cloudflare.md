# Deployment: Cloudflare

Initial Cloudflare deployment support now exists for the public web shell. See `docs/deployment/cloudflare.md` for the operational source of truth.

Deployment targets:

- `apps/web`: Cloudflare Pages static preview using `apps/web/out`.
- `apps/admin`: do not deploy publicly until access control is designed and implemented.
- `services/api`: candidate for Cloudflare Workers only after Node.js runtime compatibility and database access strategy are reviewed.
- `services/realtime`: candidate for Workers plus Durable Objects for stateful coordination, but not until realtime requirements are implemented.
- `services/worker`: candidate for Cloudflare Workers plus Queues for async jobs.

Cloudflare products under consideration:

- Workers for APIs, full-stack apps, and worker jobs.
- Pages for static web surfaces.
- Durable Objects for stateful realtime coordination.
- R2 for future object storage.
- Queues for async jobs.
- KV for low-frequency config/cache.
- Hyperdrive for Postgres access from Workers.
- D1 only for prototypes, not as the default production database.

Required before adding Cloudflare config:

- Identify the exact app or service being deployed.
- Add `wrangler.jsonc` or `wrangler.toml` in the target package.
- Separate local, preview, staging, and production environments.
- Keep secrets in Cloudflare secrets or GitHub repository secrets, never committed files.
- Avoid hardcoded account IDs where possible.
- Keep local Docker development working.

Current config:

- `apps/web/wrangler.jsonc`
- `.github/workflows/cloudflare-pages-preview.yml`
- GitHub Actions preview build uses Node.js 22.

Latest fix:

- Root `pnpm run build` previously failed on Cloudflare because `services/worker` used `process.env` without explicit Node type configuration.
- Node type configuration has been added for Node-based services.
- The Expo shell now declares `expo-status-bar`, which is required for mobile typecheck.
- ESLint ignores generated `out/` directories.
- The preferred Cloudflare Pages build command remains `pnpm --filter @lucid/web build:pages`; root `pnpm run build` is now also expected to pass.
- GitHub Actions and Cloudflare preview workflows use Node.js 22 to satisfy pnpm 11.7.0 and modern Node built-in modules.

Do not run from a managed work PC:

- `wrangler login`
- deployment commands
- token setup
- global installs
- Docker daemon changes

Production-readiness gaps:

- No access control for admin panel.
- No Cloudflare secrets plan.
- No preview deployment workflow.
- No deployed smoke tests.
- No runtime compatibility audit for NestJS, Next.js, Prisma, or WebSocket behavior on Cloudflare.
