# Cloudflare Deployment

## Deployment Target

Phase 0 deploys only the public web shell:

- Target: `apps/web`
- Cloudflare product: Pages
- Build output: `apps/web/out`
- Config: `apps/web/wrangler.jsonc`

The admin panel is intentionally excluded until authentication, authorization, audit logging, and access-control review are complete.

## Cloudflare Products Used

- Cloudflare Pages for the public web shell.
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

Cloudflare Pages supports `preview` and `production` environment overrides in Wrangler config. Local and staging are handled as operational conventions:

- Local: `wrangler pages dev ./out --config wrangler.jsonc` from `apps/web` after a local static build.
- Preview: pull requests and non-production branches.
- Staging: use a dedicated `staging` branch as a Pages preview, or create a separate Pages project if staging needs isolated bindings.
- Production: `main` branch after release approval.

Do not commit real account IDs, tokens, API keys, `.env` files, `.dev.vars`, or production credentials.

## Required GitHub Secrets And Variables

Repository secrets:

- `CLOUDFLARE_API_TOKEN`: Cloudflare API token with Cloudflare Pages edit permission for the target account.
- `CLOUDFLARE_ACCOUNT_ID`: Cloudflare account ID.

Repository variable:

- `CLOUDFLARE_PAGES_PROJECT_NAME`: Pages project name, for example `lucid-hub-web`.

The preview workflow skips deployment when these values are missing, but still builds the web app.

## Commands To Run

Normal CI path:

```bash
pnpm install --frozen-lockfile
pnpm --filter @lucid/web build:pages
```

CI runtime:

- Node.js 22
- pnpm 11.7.0

## Cloudflare Dashboard Settings

Use a Cloudflare Pages project for Phase 0 web preview/staging. Do not use a Workers project with `npx wrangler deploy` from the monorepo root.

Recommended Pages Git integration settings:

- Root directory: `/`
- Install command: Cloudflare default, or `pnpm install --frozen-lockfile`
- Build command: `pnpm --filter @lucid/web build:pages`
- Build output directory: `apps/web/out`
- Deploy command: leave blank for Pages Git integration

If using a custom deploy command instead of the Pages automatic deploy step, use:

```bash
pnpm cloudflare:deploy:web
```

This script intentionally uses `npx wrangler pages deploy` so Wrangler is fetched only for explicit deploys. Wrangler is not a normal workspace dependency because it pulls in `workerd`, which can require pnpm build-script approval on managed machines.

Do not use:

```bash
npx wrangler deploy
```

That command is for Workers. In this monorepo it runs Wrangler application detection from the workspace root and fails before deploying the Pages output.

Local Pages preview, only when Wrangler is locally available and no company policy blocks it:

```bash
cd apps/web
pnpm build:pages
wrangler pages dev ./out --config wrangler.jsonc
```

Manual deploy, only when already authenticated and approved:

```bash
pnpm cloudflare:deploy:web
```

## Preview Deployment Steps

Preferred path:

1. Push a branch to GitHub.
2. Open a pull request into `main`.
3. GitHub Actions runs `Cloudflare Pages Preview`.
4. The workflow builds `apps/web`.
5. If Cloudflare secrets and variables exist, Wrangler deploys a Pages preview for the PR branch.

Alternative path:

- Configure Cloudflare Pages Git integration in the Cloudflare dashboard for `sadboiijam-afk/the-hub`.
- Use root directory `/`.
- Use build command `pnpm install --frozen-lockfile && pnpm --filter @lucid/web build:pages`.
- Use build output directory `apps/web/out`.
- Set production branch to `main`.

Cloudflare's Git integration creates preview deployments for custom branches and pull requests. Cloudflare documents that Git integration cannot later be switched to Direct Upload for the same Pages project, so choose the deployment model deliberately.

## Local Testing Steps

On a normal Node-enabled machine:

```bash
pnpm install
pnpm lint
pnpm typecheck
pnpm test
pnpm --filter @lucid/web build:pages
```

Cloudflare Pages may run the repository root build command if the dashboard is configured with `pnpm run build`. The root build is expected to pass, but the preferred Pages build command is narrower:

```bash
pnpm --filter @lucid/web build:pages
```

On the current managed work PC, package scripts are blocked because `node` is not discoverable through pnpm. Do not bypass this with global installs, broad build approvals, Docker daemon changes, or login flows.

Latest fix:

- Cloudflare deploy failure after successful build was caused by the dashboard running `npx wrangler deploy` from the monorepo root. That is a Workers deploy command and is the wrong product path for the Phase 0 static web shell.
- Wrangler is not committed as a normal dependency; explicit deploy scripts use `npx wrangler pages ...` to avoid requiring `workerd` build approval during ordinary project installs.
- Cloudflare build failure on `services/worker` was caused by missing explicit Node type configuration for service packages using `process.env`.
- `services/api`, `services/realtime`, and `services/worker` now declare Node types in their package/tsconfig boundaries as needed.
- `apps/mobile` now declares the `expo-status-bar` dependency used by its Expo shell.
- ESLint ignores generated `out/` directories so static export artifacts are not linted.
- Verified locally with the bundled Codex Node runtime: `pnpm --filter @lucid/worker build`, `pnpm run build`, `pnpm typecheck`, `pnpm test`, and `pnpm lint`.

## Production-Readiness Gaps

- Web app is a Phase 0 shell only.
- Admin panel must not be public until access control exists.
- API, realtime, and worker services are not Cloudflare-runtime-ready.
- No Cloudflare bindings for R2, KV, Queues, Durable Objects, D1, or Hyperdrive are configured yet.
- No deployed smoke test is configured because deployment credentials are not present in the repo.
- Prisma schema still needs validation on a normal development or CI environment.
