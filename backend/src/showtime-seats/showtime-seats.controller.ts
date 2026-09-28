import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ShowtimeSeatsService } from './showtime-seats.service';
import { CreateShowtimeSeatDto } from './dto/create-showtime-seat.dto';
import { UpdateShowtimeSeatDto } from './dto/update-showtime-seat.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('showtime-seats')
export class ShowtimeSeatsController {
  constructor(private readonly showtimeSeatsService: ShowtimeSeatsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateShowtimeSeatDto) {
    return this.showtimeSeatsService.create(dto);
  }

  // GET /showtime-seats?showtimeId=1
  @Get()
  findByShowtime(@Query('showtimeId', ParseIntPipe) showtimeId: number) {
    return this.showtimeSeatsService.findByShowtime(showtimeId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.showtimeSeatsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateShowtimeSeatDto,
  ) {
    return this.showtimeSeatsService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.showtimeSeatsService.remove(id);
  }
}
