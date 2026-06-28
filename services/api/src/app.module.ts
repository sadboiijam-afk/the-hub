import { Module } from "@nestjs/common";
import { HealthController } from "./modules/health/health.controller.js";
import { HealthService } from "./modules/health/health.service.js";
import { IdentityModule } from "./modules/identity/identity.module.js";

@Module({
  imports: [IdentityModule],
  controllers: [HealthController],
  providers: [HealthService]
})
export class AppModule {}
