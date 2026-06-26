# Moderation And DSA

Moderation is not implemented yet, but the data model and docs reserve the core DSA-aware workflow.

Current records:

- `message_reports`
- `moderation_actions`
- `appeals`
- `audit_logs`
- Community and channel records needed for future reporting targets.

Intended workflow:

1. A user submits a report against content, message, merchant, community, or account.
2. The system records category, reporter, target, context metadata, and timestamps.
3. A moderator reviews and records a decision.
4. An affected user or merchant can appeal where applicable.
5. Audit logs and aggregate transparency-report data are preserved.

Implementation requirements:

- Report submission must be easy to find and not abusive.
- Moderator actions must require reason codes.
- Impactful actions must support appeal paths.
- Privileged moderation access must be authenticated, authorized, and audited.
- Private message content access must be restricted and logged.
- Transparency data must not expose private data.

Open DSA work:

- Define report categories.
- Define policy taxonomy.
- Define appeal SLAs.
- Define transparency reporting aggregates.
- Define moderator access and training controls.
