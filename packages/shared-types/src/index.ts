export type Phase =
  | "phase-0"
  | "phase-1"
  | "phase-2"
  | "phase-3"
  | "phase-4"
  | "phase-5"
  | "phase-6"
  | "phase-7";

export interface PhaseZeroModule {
  readonly name: string;
  readonly status: string;
}

export const phaseZeroModules: readonly PhaseZeroModule[] = [
  {
    name: "Identity",
    status: "Schema and package boundary only; auth implementation starts in Phase 1."
  },
  {
    name: "Messaging",
    status: "Data model placeholders preserve future E2EE and reporting boundaries."
  },
  {
    name: "Merchants",
    status: "Verified profile, service, availability, and booking entities are modeled."
  },
  {
    name: "Mini-apps",
    status: "Manifest, permission, review, launch, and webhook records are modeled."
  },
  {
    name: "Payments",
    status: "Provider abstraction records only; no wallet or stored payment credentials."
  },
  {
    name: "Trust and Safety",
    status: "Reports, moderation actions, appeals, and audit logs are first-class records."
  }
] as const;

export interface AdminQueue {
  readonly name: string;
  readonly description: string;
  readonly phase: Phase;
}

export const adminQueues: readonly AdminQueue[] = [
  {
    name: "Merchant verification",
    description: "Review business evidence, verification status, and audit history.",
    phase: "phase-7"
  },
  {
    name: "Report queue",
    description: "Handle content, user, merchant, and community reports with appeal support.",
    phase: "phase-7"
  },
  {
    name: "Mini-app review",
    description: "Inspect manifests, permissions, webhook settings, and review outcomes.",
    phase: "phase-7"
  },
  {
    name: "Feature flags",
    description: "Gate incomplete or region-specific behavior before public rollout.",
    phase: "phase-7"
  }
] as const;

export type FeatureFlagKey =
  | "identity.enabled"
  | "messaging.enabled"
  | "communities.enabled"
  | "merchants.enabled"
  | "miniApps.enabled"
  | "commerce.enabled"
  | "payments.enabled"
  | "admin.enabled";

export interface ApiHealth {
  readonly status: "ok";
  readonly service: string;
  readonly version: string;
}
export interface UserPrivacySettings {
  readonly userId: string;
  readonly discoverableByEmail: boolean;
  readonly discoverableByPhone: boolean;
  readonly allowBusinessMessages: boolean;
  readonly allowPersonalizedFeed: boolean;
}

export interface ConsentRecordCommand {
  readonly userId: string;
  readonly consentKey: string;
  readonly policyVersion: string;
  readonly granted: boolean;
  readonly lawfulBasis: "consent" | "contract" | "legal_obligation" | "legitimate_interest";
}

export interface RecordedConsent extends ConsentRecordCommand {
  readonly status: "recorded";
}

export interface DataExportRequestCommand {
  readonly userId: string;
}

export interface AccountDeletionRequestCommand {
  readonly userId: string;
  readonly reason?: string;
}

export interface DataExportRequestIntake {
  readonly userId: string;
  readonly requestType: "export";
  readonly status: "requested";
}

export interface AccountDeletionRequestIntake {
  readonly userId: string;
  readonly requestType: "deletion";
  readonly status: "requested";
  readonly reason?: string;
}
