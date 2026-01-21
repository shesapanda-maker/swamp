export function getAccessToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('access_token');
}

export function requireAuth(): string {
  const token = getAccessToken();
  if (!token) {
    throw new Error('UNAUTHORIZED');
  }
  return token;
}

export function logout() {
  localStorage.removeItem('access_token');
}
