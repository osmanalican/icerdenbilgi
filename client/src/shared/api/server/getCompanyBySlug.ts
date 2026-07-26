import "server-only";

import { cookies } from "next/headers";

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

  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session");

  const headers = new Headers();

  if (sessionCookie) {
    headers.set("Cookie", `session=${sessionCookie.value}`);
  }

  const response = await fetch(
    `${apiUrl}/companies/${encodeURIComponent(slug)}?${searchParams.toString()}`,
    {
      headers,
      cache: "no-store",
    },
  );

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Company could not be fetched.");
  }

  return response.json() as Promise<GetCompanyResponse>;
}
