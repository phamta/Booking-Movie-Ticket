import { apiClient } from '@/lib/api-client';
import { Showtime } from '@/types/common';

export const getShowtimesByMovie = (movieId: number) => apiClient.get<Showtime[]>(`/showtimes?movieId=${movieId}`).then(res => res.data);
export const getShowtime = (id: number) => apiClient.get<Showtime>(`/showtimes/${id}`).then(res => res.data);