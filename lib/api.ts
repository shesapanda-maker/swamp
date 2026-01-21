import { requireAuth } from './auth';

export async function apiFetch(
  url: string,
  options: RequestInit = {}
) {
  let token: string;

  try {
    token = requireAuth();
  } catch {
    window.location.href = '/login';
    throw new Error('Not authenticated');
  }

  const res = await fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (res.status === 401) {
    window.location.href = '/login';
    throw new Error('Unauthorized');
  }

  return res;
}
