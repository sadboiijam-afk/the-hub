export type LawfulBasis = "consent" | "contract" | "legitimate_interest" | "legal_obligation";

export interface ProcessingRecord {
  readonly purpose: string;
  readonly lawfulBasis: LawfulBasis;
  readonly dataCategories: readonly string[];
  readonly retentionPolicy: string;
}

export const phaseZeroProcessingRecords: readonly ProcessingRecord[] = [
  {
    purpose: "Account and platform operations",
    lawfulBasis: "contract",
    dataCategories: ["account identifiers", "session metadata", "device metadata"],
    retentionPolicy: "Define in Phase 1 before production launch."
  },
  {
    purpose: "Trust and safety review",
    lawfulBasis: "legitimate_interest",
    dataCategories: ["report metadata", "moderation decisions", "appeal records"],
    retentionPolicy: "Define before moderation tooling launch."
  }
] as const;
