"use client";
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { Cinema } from '@/types/common';

const getCinemas = () => apiClient.get<Cinema[]>('/cinemas').then(res => res.data);

export default function CinemasPage() {
  const { data: cinemas, isLoading } = useQuery({ queryKey: ['cinemas'], queryFn: getCinemas });

  if (isLoading) return <div className="p-8">Loading cinemas...</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Our Cinemas</h1>
      <div className="flex flex-col gap-4">
        {cinemas?.map(c => (
          <div key={c.id} className="border p-4 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold">{c.name}</h2>
            <p className="text-muted-foreground">{c.address}</p>
            <p className="text-sm mt-2">Phone: {c.phone}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
