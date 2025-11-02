import { IsOptional, IsString, MinLength, IsBoolean, IsNumber, IsEnum, IsDate, IsUUID } from 'class-validator';

export enum PaymentStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED'
}

export class CreatePaymentDto {
  @IsUUID()
  userId!: string;

  @IsNumber()
  amount!: number;

  @IsEnum(PaymentStatus)
  status!: PaymentStatus;
}

export class UpdatePaymentDto {
  @IsOptional()
  @IsUUID()
  userId?: string | undefined;

  @IsOptional()
  @IsNumber()
  amount?: number | undefined;

  @IsOptional()
  @IsEnum(PaymentStatus)
  status?: PaymentStatus | undefined;
}

export class PaymentResponseDto {
  id!: string;
  userId!: string;
  amount!: number;
  status!: PaymentStatus;
  createdAt!: Date;
  updatedAt!: Date;
}
