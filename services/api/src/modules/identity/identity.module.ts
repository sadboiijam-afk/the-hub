import { Module } from "@nestjs/common";
import { IdentityAuthBoundaryGuard } from "./identity.auth.js";
import { IdentityController } from "./identity.controller.js";
import { InMemoryIdentityRepository } from "./identity.repository.js";
import { ConsentLedgerService, DataRightsService, PrivacySettingsService } from "./identity.service.js";

@Module({
  controllers: [IdentityController],
  providers: [
    IdentityAuthBoundaryGuard,
    InMemoryIdentityRepository,
    ConsentLedgerService,
    DataRightsService,
    PrivacySettingsService
  ],
  exports: [ConsentLedgerService, DataRightsService, PrivacySettingsService]
})
export class IdentityModule {}
