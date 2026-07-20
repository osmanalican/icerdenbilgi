export type SessionUser = {
  id: string;
  firebaseUid: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  avatarUrl: string | null;
  role: "USER" | "ADMIN";
};

export type SessionResponse = {
  authenticated: true;
  user: SessionUser;
};

export async function getSession(): Promise<SessionResponse | null> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/session`,
    {
      method: "GET",
      credentials: "include",
      cache: "no-store",
    },
  );

  if (response.status === 401) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Oturum bilgisi alınamadı.");
  }

  return response.json() as Promise<SessionResponse>;
}
