import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreatePaymentDto {
  @IsInt()
  @IsPositive()
  bookingId: number;

  @IsInt()
  @IsPositive()
  amount: number;

  @IsNotEmpty()
  @IsString()
  method: string; // CASH | CARD | VNPAY | MOMO | etc.

  @IsOptional()
  @IsString()
  transactionId?: string;
}
