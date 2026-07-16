import type { GetLatestExperiencesResponse } from "@/shared/types";

type GetLatestExperiencesParams = {
  page?: number;
  limit?: number;
};

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

if (!apiUrl) {
  throw new Error("NEXT_PUBLIC_API_URL is missing.");
}

export async function getLatestExperiences({
  page = 1,
  limit = 6,
}: GetLatestExperiencesParams = {}): Promise<GetLatestExperiencesResponse> {
  const searchParams = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  const response = await fetch(
    `${apiUrl}/experiences?${searchParams.toString()}`,
    {
      next: {
        revalidate: 60,
      },
    },
  );

  if (!response.ok) {
    throw new Error("Latest experiences could not be fetched.");
  }

  return response.json();
}
