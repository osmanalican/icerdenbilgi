import { getLatestExperiences } from '@/features/experiences/api/getLatestExperiences';
import { useQuery } from '@tanstack/react-query';

type UseLatestExperiencesParams = {
  page?: number;
  limit?: number;
};

export function useLatestExperiences({ page = 1, limit = 6 }: UseLatestExperiencesParams = {}) {
  return useQuery({
    queryKey: ['experiences', 'latest', page, limit],
    queryFn: () => getLatestExperiences({ page, limit }),
  });
}
