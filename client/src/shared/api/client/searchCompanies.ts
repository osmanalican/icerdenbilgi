import { apiFetch } from "./apiFetch";

export type CompanySuggestion = {
  id: string;
  name: string;
  slug: string;
  logoUrl: string | null;
};

type SearchCompaniesResponse = {
  companies: CompanySuggestion[];
};

export async function searchCompanies(query: string) {
  const response = await apiFetch(
    `/companies/search?q=${encodeURIComponent(query)}`,
  );

  const data: SearchCompaniesResponse | { message?: string } =
    await response.json();

  if (!response.ok) {
    throw new Error(
      "message" in data && data.message
        ? data.message
        : "Şirketler getirilemedi.",
    );
  }

  return (data as SearchCompaniesResponse).companies;
}
