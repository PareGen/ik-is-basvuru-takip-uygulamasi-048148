import { IsOptional, IsString, MinLength, IsBoolean, IsNumber, IsEnum, IsDate, IsUUID } from 'class-validator';

export enum JobpostStatus {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
  ARCHIVED = 'ARCHIVED'
}

export class CreateJobpostDto {
  @IsString()
  @MinLength(1)
  title!: string;

  @IsString()
  @MinLength(1)
  description!: string;

  @IsString()
  @MinLength(1)
  company!: string;

  @IsString()
  @MinLength(1)
  location!: string;

  @IsEnum(JobpostStatus)
  status!: JobpostStatus;

  @IsUUID()
  recruiterId!: string;
}

export class UpdateJobpostDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  title?: string | undefined;

  @IsOptional()
  @IsString()
  @MinLength(1)
  description?: string | undefined;

  @IsOptional()
  @IsString()
  @MinLength(1)
  company?: string | undefined;

  @IsOptional()
  @IsString()
  @MinLength(1)
  location?: string | undefined;

  @IsOptional()
  @IsEnum(JobpostStatus)
  status?: JobpostStatus | undefined;

  @IsOptional()
  @IsUUID()
  recruiterId?: string | undefined;
}

export class JobpostResponseDto {
  id!: string;
  title!: string;
  description!: string;
  company!: string;
  location!: string;
  status!: JobpostStatus;
  recruiterId!: string;
  createdAt!: Date;
  updatedAt!: Date;
}
