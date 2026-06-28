import { Inject, Injectable } from "@nestjs/common";
import { createRedactedLogEvent } from "@lucid/config";
import type {
  AccountDeletionRequestCommand,
  AccountDeletionRequestIntake,
  ConsentRecordCommand,
  DataExportRequestCommand,
  DataExportRequestIntake,
  RecordedConsent,
  UserPrivacySettings
} from "@lucid/shared-types";
import { InMemoryIdentityRepository, type IdentityAuditEvent, type IdentityRepository } from "./identity.repository.js";

@Injectable()
export class PrivacySettingsService {
  constructor(@Inject(InMemoryIdentityRepository) private readonly repository: IdentityRepository) {}

  async createDefaultSettings(userId: string): Promise<UserPrivacySettings> {
    await this.repository.recordAuditEvent(
      createRedactedLogEvent({
        event: "identity.privacy_settings.defaulted",
        actorId: userId,
        targetId: userId
      })
    );

    return this.repository.savePrivacySettings({
      userId,
      discoverableByEmail: false,
      discoverableByPhone: false,
      allowBusinessMessages: true,
      allowPersonalizedFeed: false
    });
  }
}

@Injectable()
export class ConsentLedgerService {
  constructor(@Inject(InMemoryIdentityRepository) private readonly repository: IdentityRepository) {}

  async recordConsent(command: ConsentRecordCommand): Promise<RecordedConsent> {
    await this.repository.recordAuditEvent(
      createRedactedLogEvent({
        event: "identity.consent.recorded",
        actorId: command.userId,
        targetId: command.userId,
        metadata: {
          consentKey: command.consentKey,
          granted: command.granted,
          lawfulBasis: command.lawfulBasis
        }
      })
    );

    return this.repository.saveConsent({
      ...command,
      status: "recorded"
    });
  }
}

@Injectable()
export class DataRightsService {
  constructor(@Inject(InMemoryIdentityRepository) private readonly repository: IdentityRepository) {}

  async createExportRequest(command: DataExportRequestCommand): Promise<DataExportRequestIntake> {
    await this.repository.recordAuditEvent(
      createRedactedLogEvent({
        event: "identity.data_export.requested",
        actorId: command.userId,
        targetId: command.userId
      })
    );

    return this.repository.saveDataExportRequest({
      userId: command.userId,
      requestType: "export",
      status: "requested"
    });
  }

  async createDeletionRequest(command: AccountDeletionRequestCommand): Promise<AccountDeletionRequestIntake> {
    const logEvent: IdentityAuditEvent = {
      event: "identity.account_deletion.requested",
      actorId: command.userId,
      targetId: command.userId
    };

    await this.repository.recordAuditEvent(createRedactedLogEvent(logEvent));

    return this.repository.saveAccountDeletionRequest(
      command.reason === undefined
        ? {
            userId: command.userId,
            requestType: "deletion",
            status: "requested"
          }
        : {
            userId: command.userId,
            requestType: "deletion",
            reason: command.reason,
            status: "requested"
          }
    );
  }
}
