import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { randomBytes } from 'crypto';

@Injectable()
export class BookingsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: number, dto: CreateBookingDto) {
    const { showtimeId, seatIds } = dto;

    // Verify all showtime seats are AVAILABLE
    const showtimeSeats = await this.prisma.showtimeSeat.findMany({
      where: { showtimeId, seatId: { in: seatIds } },
    });

    if (showtimeSeats.length !== seatIds.length) {
      throw new BadRequestException('One or more seats not found for this showtime');
    }

    const unavailable = showtimeSeats.filter((s) => s.status !== 'AVAILABLE');
    if (unavailable.length > 0) {
      throw new BadRequestException('One or more seats are not available');
    }

    const bookingCode = randomBytes(6).toString('hex').toUpperCase();
    const totalAmount = showtimeSeats.reduce(
      (sum, s) => sum + (s.price ?? 0),
      0,
    );
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    const booking = await this.prisma.$transaction(async (tx) => {
      const newBooking = await tx.booking.create({
        data: {
          userId,
          showtimeId,
          bookingCode,
          totalAmount,
          expiresAt,
          status: 'PENDING',
          bookingSeats: {
            create: showtimeSeats.map((s) => ({
              seatId: s.seatId,
              price: s.price ?? 0,
            })),
          },
        },
        include: { bookingSeats: true },
      });

      // Mark showtime seats as HELD
      await tx.showtimeSeat.updateMany({
        where: { showtimeId, seatId: { in: seatIds } },
        data: {
          status: 'HELD',
          bookingId: newBooking.id,
          holdExpiresAt: expiresAt,
        },
      });

      return newBooking;
    });

    return booking;
  }

  findAll(userId?: number) {
    return this.prisma.booking.findMany({
      where: userId ? { userId } : undefined,
      include: {
        bookingSeats: { include: { seat: true } },
        showtime: { include: { movie: true, room: { include: { cinema: true } } } },
        payments: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    const booking = await this.prisma.booking.findUnique({
      where: { id },
      include: {
        bookingSeats: { include: { seat: true } },
        showtime: { include: { movie: true, room: { include: { cinema: true } } } },
        payments: true,
      },
    });
    if (!booking) throw new NotFoundException(`Booking #${id} not found`);
    return booking;
  }

  async update(id: number, dto: UpdateBookingDto) {
    await this.findOne(id);
    return this.prisma.booking.update({ where: { id }, data: dto });
  }

  async cancel(id: number) {
    const booking = await this.findOne(id);

    await this.prisma.$transaction(async (tx) => {
      await tx.booking.update({
        where: { id },
        data: { status: 'CANCELLED' },
      });
      // Release the held seats
      await tx.showtimeSeat.updateMany({
        where: { bookingId: id },
        data: { status: 'AVAILABLE', bookingId: null, holdExpiresAt: null },
      });
    });

    return { message: `Booking #${id} cancelled`, bookingCode: booking.bookingCode };
  }
}
