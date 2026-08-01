import "server-only";

import { cookies } from "next/headers";

import type { ExperienceType } from "@/shared/types";

export type ExperienceForEdit = {
  id: string;
  companyName: string;
  position: string;
  type: ExperienceType;
  title: string;
  content: string;
  isAnonymous: boolean;
};

type GetExperienceForEditResponse = {
  experience: ExperienceForEdit;
};

export async function getExperienceForEdit(experienceId: string) {
  const apiUrl = process.env.API_URL;

  if (!apiUrl) {
    throw new Error("API_URL is missing.");
  }

  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session");

  const headers = new Headers();

  if (sessionCookie) {
    headers.set("Cookie", `session=${sessionCookie.value}`);
  }

  const response = await fetch(
    `${apiUrl}/experiences/${encodeURIComponent(experienceId)}/edit`,
    {
      headers,
      cache: "no-store",
    },
  );

  if (response.status === 404) {
    return null;
  }

  if (response.status === 401) {
    throw new Error("UNAUTHORIZED");
  }

  if (response.status === 403) {
    throw new Error("FORBIDDEN");
  }

  if (!response.ok) {
    throw new Error("Experience could not be fetched.");
  }

  const data = (await response.json()) as GetExperienceForEditResponse;

  return data.experience;
}
