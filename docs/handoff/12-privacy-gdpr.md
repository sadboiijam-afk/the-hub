# Privacy And GDPR

LUCID Hub is privacy-by-design from the scaffold stage.

Current controls:

- Consent ledger schema.
- Privacy settings schema.
- Data export request schema.
- Deletion request schema.
- Audit log schema.
- Redacted log event helper.
- Feature flags for incomplete behavior.
- Validated identity intake routes for privacy defaults, consent decisions, data export requests, and account deletion requests.
- In-memory identity repository boundary for Phase 1 service/controller wiring.
- Account deletion request reasons are accepted for intake records but are not copied into audit log metadata.
- Identity routes require an explicit placeholder authenticated user context and currently enforce self-access only.
- Prisma persistence mapping exists for privacy settings, consent records, export requests, deletion requests, and redacted audit logs, but production database wiring is not enabled yet.
- Preview request intake now collects email, role, optional name/city/country/message, and explicit consent. The lawful-basis assumption is `consent_candidate_needs_legal_review`; it is a candidate only and needs legal review before production use.
- Preview request admin review is pre-production only and must not be exposed without real admin authentication, authorization, audit logging, retention policy, and access review.

Core privacy principles:

- Collect only data needed for explicit product purposes.
- Keep processing purposes and lawful bases explicit.
- Do not log private message contents, auth secrets, payment data, raw tokens, card data, or bank credentials.
- Separate public/business content from private communications.
- Build data export and deletion workflows early.

Data subject rights to implement in Phase 1:

- Persisted access/export request intake.
- Persisted deletion request intake.
- Correction hooks.
- Restriction and objection handling.
- Retention exception handling for fraud, safety, accounting, and legal obligations.

Open privacy work:

- Create data retention schedule.
- Create DPIA template.
- Create vendor/DPA register.
- Define analytics boundaries.
- Define support-tool access policy.
- Define deletion/anonymization strategy per domain.
- Define export and deletion handling for preview request records, including whether optional messages should be redacted, deleted, or retained under a documented exception.
- Define preview request retention and consent withdrawal behavior before enabling production persistence.
- Replace the placeholder identity auth boundary with production session/device authentication before exposing identity data-rights routes beyond local development.
- Decide retention and deletion behavior for consent records, data export requests, deletion requests, and audit logs before generating migrations.
