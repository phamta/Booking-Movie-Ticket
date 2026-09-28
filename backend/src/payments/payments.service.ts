import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Injectable()
export class PaymentsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreatePaymentDto) {
    // Verify booking exists
    const booking = await this.prisma.booking.findUnique({
      where: { id: dto.bookingId },
    });
    if (!booking) throw new NotFoundException(`Booking #${dto.bookingId} not found`);
    if (booking.status === 'CANCELLED') {
      throw new BadRequestException('Cannot pay for a cancelled booking');
    }

    const payment = await this.prisma.$transaction(async (tx) => {
      const newPayment = await tx.payment.create({
        data: {
          bookingId: dto.bookingId,
          amount: dto.amount,
          method: dto.method,
          transactionId: dto.transactionId,
          status: 'PENDING',
        },
      });
      return newPayment;
    });
    return payment;
  }

  async confirm(id: number) {
    const payment = await this.findOne(id);

    return this.prisma.$transaction(async (tx) => {
      const updated = await tx.payment.update({
        where: { id },
        data: { status: 'SUCCESS', paidAt: new Date() },
      });

      // Confirm the booking and mark seats as BOOKED
      await tx.booking.update({
        where: { id: payment.bookingId },
        data: { status: 'CONFIRMED' },
      });

      await tx.showtimeSeat.updateMany({
        where: { bookingId: payment.bookingId },
        data: { status: 'BOOKED', holdExpiresAt: null },
      });

      return updated;
    });
  }

  findAll(bookingId?: number) {
    return this.prisma.payment.findMany({
      where: bookingId ? { bookingId } : undefined,
      include: { booking: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    const payment = await this.prisma.payment.findUnique({
      where: { id },
      include: { booking: true },
    });
    if (!payment) throw new NotFoundException(`Payment #${id} not found`);
    return payment;
  }

  async update(id: number, dto: UpdatePaymentDto) {
    await this.findOne(id);
    return this.prisma.payment.update({ where: { id }, data: dto });
  }
}
