"use client";
import { useParams, useRouter } from 'next/navigation';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getBooking } from '@/features/booking/api';
import { createPayment, confirmPayment } from '@/features/payment/api';
import { useCountdown } from '@/hooks/use-countdown';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function CheckoutPage() {
  const { showtimeId: bookingId } = useParams(); // Using the param as bookingId based on router.push
  const router = useRouter();
  
  const { data: booking, isLoading } = useQuery({ 
    queryKey: ['booking', bookingId], 
    queryFn: () => getBooking(Number(bookingId)) 
  });

  const { minutes, seconds, isExpired } = useCountdown(booking?.expiresAt || null);
  const [paying, setPaying] = useState(false);

  const handlePay = async () => {
    setPaying(true);
    try {
      const payment = await createPayment({
        bookingId: Number(bookingId),
        amount: booking!.totalAmount,
        method: 'CARD'
      });
      await confirmPayment(payment.id);
      alert('Payment Successful!');
      router.push('/profile/bookings');
    } catch(e) {
      alert('Payment failed');
      setPaying(false);
    }
  };

  if (isLoading || !booking) return <div className="p-8">Loading checkout...</div>;

  return (
    <div className="max-w-md mx-auto p-8 mt-10 border rounded-xl shadow-sm text-center">
      <h1 className="text-2xl font-bold mb-4">Complete Payment</h1>
      
      {isExpired || booking.status !== 'PENDING' ? (
        <div className="text-red-500 mb-4">Booking is expired or already processed.</div>
      ) : (
        <div className="text-2xl font-mono text-red-500 mb-6">
          Time left: {minutes}:{seconds.toString().padStart(2, '0')}
        </div>
      )}

      <div className="text-left mb-6 bg-muted p-4 rounded-lg">
        <p><strong>Booking Code:</strong> {booking.bookingCode}</p>
        <p><strong>Total Amount:</strong> {booking.totalAmount.toLocaleString()} VND</p>
      </div>

      <Button onClick={handlePay} disabled={isExpired || booking.status !== 'PENDING' || paying} className="w-full">
        {paying ? 'Processing...' : 'Pay with Fake Card'}
      </Button>
    </div>
  );
}