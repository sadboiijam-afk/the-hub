import { ConflictException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import type {
  CreatePreviewRequestInput,
  PreviewRequest,
  UpdatePreviewRequestStatusInput
} from "@lucid/shared-types";
import {
  InMemoryPreviewRequestRepository,
  type PreviewRequestRepository
} from "./preview-request.repository.js";

@Injectable()
export class PreviewRequestService {
  constructor(@Inject(InMemoryPreviewRequestRepository) private readonly repository: PreviewRequestRepository) {}

  async create(command: CreatePreviewRequestInput): Promise<PreviewRequest> {
    const normalized = normalizeCreateCommand(command);
    const existing = await this.repository.findByEmail(normalized.email);

    if (existing !== undefined) {
      throw new ConflictException("A preview request already exists for this email address.");
    }

    return this.repository.create(normalized);
  }

  async list(): Promise<readonly PreviewRequest[]> {
    return this.repository.list();
  }

  async updateStatus(id: string, command: UpdatePreviewRequestStatusInput): Promise<PreviewRequest> {
    const updated = await this.repository.updateStatus(id, command);

    if (updated === undefined) {
      throw new NotFoundException("Preview request not found.");
    }

    return updated;
  }
}

function normalizeCreateCommand(command: CreatePreviewRequestInput): CreatePreviewRequestInput {
  return {
    email: command.email.trim().toLowerCase(),
    role: command.role,
    consentGranted: command.consentGranted,
    ...optionalText("name", command.name),
    ...optionalText("city", command.city),
    ...optionalText("country", command.country),
    ...optionalText("message", command.message)
  };
}

function optionalText<Key extends "name" | "city" | "country" | "message">(
  key: Key,
  value: string | undefined
): Partial<Record<Key, string>> {
  const trimmed = value?.trim();
  return trimmed === undefined || trimmed.length === 0 ? {} : { [key]: trimmed } as Partial<Record<Key, string>>;
}
