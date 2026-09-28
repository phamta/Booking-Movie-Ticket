import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateShowtimeDto } from './dto/create-showtime.dto';
import { UpdateShowtimeDto } from './dto/update-showtime.dto';

@Injectable()
export class ShowtimesService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateShowtimeDto) {
    return this.prisma.showtime.create({
      data: {
        ...dto,
        startTime: new Date(dto.startTime),
        endTime: new Date(dto.endTime),
      },
    });
  }

  findAll(movieId?: number, roomId?: number) {
    return this.prisma.showtime.findMany({
      where: {
        ...(movieId && { movieId }),
        ...(roomId && { roomId }),
      },
      include: { movie: true, room: { include: { cinema: true } } },
      orderBy: { startTime: 'asc' },
    });
  }

  async findOne(id: number) {
    const showtime = await this.prisma.showtime.findUnique({
      where: { id },
      include: { movie: true, room: { include: { cinema: true } } },
    });
    if (!showtime) throw new NotFoundException(`Showtime #${id} not found`);
    return showtime;
  }

  async update(id: number, dto: UpdateShowtimeDto) {
    await this.findOne(id);
    return this.prisma.showtime.update({
      where: { id },
      data: {
        ...dto,
        startTime: dto.startTime ? new Date(dto.startTime) : undefined,
        endTime: dto.endTime ? new Date(dto.endTime) : undefined,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.showtime.delete({ where: { id } });
  }
}
