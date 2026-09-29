"use client";
import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getShowtime } from '@/features/showtimes/api';
import { getShowtimeSeats, createBooking } from '@/features/booking/api';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function BookingPage() {
  const { showtimeId } = useParams();
  const router = useRouter();
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

  const { data: showtime } = useQuery({ 
    queryKey: ['showtime', showtimeId], 
    queryFn: () => getShowtime(Number(showtimeId)) 
  });

  const { data: seats, refetch } = useQuery({ 
    queryKey: ['seats', showtimeId], 
    queryFn: () => getShowtimeSeats(Number(showtimeId)) 
  });

  const bookMutation = useMutation({
    mutationFn: () => createBooking({ showtimeId: Number(showtimeId), seatIds: selectedSeats }),
    onSuccess: (data) => {
      router.push(`/booking/${data.id}/success`);
    },
    onError: (err: any) => alert(err?.response?.data?.message || 'Booking failed')
  });

  const toggleSeat = (seatId: number, status: string) => {
    if (status !== 'AVAILABLE') return;
    setSelectedSeats(prev => 
      prev.includes(seatId) ? prev.filter(id => id !== seatId) : [...prev, seatId]
    );
  };

  const totalPrice = seats?.filter(s => selectedSeats.includes(s.seatId)).reduce((sum, s) => sum + s.price, 0) || 0;

  if (!showtime || !seats) return <div className="p-8">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-8 text-center">
      <h1 className="text-2xl font-bold mb-2">Select Seats</h1>
      <p className="text-muted-foreground mb-8">{showtime.movie?.title} • {new Date(showtime.startTime).toLocaleString()}</p>
      
      <div className="mb-8 p-4 bg-muted text-center rounded-lg w-full max-w-md mx-auto">SCREEN</div>
      
      <div className="flex flex-wrap gap-2 justify-center max-w-2xl mx-auto mb-8">
        {seats.map(s => {
          const isSelected = selectedSeats.includes(s.seatId);
          let bg = 'bg-gray-100 hover:bg-gray-200 cursor-pointer';
          if (s.status !== 'AVAILABLE') bg = 'bg-gray-400 cursor-not-allowed opacity-50';
          if (isSelected) bg = 'bg-primary text-white cursor-pointer';

          return (
            <div 
              key={s.id} 
              onClick={() => toggleSeat(s.seatId, s.status)}
              className={`w-10 h-10 flex items-center justify-center rounded ${bg}`}
            >
              {s.seat.seatCode}
            </div>
          );
        })}
      </div>

      <div className="border-t pt-4 flex justify-between items-center">
        <div>
          <p className="font-semibold">Total: {totalPrice.toLocaleString()} VND</p>
          <p className="text-sm text-muted-foreground">{selectedSeats.length} seats selected</p>
        </div>
        <Button 
          onClick={() => bookMutation.mutate()} 
          disabled={selectedSeats.length === 0 || bookMutation.isPending}
        >
          {bookMutation.isPending ? 'Booking...' : 'Continue to Payment'}
        </Button>
      </div>
    </div>
  );
}