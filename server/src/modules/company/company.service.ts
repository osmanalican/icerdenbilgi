import {
  findCompanyBySlugWithExperiences,
  searchCompanies,
} from "./company.repository";

export async function searchCompaniesService(rawQuery: string) {
  const query = rawQuery.trim();

  if (query.length < 2) {
    return [];
  }

  return searchCompanies(query);
}

export function getCompanyBySlugService(slug: string) {
  const company = findCompanyBySlugWithExperiences(slug);
  if (!company) {
    throw new Error("Company not found");
  }
  return company;
}
