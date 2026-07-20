const apiUrl = process.env.NEXT_PUBLIC_API_URL;

if (!apiUrl) {
  throw new Error("NEXT_PUBLIC_API_URL tanımlı değil.");
}

export async function deleteSession(): Promise<void> {
  const response = await fetch(`${apiUrl}/auth/session`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    const data = await response.json().catch(() => null);

    throw new Error(data?.message ?? "Sunucu oturumu kapatılamadı.");
  }
}
