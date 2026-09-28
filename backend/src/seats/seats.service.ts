import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSeatDto } from './dto/create-seat.dto';
import { UpdateSeatDto } from './dto/update-seat.dto';

@Injectable()
export class SeatsService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateSeatDto) {
    return this.prisma.seat.create({ data: dto });
  }

  findAll(roomId?: number) {
    return this.prisma.seat.findMany({
      where: roomId ? { roomId } : undefined,
      include: { room: true },
    });
  }

  async findOne(id: number) {
    const seat = await this.prisma.seat.findUnique({
      where: { id },
      include: { room: true },
    });
    if (!seat) throw new NotFoundException(`Seat #${id} not found`);
    return seat;
  }

  async update(id: number, dto: UpdateSeatDto) {
    await this.findOne(id);
    return this.prisma.seat.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.seat.delete({ where: { id } });
  }
}
