import { Controller, Get } from "@nestjs/common";
import type { ApiHealth } from "@lucid/shared-types";
import { HealthService } from "./health.service.js";

@Controller("health")
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  getHealth(): ApiHealth {
    return this.healthService.getHealth();
  }
}
