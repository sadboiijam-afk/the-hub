import { Equals, IsEmail, IsIn, IsOptional, IsString, MaxLength } from "class-validator";
import { previewRequestStatuses, previewRoles, type PreviewRequestStatus, type PreviewRole } from "@lucid/shared-types";

export class CreatePreviewRequestDto {
  @IsEmail()
  @MaxLength(254)
  email!: string;

  @IsIn(previewRoles)
  role!: PreviewRole;

  @Equals(true)
  consentGranted!: boolean;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  city?: string;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  country?: string;

  @IsOptional()
  @IsString()
  @MaxLength(1_000)
  message?: string;
}

export class UpdatePreviewRequestStatusDto {
  @IsIn(previewRequestStatuses)
  status!: PreviewRequestStatus;
}
