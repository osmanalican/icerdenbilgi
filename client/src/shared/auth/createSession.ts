const apiUrl = process.env.NEXT_PUBLIC_API_URL;

if (!apiUrl) {
  throw new Error("NEXT_PUBLIC_API_URL is missing.");
}

type CreateSessionResponse = {
  success?: boolean;
  message?: string;
};

export async function createSession(idToken: string): Promise<void> {
  const response = await fetch(`${apiUrl}/auth/session`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      idToken,
    }),
  });

  const data = (await response.json()) as CreateSessionResponse;

  if (!response.ok) {
    throw new Error(data.message ?? "Oturum oluşturulamadı.");
  }
}
