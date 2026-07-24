import "server-only";

import { cookies } from "next/headers";

import type { SessionResponse } from "./getSession";

export async function getServerSession(): Promise<SessionResponse | null> {
  const apiUrl = process.env.API_URL;

  if (!apiUrl) {
    throw new Error("API_URL is missing.");
  }

  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session");

  if (!sessionCookie) {
    return null;
  }

  const response = await fetch(`${apiUrl}/auth/session`, {
    method: "GET",
    headers: {
      Cookie: `session=${sessionCookie.value}`,
    },
    cache: "no-store",
  });

  if (response.status === 401) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Server session could not be fetched.");
  }

  return response.json() as Promise<SessionResponse>;
}
