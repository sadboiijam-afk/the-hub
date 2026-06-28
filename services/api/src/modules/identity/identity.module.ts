import { Module } from "@nestjs/common";
import { IdentityController } from "./identity.controller.js";
import { InMemoryIdentityRepository } from "./identity.repository.js";
import { ConsentLedgerService, DataRightsService, PrivacySettingsService } from "./identity.service.js";

@Module({
  controllers: [IdentityController],
  providers: [InMemoryIdentityRepository, ConsentLedgerService, DataRightsService, PrivacySettingsService],
  exports: [ConsentLedgerService, DataRightsService, PrivacySettingsService]
})
export class IdentityModule {}
