import { apiClient } from '@/lib/api-client';
import { ShowtimeSeat, Booking } from '@/types/common';

export const getShowtimeSeats = (showtimeId: number) => apiClient.get<ShowtimeSeat[]>(`/showtime-seats?showtimeId=${showtimeId}`).then(res => res.data);
export const createBooking = (data: { showtimeId: number, seatIds: number[] }) => apiClient.post<Booking>('/bookings', data).then(res => res.data);
export const getBooking = (id: number) => apiClient.get<Booking>(`/bookings/${id}`).then(res => res.data);
export const cancelBooking = (id: number) => apiClient.delete(`/bookings/${id}`).then(res => res.data);