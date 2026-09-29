"use client";
import { useQuery } from '@tanstack/react-query';
import { getMovie } from '@/features/movies/api';
import { getShowtimesByMovie } from '@/features/showtimes/api';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function MovieDetail() {
  const { movieId } = useParams();
  const { data: movie, isLoading: mLoading } = useQuery({ 
    queryKey: ['movie', movieId], 
    queryFn: () => getMovie(Number(movieId)) 
  });
  
  const { data: showtimes, isLoading: sLoading } = useQuery({ 
    queryKey: ['showtimes', movieId], 
    queryFn: () => getShowtimesByMovie(Number(movieId)) 
  });

  if (mLoading) return <div className="p-8">Loading...</div>;
  if (!movie) return <div className="p-8">Movie not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="flex gap-8 mb-12">
        <div className="w-64 h-96 bg-muted rounded">
           {movie.posterUrl && <img src={movie.posterUrl} className="w-full h-full object-cover rounded" /> }
        </div>
        <div>
          <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
          <p className="text-muted-foreground mb-4">{movie.durationMinutes} Minutes • {movie.ageRating}</p>
          <p>{movie.description}</p>
        </div>
      </div>
      
      <h2 className="text-2xl font-bold mb-4">Showtimes</h2>
      {sLoading ? <div>Loading showtimes...</div> : (
        <div className="grid gap-4">
          {showtimes?.map(st => (
            <div key={st.id} className="border p-4 rounded-lg flex justify-between items-center">
              <div>
                <p className="font-semibold">{st.room?.cinema?.name} - {st.room?.name}</p>
                <p className="text-sm">{new Date(st.startTime).toLocaleString()} - {new Date(st.endTime).toLocaleTimeString()}</p>
              </div>
              <Link href={`/booking/${st.id}`}>
                <Button>Book Tickets</Button>
              </Link>
            </div>
          ))}
          {showtimes?.length === 0 && <p>No showtimes available.</p>}
        </div>
      )}
    </div>
  );
}