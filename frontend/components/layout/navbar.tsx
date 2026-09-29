"use client";
import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="border-b shadow-sm p-4 flex justify-between items-center bg-background">
      <div className="flex gap-4 items-center">
        <Link href="/" className="text-xl font-bold text-primary">MovieTickets</Link>
        <Link href="/movies" className="hover:text-primary">Movies</Link>
        <Link href="/cinemas" className="hover:text-primary">Cinemas</Link>
      </div>
      <div>
        {user ? (
          <div className="flex gap-4 items-center">
            <span className="text-sm">Hi, {user.name}</span>
            <Button variant="outline" onClick={logout}>Logout</Button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link href="/login"><Button variant="outline">Login</Button></Link>
            <Link href="/register"><Button>Sign Up</Button></Link>
          </div>
        )}
      </div>
    </nav>
  );
}