"use client";
import { useState } from 'react';
import { login } from '@/features/auth/api';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login: authenticate } = useAuth();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await login({ email, password });
      authenticate(res.accessToken, res.user);
      window.location.href = '/';
    } catch(err) {
      alert('Login failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        <Input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
}