"use client";
import { useQuery } from '@tanstack/react-query';
import { getMovies } from '@/features/movies/api';
import Link from 'next/link';

export default function MoviesPage() {
  const { data: movies, isLoading } = useQuery({ queryKey: ['movies'], queryFn: getMovies });

  if (isLoading) return <div className="p-8">Loading movies...</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Now Showing</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {movies?.map(movie => (
          <Link href={`/movies/${movie.id}`} key={movie.id} className="border rounded-lg overflow-hidden block hover:shadow-lg transition">
            <div className="bg-muted aspect-[2/3] flex items-center justify-center p-4">
               {movie.posterUrl ? <img src={movie.posterUrl} alt={movie.title} className="w-full h-full object-cover" /> : <span>No Poster</span>}
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg">{movie.title}</h3>
              <p className="text-muted-foreground text-sm">{movie.durationMinutes} mins</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}