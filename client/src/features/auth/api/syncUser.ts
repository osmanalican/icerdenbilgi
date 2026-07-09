import { apiFetch } from '@/shared/api';

export async function syncUser(token: string) {
  const response = await apiFetch('/auth/sync', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('User sync failed.');
  }

  return response.json();
}
