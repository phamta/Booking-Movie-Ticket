import { IsOptional, IsString } from 'class-validator';

export class UpdatePaymentDto {
  @IsOptional()
  @IsString()
  status?: string; // PENDING | SUCCESS | FAILED | REFUNDED

  @IsOptional()
  @IsString()
  transactionId?: string;
}
