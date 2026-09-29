"use client";
import { useState } from 'react';
import { register } from '@/features/auth/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await register({ name, email, password });
      window.location.href = '/login';
    } catch(err) {
      alert('Registration failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
        <Input placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        <Input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
}