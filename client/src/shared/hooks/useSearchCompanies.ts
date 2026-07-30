import { useQuery } from "@tanstack/react-query";

import { searchCompanies } from "@/shared/api/client/searchCompanies";

export function useSearchCompanies(query: string) {
  const normalizedQuery = query.trim();

  return useQuery({
    queryKey: ["companies", "search", normalizedQuery],
    queryFn: () => searchCompanies(normalizedQuery),
    enabled: normalizedQuery.length >= 2,
    staleTime: 1000 * 60 * 5,
  });
}
