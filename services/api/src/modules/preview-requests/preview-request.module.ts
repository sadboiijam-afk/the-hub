import { Module } from "@nestjs/common";
import { PreviewRequestAdminGuard } from "./preview-request.admin.guard.js";
import { PreviewRequestController } from "./preview-request.controller.js";
import { InMemoryPreviewRequestRepository } from "./preview-request.repository.js";
import { PreviewRequestService } from "./preview-request.service.js";

@Module({
  controllers: [PreviewRequestController],
  providers: [PreviewRequestAdminGuard, InMemoryPreviewRequestRepository, PreviewRequestService],
  exports: [PreviewRequestService]
})
export class PreviewRequestModule {}
