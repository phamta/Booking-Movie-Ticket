"use client";
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/login');
      } else if (user.role !== 'ADMIN') {
        router.push('/');
      }
    }
  }, [user, loading, router]);

  if (loading || (user && user.role !== 'ADMIN')) return <div className="p-8">Checking access...</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-primary">Admin Dashboard</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {['movies', 'cinemas', 'rooms', 'showtimes', 'bookings'].map(key => (
          <div key={key} className="border p-6 rounded-lg text-center cursor-pointer hover:bg-muted transition" onClick={() => router.push(`/admin/\${key}`)}>
            <h2 className="text-xl capitalize font-semibold">{key}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
