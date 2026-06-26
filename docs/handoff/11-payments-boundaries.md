# Payments Boundaries

Payments are not implemented in Phase 0. The schema only models future regulated provider integration records.

Allowed future direction:

- Payment provider abstraction.
- Mock provider for development.
- PSP adapter later.
- Payment intents.
- Refunds.
- Provider webhook event records.
- Idempotency keys.

Non-negotiable boundaries:

- No own wallet.
- No wallet balance.
- No peer-to-peer money transfer.
- No stored card data.
- No stored bank credentials.
- No raw payment tokens in logs.
- Payments only through regulated PSP/payment partners.

Current schema records:

- `orders`
- `payment_intents`
- `refunds`
- `provider_webhook_events`

Important implementation requirements for Phase 6:

- Webhook signature verification.
- Replay protection.
- Idempotency enforcement.
- Redacted structured logs.
- Audit events for sensitive payment state changes.
- Clear separation between order state and provider payment state.
- Integration tests for critical payment routes.
