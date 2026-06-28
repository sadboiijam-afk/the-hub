import { Module } from "@nestjs/common";
import { ConsentLedgerService, DataRightsService, PrivacySettingsService } from "./identity.service.js";

@Module({
  providers: [ConsentLedgerService, DataRightsService, PrivacySettingsService],
  exports: [ConsentLedgerService, DataRightsService, PrivacySettingsService]
})
export class IdentityModule {}
