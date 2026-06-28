import { Body, Controller, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import type { PreviewRequest } from "@lucid/shared-types";
import { CreatePreviewRequestDto, UpdatePreviewRequestStatusDto } from "./preview-request.dto.js";
import { PreviewRequestAdminGuard } from "./preview-request.admin.guard.js";
import { PreviewRequestService } from "./preview-request.service.js";

@Controller("preview-requests")
export class PreviewRequestController {
  constructor(private readonly service: PreviewRequestService) {}

  @Post()
  async create(@Body() body: CreatePreviewRequestDto): Promise<PreviewRequest> {
    return this.service.create(body);
  }

  @Get()
  @UseGuards(PreviewRequestAdminGuard)
  async list(): Promise<readonly PreviewRequest[]> {
    return this.service.list();
  }

  @Patch(":id/status")
  @UseGuards(PreviewRequestAdminGuard)
  async updateStatus(
    @Param("id") id: string,
    @Body() body: UpdatePreviewRequestStatusDto
  ): Promise<PreviewRequest> {
    return this.service.updateStatus(id, body);
  }
}
