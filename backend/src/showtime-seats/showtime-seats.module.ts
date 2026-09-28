import { Module } from '@nestjs/common';
import { ShowtimeSeatsController } from './showtime-seats.controller';
import { ShowtimeSeatsService } from './showtime-seats.service';

@Module({
  controllers: [ShowtimeSeatsController],
  providers: [ShowtimeSeatsService],
})
export class ShowtimeSeatsModule {}
