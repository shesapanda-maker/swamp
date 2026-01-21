'use client';

console.log('ENV CHECK', process.env.NEXT_PUBLIC_SUPABASE_URL);

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabaseBrowser } from '@/lib/supabaseBrowser';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function signIn() {
    setLoading(true);

    const { data, error } = await supabaseBrowser.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    const token = data.session?.access_token;
    if (!token) {
      alert('No access token received');
      return;
    }

    localStorage.setItem('access_token', token);
    router.push('/works/new');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50">
      <div className="w-full max-w-sm rounded-xl border bg-white p-6 shadow-sm">

        {/* Заголовок */}
        <h1 className="mb-6 text-2xl font-bold text-blue-600">
          Tailwind Login Test 🎉
        </h1>

        {/* Email */}
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-3 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Password */}
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Button */}
        <button
          onClick={signIn}
          disabled={loading}
          className="w-full rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Signing in…' : 'Sign in'}
        </button>

        {/* Явный Tailwind-индикатор */}
        <div className="mt-6 rounded-md border border-dashed p-3 text-center text-sm text-zinc-600">
          If this card is centered, white, with shadow — Tailwind works ✅
        </div>
      </div>
    </div>
  );
}
