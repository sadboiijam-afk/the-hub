# Codex Workflow

Use this workflow when continuing the project with Codex.

Before coding:

- Read `AGENTS.md`.
- Read the relevant handoff doc.
- Inspect the current files instead of assuming prior context is complete.
- Identify whether the task is Phase 0 cleanup, Phase 1 identity, or a later module.
- List assumptions, risks, and files to change for substantial work.

During coding:

- Keep changes small enough to review.
- Use existing package boundaries.
- Put public types in `packages/shared-types`.
- Keep database access behind services/repositories.
- Use feature flags for incomplete behavior.
- Do not implement future-phase behavior accidentally.
- Do not log sensitive data.

Handoff documentation:

- Treat `docs/handoff/` as a required maintenance surface.
- Update handoff docs after every major feature, architectural change, schema change, deployment change, or compliance-sensitive change.
- Keep all required files from `00-project-overview.md` through `20-investor-technical-summary.md`.
- Write for a new engineer without prior chat context.
- Separate facts from assumptions.
- Mark incomplete, mocked, prototype-only, or future-phase behavior clearly.
- Do not hide known legal, security, privacy, compliance, deployment, or validation risks.
- Include commands, environment variables, deployment targets, test status, and next recommended tasks when relevant.
- Mark questions that still need expert legal/security/compliance review.

Validation:

- On normal dev machines, run the lowest-cost relevant checks.
- On managed work PCs, do not bypass missing Node, blocked postinstalls, Docker restrictions, account logins, or deployment restrictions.
- Document blocked validation clearly.

When using GitHub or Cloudflare:

- Do not run login/token setup/deployment commands unless explicitly approved.
- Do not commit secrets.
- Prefer config/docs/workflow scaffolding over live operations on restricted machines.

Final handoff:

- Summarize files changed.
- List commands run.
- List validation status.
- List known gaps.
- Recommend next tasks.
