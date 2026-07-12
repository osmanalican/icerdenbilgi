import { useQuery } from '@tanstack/react-query';

import { apiFetch } from '@/shared/api';
import type { GetCompanyResponse } from '../types/company';

export function useCompany(slug?: string) {
  return useQuery({
    queryKey: ['company', slug],
    enabled: Boolean(slug),
    queryFn: async () => {
      const response = await apiFetch(`/companies/${slug}`);

      if (!response.ok) {
        throw new Error('Company fetch failed.');
      }

      const data: GetCompanyResponse = await response.json();

      return data.company;
    },
  });
}
