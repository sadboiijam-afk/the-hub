import { Injectable } from "@nestjs/common";
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
@Injectable()
export class PrivacySettingsService {
  createDefaultSettings(userId: string): UserPrivacySettings {
    createRedactedLogEvent({
      event: "identity.privacy_settings.defaulted",
      actorId: userId,
      targetId: userId
    });

    return {
      userId,
      discoverableByEmail: false,
      discoverableByPhone: false,
      allowBusinessMessages: true,
      allowPersonalizedFeed: false
    };
  }
}

@Injectable()
export class ConsentLedgerService {
  recordConsent(command: ConsentRecordCommand): RecordedConsent {
    createRedactedLogEvent({
      event: "identity.consent.recorded",
      actorId: command.userId,
      targetId: command.userId,
      metadata: {
        consentKey: command.consentKey,
        granted: command.granted,
        lawfulBasis: command.lawfulBasis
      }
    });

    return {
      ...command,
      status: "recorded"
    };
  }
}

@Injectable()
export class DataRightsService {
  createExportRequest(command: DataExportRequestCommand): DataExportRequestIntake {
    createRedactedLogEvent({
      event: "identity.data_export.requested",
      actorId: command.userId,
      targetId: command.userId
    });

    return {
      userId: command.userId,
      requestType: "export",
      status: "requested"
    };
  }

  createDeletionRequest(command: AccountDeletionRequestCommand): AccountDeletionRequestIntake {
    const logEvent =
      command.reason === undefined
        ? {
            event: "identity.account_deletion.requested",
            actorId: command.userId,
            targetId: command.userId
          }
        : {
            event: "identity.account_deletion.requested",
            actorId: command.userId,
            targetId: command.userId,
            metadata: { reason: command.reason }
          };

    createRedactedLogEvent(logEvent);

    return command.reason === undefined
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
        };
  }
}
