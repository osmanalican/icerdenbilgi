import type { GetLatestExperiencesResponse } from '@/features/experiences/types';
import { apiFetch } from '@/shared/api';

type GetLatestExperiencesParams = {
  page?: number;
  limit?: number;
};

export async function getLatestExperiences({
  page = 1,
  limit = 6,
}: GetLatestExperiencesParams = {}) {
  const searchParams = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  const response = await apiFetch(`/experiences?${searchParams.toString()}`);

  if (!response.ok) {
    throw new Error('Son deneyimler getirilemedi.');
  }

  return response.json() as Promise<GetLatestExperiencesResponse>;
}
