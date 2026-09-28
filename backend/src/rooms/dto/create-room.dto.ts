import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateRoomDto {
  @IsInt()
  @IsPositive()
  cinemaId: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsInt()
  @IsPositive()
  numRows: number;

  @IsInt()
  @IsPositive()
  numCols: number;

  @IsInt()
  @IsPositive()
  capacity: number;

  @IsOptional()
  @IsString()
  status?: string;
}
