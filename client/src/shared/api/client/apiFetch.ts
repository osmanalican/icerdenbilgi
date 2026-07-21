const apiUrl = process.env.NEXT_PUBLIC_API_URL;

if (!apiUrl) {
  throw new Error("NEXT_PUBLIC_API_URL is missing.");
}

export function apiFetch(path: string, init?: RequestInit) {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
    ...init,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });
}
