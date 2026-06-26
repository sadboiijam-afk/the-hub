# Privacy By Design

## Principles

- Collect only data needed for the explicit product purpose.
- Use consent, contract, legitimate interest, or legal obligation as explicit processing bases.
- Keep private message contents out of logs and analytics.
- Separate public/business content from private user communications.
- Design data export and deletion workflows from the start.

## Initial Controls

- Consent ledger schema for timestamped, versioned consent records.
- Privacy settings schema for discoverability, personalization, and notification preferences.
- Data export and deletion request schema for operational workflows.
- Audit logs for sensitive administrative actions.
- Feature flags for incomplete or restricted behavior.

## Logging Rules

Never log private message contents, auth secrets, payment data, raw tokens, card data, bank credentials, or unnecessary sensitive personal data. Prefer event names, stable internal IDs, request IDs, and redacted metadata.

## Data Subject Rights

Phase 1 should add service-level support for access/export, correction hooks, deletion request intake, restriction flags, and objection handling. Deletion needs retention exceptions for fraud, safety, accounting, and legal obligations.
