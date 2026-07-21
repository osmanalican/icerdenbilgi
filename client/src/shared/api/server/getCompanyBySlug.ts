import 'server-only';

import type { GetCompanyResponse } from '@/shared/types';

export async function getCompanyBySlug(slug: string) {
  const apiUrl = process.env.API_URL;

  if (!apiUrl) {
    throw new Error('API_URL is missing.');
  }

  const response = await fetch(
    `${apiUrl}/companies/${encodeURIComponent(slug)}`,
    {
      next: {
        revalidate: 60,
      },
    },
  );

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error('Company could not be fetched.');
  }

  const data: GetCompanyResponse = await response.json();

  return data.company;
}