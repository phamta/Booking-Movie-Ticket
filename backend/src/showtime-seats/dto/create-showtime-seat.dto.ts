import {
  IsDateString,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateShowtimeSeatDto {
  @IsInt()
  @IsPositive()
  showtimeId: number;

  @IsInt()
  @IsPositive()
  seatId: number;

  @IsOptional()
  @IsString()
  status?: string; // AVAILABLE | HELD | BOOKED

  @IsOptional()
  @IsInt()
  bookingId?: number;

  @IsOptional()
  @IsDateString()
  holdExpiresAt?: string;

  @IsOptional()
  @IsInt()
  price?: number;
}
