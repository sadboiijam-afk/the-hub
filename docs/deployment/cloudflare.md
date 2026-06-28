# Cloudflare Deployment

## Deployment Target

Current Cloudflare deployment support covers only the public web landing page:

- Target: `apps/web`
- Cloudflare product: Workers with Static Assets
- Build output: `apps/web/out`
- Config: `apps/web/wrangler.jsonc`
- Worker name: `the-hub`

The admin panel is intentionally excluded until authentication, authorization, audit logging, and access-control review are complete.

The redesigned web app now includes a `/preview` form that calls the API through `NEXT_PUBLIC_API_BASE_URL`. Cloudflare environments that publish the form must set this variable to the correct API origin. The client does not use a production fallback URL.

## Cloudflare Products Used

- Cloudflare Workers for the public static web shell through Workers Static Assets.
- Wrangler Action in GitHub Actions for optional preview deployment.

Reserved for later phases:

- Workers for APIs and worker jobs after runtime compatibility review.
- Durable Objects for stateful realtime coordination.
- R2 for object storage.
- Queues for async jobs.
- KV for low-frequency config/cache only.
- Hyperdrive for Postgres access from Workers.
- D1 for prototypes only, not as the default production database.

## Environments

Wrangler config separates:

- Local: `pnpm --filter @lucid/web cloudflare:dev`
- Preview: `pnpm cloudflare:preview:web`
- Staging: `wrangler deploy --config apps/web/wrangler.jsonc --env staging`
- Production: `pnpm cloudflare:deploy:web`

Do not commit real account IDs, tokens, API keys, `.env` files, `.dev.vars`, or production credentials.

Public, non-secret environment variable:

- `NEXT_PUBLIC_API_BASE_URL`: API origin used by the public preview request form and the admin pre-production surface.

Development-only API switch:

- `PREVIEW_ADMIN_ENABLED=true`: enables preview request admin list/status endpoints locally or in a protected pre-production environment only. This is not production auth and is ignored when `NODE_ENV=production`.

## Required GitHub Secrets

Repository secrets for GitHub Actions preview deploys:

- `CLOUDFLARE_API_TOKEN`: token with Workers edit permission for the target account.
- `CLOUDFLARE_ACCOUNT_ID`: Cloudflare account ID.

Cloudflare dashboard Git integration may inject its own build token. Keep that token in Cloudflare only.

## Commands To Run

Normal CI path:

```bash
pnpm install --frozen-lockfile
pnpm --filter @lucid/web build:pages
```

Cloudflare dashboard settings for the existing Worker setup:

- Repository: `sadboiijam-afk/the-hub`
- Project name: `the-hub`
- Root directory: `/`
- Build command: `pnpm build:web`
- Deploy command: `pnpm cloudflare:deploy:web`
- Non-production branch deploy command: `pnpm cloudflare:preview:web`

CI runtime:

- Node.js 22
- pnpm 11.7.0

## Local Development

Local Next development:

```bash
pnpm --filter @lucid/web dev
```

Local Cloudflare Worker preview, only when Wrangler is locally available and policy allows it:

```bash
pnpm build:web
pnpm --filter @lucid/web cloudflare:dev
```

Wrangler is not a normal workspace dependency because it pulls in `workerd`, which can require pnpm build-script approval on managed machines.

## Preview Deployment Steps

Preferred path:

1. Push a branch to GitHub.
2. Open a pull request into `main`.
3. GitHub Actions runs `Cloudflare Workers Preview`.
4. The workflow builds `apps/web`.
5. If Cloudflare secrets exist, Wrangler deploys the `preview` Worker environment.

Cloudflare dashboard Git integration path:

1. Keep the Worker project connected to `sadboiijam-afk/the-hub`.
2. Use root directory `/`.
3. Use build command `pnpm build:web`.
4. Use deploy command `pnpm cloudflare:deploy:web`.
5. Use non-production deploy command `pnpm cloudflare:preview:web`.

Do not use:

```bash
npx wrangler pages deploy
```

That command targets Cloudflare Pages and requires Pages project permissions. The active Cloudflare dashboard project is a Worker named `the-hub`.

## Local Testing Steps

On a normal Node-enabled machine:

```bash
pnpm install
pnpm lint
pnpm typecheck
pnpm test
pnpm build:web
```

On the current managed work PC, use only project-level commands and avoid global installs, broad build approvals, Docker daemon changes, or login flows.

## Latest Fix

- Cloudflare now builds successfully with `pnpm build:web`.
- The previous deploy failed because `pnpm cloudflare:deploy:web` called `wrangler pages deploy` for a Pages project while the dashboard project is a Worker.
- `apps/web/wrangler.jsonc` now uses Workers Static Assets with `assets.directory` set to `./out`.
- Production deploy uses `wrangler deploy`; preview deploy uses `wrangler deploy --env preview`.
- Production deployment from commit `bccfd15` succeeded on Cloudflare.
- Smoke test passed at `https://the-hub.sadboiijam.workers.dev/`; redeploy after local `apps/web` changes to publish the redesigned landing page.

## Production-Readiness Gaps

- Web app is a Phase 0 shell only.
- Admin panel must not be public until access control exists.
- Preview request form requires a reachable API origin through `NEXT_PUBLIC_API_BASE_URL`.
- Preview request admin review uses a development-only API switch and must be replaced by real admin auth before public use.
- API, realtime, and worker services are not Cloudflare-runtime-ready.
- No Cloudflare bindings for R2, KV, Queues, Durable Objects, D1, or Hyperdrive are configured yet.
- Deployed smoke test is manual only; no automated post-deploy smoke test is configured yet.
- Prisma schema still needs migration and cascade review before production database use.
