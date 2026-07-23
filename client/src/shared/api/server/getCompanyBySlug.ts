import "server-only";

import type { GetCompanyResponse } from "@/shared/types";

type GetCompanyBySlugOptions = {
  page?: number;
};

export async function getCompanyBySlug(
  slug: string,
  { page = 1 }: GetCompanyBySlugOptions = {},
) {
  const apiUrl = process.env.API_URL;

  if (!apiUrl) {
    throw new Error("API_URL is missing.");
  }

  const searchParams = new URLSearchParams({
    page: String(page),
  });

  const response = await fetch(
    `${apiUrl}/companies/${encodeURIComponent(slug)}?${searchParams.toString()}`,
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
    throw new Error("Company could not be fetched.");
  }

  const data: GetCompanyResponse = await response.json();

  return data;
}
