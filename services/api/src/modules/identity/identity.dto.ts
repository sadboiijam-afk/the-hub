import { IsBoolean, IsIn, IsOptional, IsString, IsUUID, MaxLength } from "class-validator";

export class RecordConsentDto {
  @IsUUID("4")
  userId!: string;

  @IsString()
  @MaxLength(80)
  consentKey!: string;

  @IsString()
  @MaxLength(40)
  policyVersion!: string;

  @IsBoolean()
  granted!: boolean;

  @IsIn(["consent", "contract", "legal_obligation", "legitimate_interest"])
  lawfulBasis!: "consent" | "contract" | "legal_obligation" | "legitimate_interest";
}

export class RequestDataExportDto {
  @IsUUID("4")
  userId!: string;
}

export class RequestAccountDeletionDto {
  @IsUUID("4")
  userId!: string;

  @IsOptional()
  @IsString()
  @MaxLength(160)
  reason?: string;
}
