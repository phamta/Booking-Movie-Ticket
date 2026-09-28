import { IsInt, IsNotEmpty, IsOptional, IsPositive, IsString } from 'class-validator';

export class CreateSeatDto {
  @IsInt()
  @IsPositive()
  roomId: number;

  @IsInt()
  @IsPositive()
  rowNumber: number;

  @IsInt()
  @IsPositive()
  columnNumber: number;

  @IsNotEmpty()
  @IsString()
  seatCode: string;

  @IsOptional()
  @IsString()
  seatType?: string; // STANDARD | VIP | COUPLE

  @IsOptional()
  @IsString()
  status?: string;
}
