# Mobile App Overview

The mobile app is an Expo React Native shell.

Current package:

- `apps/mobile`

Current behavior:

- Displays a simple LUCID Hub introduction.
- Shows a short subset of Phase 0 module boundaries from `packages/shared-types`.
- No navigation, auth, messaging, booking, mini-app WebView, or push notification flow is implemented.

Future mobile responsibilities:

- Account onboarding and verification.
- Privacy settings.
- Messaging and communities.
- Merchant discovery.
- Booking and coupon flows.
- Mini-app WebView wrapper.
- Notification preferences and push registration.

Important constraints:

- Do not log private message contents.
- Do not train AI on private chats.
- Preserve future audited E2EE boundaries for messaging.
- Gate unfinished modules behind feature flags.
- Avoid dark patterns in notification consent and opt-out flows.
