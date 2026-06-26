# Mini-App Platform

The mini-app platform is not implemented yet. Phase 0 only creates the package boundary and schema records.

Current package:

- `packages/sdk-miniapp`

Current schema records:

- `mini_apps`
- `mini_app_manifests`
- `mini_app_permissions`
- `mini_app_reviews`
- `mini_app_launches`
- `mini_app_webhook_events`

Current SDK behavior:

- Defines a minimal manifest shape.
- Includes a simple manifest shape validator requiring HTTPS entry URLs.

Future platform responsibilities:

- Manifest schema and validation.
- Permission model.
- Review workflow.
- Launch token issuance and verification.
- Mobile WebView wrapper.
- JS bridge.
- Developer SDK.
- Booking mini-app example.
- Coupon mini-app example.

Security boundaries:

- No unreviewed mini-app runtime in MVP.
- Launch tokens must be short-lived and hashed at rest.
- Mini-app permissions must be explicit, purpose-bound, and reviewable.
- Use bindings and platform APIs where available; do not invent unsafe bridge behavior.
