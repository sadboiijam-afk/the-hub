# Deployment: Cloudflare

Initial Cloudflare deployment support now exists for the public web shell. See `docs/deployment/cloudflare.md` for the operational source of truth.

Deployment targets:

- `apps/web`: Cloudflare Worker named `the-hub` serving static assets from `apps/web/out`.
- `apps/admin`: do not deploy publicly until access control is designed and implemented.
- `services/api`: candidate for Cloudflare Workers only after Node.js runtime compatibility and database access strategy are reviewed.
- `services/realtime`: candidate for Workers plus Durable Objects for stateful coordination, but not until realtime requirements are implemented.
- `services/worker`: candidate for Cloudflare Workers plus Queues for async jobs.

Cloudflare products under consideration:

- Workers for the Phase 0 public web shell through Workers Static Assets, and later for APIs/full-stack services after runtime review.
- Pages remains an alternative for static web surfaces if a separate Pages project is deliberately created.
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
- `.github/workflows/cloudflare-workers-preview.yml`
- GitHub Actions preview build uses Node.js 22.
- Root helper scripts: `pnpm build:web`, `pnpm cloudflare:preview:web`, and `pnpm cloudflare:deploy:web`.

Latest fix:

- Cloudflare build now succeeds with `pnpm build:web`.
- The latest deploy failure was caused by a target mismatch: the Cloudflare dashboard project is a Worker named `the-hub`, but the repo deploy script tried `wrangler pages deploy` against a Pages project name.
- `apps/web/wrangler.jsonc` now uses Workers Static Assets with `assets.directory` set to `./out`.
- Cloudflare dashboard should use build command `pnpm build:web`, deploy command `pnpm cloudflare:deploy:web`, and non-production deploy command `pnpm cloudflare:preview:web`.
- `pnpm cloudflare:deploy:web` now uses `npx wrangler deploy --config wrangler.jsonc`. Wrangler is not a normal dependency because it pulls in `workerd`, which can require pnpm build approval on managed machines.
- Root `pnpm run build` previously failed on Cloudflare because `services/worker` used `process.env` without explicit Node type configuration.
- Node type configuration has been added for Node-based services.
- The Expo shell now declares `expo-status-bar`, which is required for mobile typecheck.
- ESLint ignores generated `out/` directories.
- The preferred Cloudflare Pages build command remains `pnpm --filter @lucid/web build:pages`; root `pnpm run build` is now also expected to pass.
- GitHub Actions and Cloudflare preview workflows use Node.js 22 to satisfy pnpm 11.7.0 and modern Node built-in modules.

Do not run from a managed work PC:

- `wrangler login`
- deployment commands unless already authenticated and explicitly approved
- `npx wrangler pages deploy` for the active Worker project
- token setup
- global installs
- Docker daemon changes

Production-readiness gaps:

- No access control for admin panel.
- No Cloudflare secrets plan.
- Preview deployment workflow exists, but needs Cloudflare repository secrets before it can deploy from GitHub Actions.
- No deployed smoke tests.
- No runtime compatibility audit for NestJS, Next.js, Prisma, or WebSocket behavior on Cloudflare.
