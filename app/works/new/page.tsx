'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiFetch } from '@/lib/api';
import { logout } from '@/lib/auth';

export default function NewWorkPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);

  async function createWork() {
    setLoading(true);

    const token = localStorage.getItem('access_token');
    if (!token) {
    alert('Please login first: /login');
    return;
    }

    const res = await apiFetch('/api/works', {
      method: 'POST',
      body: JSON.stringify({
      title,
      work_type: 'fanfic',
      rating: 'PG',
      category: 'general',
    }),
});

    const data = await res.json();

    setLoading(false);

    if (!res.ok) {
      alert(data.error);
      return;
    }

    router.push(`/works/${data.id}/edit`);
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>Create new work</h1>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <br /><br />

      <button onClick={createWork} disabled={loading}>
        {loading ? 'Creating…' : 'Create'}
      </button>
    </div>
  );
}
<button onClick={logout}>Logout</button>