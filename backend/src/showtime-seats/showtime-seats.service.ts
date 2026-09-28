import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateShowtimeSeatDto } from './dto/create-showtime-seat.dto';
import { UpdateShowtimeSeatDto } from './dto/update-showtime-seat.dto';

@Injectable()
export class ShowtimeSeatsService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateShowtimeSeatDto) {
    return this.prisma.showtimeSeat.create({
      data: {
        ...dto,
        holdExpiresAt: dto.holdExpiresAt
          ? new Date(dto.holdExpiresAt)
          : undefined,
      },
    });
  }

  findByShowtime(showtimeId: number) {
    return this.prisma.showtimeSeat.findMany({
      where: { showtimeId },
      include: { seat: true },
      orderBy: [{ seat: { rowNumber: 'asc' } }, { seat: { columnNumber: 'asc' } }],
    });
  }

  async findOne(id: number) {
    const record = await this.prisma.showtimeSeat.findUnique({
      where: { id },
      include: { seat: true, showtime: true },
    });
    if (!record) throw new NotFoundException(`ShowtimeSeat #${id} not found`);
    return record;
  }

  async update(id: number, dto: UpdateShowtimeSeatDto) {
    await this.findOne(id);
    return this.prisma.showtimeSeat.update({
      where: { id },
      data: {
        ...dto,
        holdExpiresAt: dto.holdExpiresAt
          ? new Date(dto.holdExpiresAt)
          : undefined,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.showtimeSeat.delete({ where: { id } });
  }
}
