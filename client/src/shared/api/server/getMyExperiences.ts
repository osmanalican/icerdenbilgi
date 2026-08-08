import "server-only";

import { cookies } from "next/headers";

import type { GetMyExperiencesResponse } from "@/shared/types";

type GetMyExperiencesOptions = {
  page?: number;
};

export async function getMyExperiences({
  page = 1,
}: GetMyExperiencesOptions = {}) {
  const apiUrl = process.env.API_URL;

  if (!apiUrl) {
    throw new Error("API_URL is missing.");
  }

  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session");

  if (!sessionCookie) {
    return null;
  }

  const searchParams = new URLSearchParams({
    page: String(page),
  });

  const response = await fetch(
    `${apiUrl}/experiences/me?${searchParams.toString()}`,
    {
      headers: {
        Cookie: `session=${sessionCookie.value}`,
      },
      cache: "no-store",
    },
  );

  if (response.status === 401) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Experiences could not be fetched.");
  }

  return response.json() as Promise<GetMyExperiencesResponse>;
}
