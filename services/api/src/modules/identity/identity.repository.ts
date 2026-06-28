import { Injectable } from "@nestjs/common";
import type {
  AccountDeletionRequestIntake,
  DataExportRequestIntake,
  RecordedConsent,
  UserPrivacySettings
} from "@lucid/shared-types";

export interface IdentityAuditEvent {
  readonly event: string;
  readonly actorId?: string;
  readonly targetId?: string;
  readonly metadata?: Readonly<Record<string, string | number | boolean>>;
}

export interface IdentityRepository {
  savePrivacySettings(settings: UserPrivacySettings): Promise<UserPrivacySettings>;
  saveConsent(consent: RecordedConsent): Promise<RecordedConsent>;
  saveDataExportRequest(request: DataExportRequestIntake): Promise<DataExportRequestIntake>;
  saveAccountDeletionRequest(request: AccountDeletionRequestIntake): Promise<AccountDeletionRequestIntake>;
  recordAuditEvent(event: IdentityAuditEvent): Promise<IdentityAuditEvent>;
}

@Injectable()
export class InMemoryIdentityRepository implements IdentityRepository {
  readonly privacySettings: UserPrivacySettings[] = [];
  readonly consents: RecordedConsent[] = [];
  readonly dataExportRequests: DataExportRequestIntake[] = [];
  readonly accountDeletionRequests: AccountDeletionRequestIntake[] = [];
  readonly auditEvents: IdentityAuditEvent[] = [];

  async savePrivacySettings(settings: UserPrivacySettings): Promise<UserPrivacySettings> {
    const snapshot = { ...settings };
    this.privacySettings.push(snapshot);
    return { ...snapshot };
  }

  async saveConsent(consent: RecordedConsent): Promise<RecordedConsent> {
    const snapshot = { ...consent };
    this.consents.push(snapshot);
    return { ...snapshot };
  }

  async saveDataExportRequest(request: DataExportRequestIntake): Promise<DataExportRequestIntake> {
    const snapshot = { ...request };
    this.dataExportRequests.push(snapshot);
    return { ...snapshot };
  }

  async saveAccountDeletionRequest(
    request: AccountDeletionRequestIntake
  ): Promise<AccountDeletionRequestIntake> {
    const snapshot = { ...request };
    this.accountDeletionRequests.push(snapshot);
    return { ...snapshot };
  }

  async recordAuditEvent(event: IdentityAuditEvent): Promise<IdentityAuditEvent> {
    const snapshot = event.metadata === undefined ? { ...event } : { ...event, metadata: { ...event.metadata } };
    this.auditEvents.push(snapshot);
    return snapshot;
  }
}
