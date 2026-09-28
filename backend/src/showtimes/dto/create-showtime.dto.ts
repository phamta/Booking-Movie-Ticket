import {
  IsDateString,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateShowtimeDto {
  @IsInt()
  @IsPositive()
  movieId: number;

  @IsInt()
  @IsPositive()
  roomId: number;

  @IsDateString()
  startTime: string;

  @IsDateString()
  endTime: string;

  @IsOptional()
  @IsString()
  status?: string;
}
