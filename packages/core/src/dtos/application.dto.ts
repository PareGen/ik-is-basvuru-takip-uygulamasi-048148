import { IsOptional, IsString, MinLength, IsBoolean, IsNumber, IsEnum, IsDate, IsUUID } from 'class-validator';

export enum ApplicationStatus {
  PENDING = 'PENDING',
  INTERVIEW = 'INTERVIEW',
  REJECTED = 'REJECTED',
  HIRED = 'HIRED'
}

export class CreateApplicationDto {
  @IsUUID()
  applicantId!: string;

  @IsUUID()
  jobPostId!: string;

  @IsEnum(ApplicationStatus)
  status!: ApplicationStatus;

  @IsDate()
  submittedAt!: Date;
}

export class UpdateApplicationDto {
  @IsOptional()
  @IsUUID()
  applicantId?: string | undefined;

  @IsOptional()
  @IsUUID()
  jobPostId?: string | undefined;

  @IsOptional()
  @IsEnum(ApplicationStatus)
  status?: ApplicationStatus | undefined;

  @IsOptional()
  @IsDate()
  submittedAt?: Date | undefined;
}

export class ApplicationResponseDto {
  id!: string;
  applicantId!: string;
  jobPostId!: string;
  status!: ApplicationStatus;
  submittedAt!: Date;
  createdAt!: Date;
  updatedAt!: Date;
}
