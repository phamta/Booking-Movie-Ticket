import { apiClient } from '@/lib/api-client';
import { Movie } from '@/types/common';

export const getMovies = () => apiClient.get<Movie[]>('/movies').then(res => res.data);
export const getMovie = (id: number) => apiClient.get<Movie>(`/movies/${id}`).then(res => res.data);