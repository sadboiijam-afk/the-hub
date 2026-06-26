# DSA-Aware Moderation Model

## Workflow

1. User submits a report against content, a message, a merchant, a community, or an account.
2. The system records report category, reporter, target, locale, context metadata, and timestamps.
3. A moderator reviews the report and records an action or no-action decision.
4. The affected user or merchant can appeal where applicable.
5. The system preserves audit logs and transparency-report aggregate data.

## Required Records

- Reports with target type, category, status, and reporter.
- Moderation actions with actor, reason, duration, target, and policy reference.
- Appeals with decision, reviewer, and timestamps.
- Audit logs for every privileged moderation operation.

## Safety Constraints

- Keep private message content access restricted and auditable.
- Avoid dark patterns in notification and report flows.
- Provide reasoned decisions and appeal paths for impactful moderation actions.
- Preserve aggregate data needed for transparency reporting without exposing private data.
