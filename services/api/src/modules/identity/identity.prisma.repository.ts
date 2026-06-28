import type {
  AccountDeletionRequestIntake,
  DataExportRequestIntake,
  RecordedConsent,
  UserPrivacySettings
} from "@lucid/shared-types";
import type { IdentityAuditEvent, IdentityRepository } from "./identity.repository.js";

type CreateDelegate = {
  create(input: unknown): Promise<unknown>;
};

type UserPrivacySettingDelegate = {
  upsert(input: unknown): Promise<unknown>;
};

export interface IdentityPrismaClient {
  readonly userPrivacySetting?: UserPrivacySettingDelegate;
  readonly consent?: CreateDelegate;
  readonly dataExportRequest?: CreateDelegate;
  readonly deletionRequest?: CreateDelegate;
  readonly auditLog?: CreateDelegate;
}

export class PrismaIdentityRepository implements IdentityRepository {
  constructor(private readonly prisma: IdentityPrismaClient) {}

  async savePrivacySettings(settings: UserPrivacySettings): Promise<UserPrivacySettings> {
    await this.prisma.userPrivacySetting?.upsert({
      where: { userId: settings.userId },
      update: {
        discoverableByEmail: settings.discoverableByEmail,
        discoverableByPhone: settings.discoverableByPhone,
        allowBusinessMessages: settings.allowBusinessMessages,
        allowPersonalizedFeed: settings.allowPersonalizedFeed
      },
      create: {
        userId: settings.userId,
        discoverableByEmail: settings.discoverableByEmail,
        discoverableByPhone: settings.discoverableByPhone,
        allowBusinessMessages: settings.allowBusinessMessages,
        allowPersonalizedFeed: settings.allowPersonalizedFeed
      }
    });

    return { ...settings };
  }

  async saveConsent(consent: RecordedConsent): Promise<RecordedConsent> {
    await this.prisma.consent?.create({
      data: {
        userId: consent.userId,
        consentKey: consent.consentKey,
        policyVersion: consent.policyVersion,
        granted: consent.granted,
        lawfulBasis: consent.lawfulBasis
      }
    });

    return { ...consent };
  }

  async saveDataExportRequest(request: DataExportRequestIntake): Promise<DataExportRequestIntake> {
    await this.prisma.dataExportRequest?.create({
      data: {
        userId: request.userId,
        status: request.status
      }
    });

    return { ...request };
  }

  async saveAccountDeletionRequest(
    request: AccountDeletionRequestIntake
  ): Promise<AccountDeletionRequestIntake> {
    await this.prisma.deletionRequest?.create({
      data: request.reason === undefined
        ? {
            userId: request.userId,
            status: request.status
          }
        : {
            userId: request.userId,
            reason: request.reason,
            status: request.status
          }
    });

    return { ...request };
  }

  async recordAuditEvent(event: IdentityAuditEvent): Promise<IdentityAuditEvent> {
    await this.prisma.auditLog?.create({
      data: {
        actorUserId: event.actorId,
        action: event.event,
        targetType: "identity",
        targetId: event.targetId,
        metadata: event.metadata
      }
    });

    return event.metadata === undefined ? { ...event } : { ...event, metadata: { ...event.metadata } };
  }
}
