import { PartialType } from '@nestjs/mapped-types';
import { CreateShowtimeSeatDto } from './create-showtime-seat.dto';

export class UpdateShowtimeSeatDto extends PartialType(CreateShowtimeSeatDto) {}
