import "server-only";

import { cookies } from "next/headers";

import type { GetLatestExperiencesResponse } from "@/shared/types";

type GetLatestExperiencesOptions = {
  page?: number;
  limit?: number;
};

export async function getLatestExperiences({
  page = 1,
  limit = 6,
}: GetLatestExperiencesOptions = {}) {
  const apiUrl = process.env.API_URL;

  if (!apiUrl) {
    throw new Error("API_URL is missing.");
  }

  const searchParams = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session");

  const headers = new Headers();

  if (sessionCookie) {
    headers.set("Cookie", `session=${sessionCookie.value}`);
  }

  const response = await fetch(
    `${apiUrl}/experiences?${searchParams.toString()}`,
    {
      headers,
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("Experiences could not be fetched.");
  }

  return response.json() as Promise<GetLatestExperiencesResponse>;
}
