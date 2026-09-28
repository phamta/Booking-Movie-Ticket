import { IsArray, IsInt, IsPositive, ArrayMinSize } from 'class-validator';

export class CreateBookingDto {
  @IsInt()
  @IsPositive()
  showtimeId: number;

  @IsArray()
  @ArrayMinSize(1)
  @IsInt({ each: true })
  seatIds: number[];
}
