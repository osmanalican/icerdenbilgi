import { searchCompanies } from "./company.repository";

export async function searchCompaniesService(rawQuery: string) {
  const query = rawQuery.trim();

  if (query.length < 2) {
    return [];
  }

  return searchCompanies(query);
}
