import type { FeatureFlagKey } from "@lucid/shared-types";

export type FeatureFlagConfig = Readonly<Record<FeatureFlagKey, boolean>>;

export const defaultFeatureFlags: FeatureFlagConfig = {
  "identity.enabled": false,
  "messaging.enabled": false,
  "communities.enabled": false,
  "merchants.enabled": false,
  "miniApps.enabled": false,
  "commerce.enabled": false,
  "payments.enabled": false,
  "admin.enabled": false
};

export interface RedactedLogEvent {
  readonly event: string;
  readonly requestId?: string;
  readonly actorId?: string;
  readonly targetId?: string;
  readonly metadata?: Readonly<Record<string, string | number | boolean>>;
}

export function createRedactedLogEvent(event: RedactedLogEvent): RedactedLogEvent {
  return event;
}
