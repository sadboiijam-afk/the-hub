import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from "@nestjs/common";
import type {
  AccountDeletionRequestIntake,
  DataExportRequestIntake,
  RecordedConsent,
  UserPrivacySettings
} from "@lucid/shared-types";
import { RecordConsentDto, RequestAccountDeletionDto, RequestDataExportDto } from "./identity.dto.js";
import { ConsentLedgerService, DataRightsService, PrivacySettingsService } from "./identity.service.js";

@Controller("identity")
export class IdentityController {
  constructor(
    private readonly privacySettingsService: PrivacySettingsService,
    private readonly consentLedgerService: ConsentLedgerService,
    private readonly dataRightsService: DataRightsService
  ) {}

  @Get("privacy-defaults/:userId")
  getPrivacyDefaults(
    @Param("userId", new ParseUUIDPipe({ version: "4" })) userId: string
  ): Promise<UserPrivacySettings> {
    return this.privacySettingsService.createDefaultSettings(userId);
  }

  @Post("consents")
  recordConsent(@Body() body: RecordConsentDto): Promise<RecordedConsent> {
    return this.consentLedgerService.recordConsent(body);
  }

  @Post("data-export-requests")
  requestDataExport(@Body() body: RequestDataExportDto): Promise<DataExportRequestIntake> {
    return this.dataRightsService.createExportRequest(body);
  }

  @Post("account-deletion-requests")
  requestAccountDeletion(@Body() body: RequestAccountDeletionDto): Promise<AccountDeletionRequestIntake> {
    return this.dataRightsService.createDeletionRequest(body);
  }
}
