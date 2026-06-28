import { Body, Controller, Get, Param, ParseUUIDPipe, Post, UseGuards } from "@nestjs/common";
import type {
  AccountDeletionRequestIntake,
  DataExportRequestIntake,
  RecordedConsent,
  UserPrivacySettings
} from "@lucid/shared-types";
import { RecordConsentDto, RequestAccountDeletionDto, RequestDataExportDto } from "./identity.dto.js";
import {
  assertAuthenticatedSelfAccess,
  type AuthenticatedUserContext,
  IdentityAuthBoundaryGuard,
  RequestUser
} from "./identity.auth.js";
import { ConsentLedgerService, DataRightsService, PrivacySettingsService } from "./identity.service.js";

@Controller("identity")
@UseGuards(IdentityAuthBoundaryGuard)
export class IdentityController {
  constructor(
    private readonly privacySettingsService: PrivacySettingsService,
    private readonly consentLedgerService: ConsentLedgerService,
    private readonly dataRightsService: DataRightsService
  ) {}

  @Get("privacy-defaults/:userId")
  async getPrivacyDefaults(
    @Param("userId", new ParseUUIDPipe({ version: "4" })) userId: string,
    @RequestUser() user: AuthenticatedUserContext
  ): Promise<UserPrivacySettings> {
    assertAuthenticatedSelfAccess(user, userId);

    return await this.privacySettingsService.createDefaultSettings(userId);
  }

  @Post("consents")
  async recordConsent(
    @Body() body: RecordConsentDto,
    @RequestUser() user: AuthenticatedUserContext
  ): Promise<RecordedConsent> {
    assertAuthenticatedSelfAccess(user, body.userId);

    return await this.consentLedgerService.recordConsent(body);
  }

  @Post("data-export-requests")
  async requestDataExport(
    @Body() body: RequestDataExportDto,
    @RequestUser() user: AuthenticatedUserContext
  ): Promise<DataExportRequestIntake> {
    assertAuthenticatedSelfAccess(user, body.userId);

    return await this.dataRightsService.createExportRequest(body);
  }

  @Post("account-deletion-requests")
  async requestAccountDeletion(
    @Body() body: RequestAccountDeletionDto,
    @RequestUser() user: AuthenticatedUserContext
  ): Promise<AccountDeletionRequestIntake> {
    assertAuthenticatedSelfAccess(user, body.userId);

    return await this.dataRightsService.createDeletionRequest(body);
  }
}
