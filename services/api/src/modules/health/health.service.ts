import { Injectable } from "@nestjs/common";
import { createRedactedLogEvent } from "@lucid/config";
import type { ApiHealth } from "@lucid/shared-types";

@Injectable()
export class HealthService {
  getHealth(): ApiHealth {
    createRedactedLogEvent({
      event: "api.health.checked"
    });

    return {
      status: "ok",
      service: "api",
      version: "0.0.0"
    };
  }
}
