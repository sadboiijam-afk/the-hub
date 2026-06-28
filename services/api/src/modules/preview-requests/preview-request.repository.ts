import { randomUUID } from "node:crypto";
import { Injectable } from "@nestjs/common";
import type {
  CreatePreviewRequestInput,
  PreviewRequest,
  UpdatePreviewRequestStatusInput
} from "@lucid/shared-types";

export interface PreviewRequestRepository {
  create(command: CreatePreviewRequestInput): Promise<PreviewRequest>;
  findByEmail(email: string): Promise<PreviewRequest | undefined>;
  list(): Promise<readonly PreviewRequest[]>;
  updateStatus(id: string, command: UpdatePreviewRequestStatusInput): Promise<PreviewRequest | undefined>;
}

@Injectable()
export class InMemoryPreviewRequestRepository implements PreviewRequestRepository {
  private readonly records = new Map<string, PreviewRequest>();

  async create(command: CreatePreviewRequestInput): Promise<PreviewRequest> {
    const now = new Date().toISOString();
    const record: PreviewRequest = {
      ...command,
      id: randomUUID(),
      status: "new",
      lawfulBasisCandidate: "consent_candidate_needs_legal_review",
      createdAt: now,
      updatedAt: now
    };

    this.records.set(record.id, record);
    return { ...record };
  }

  async findByEmail(email: string): Promise<PreviewRequest | undefined> {
    for (const record of this.records.values()) {
      if (record.email === email) {
        return { ...record };
      }
    }

    return undefined;
  }

  async list(): Promise<readonly PreviewRequest[]> {
    return [...this.records.values()]
      .sort((left, right) => right.createdAt.localeCompare(left.createdAt))
      .map((record) => ({ ...record }));
  }

  async updateStatus(id: string, command: UpdatePreviewRequestStatusInput): Promise<PreviewRequest | undefined> {
    const existing = this.records.get(id);

    if (existing === undefined) {
      return undefined;
    }

    const updated: PreviewRequest = {
      ...existing,
      status: command.status,
      updatedAt: new Date().toISOString()
    };
    this.records.set(id, updated);

    return { ...updated };
  }
}
