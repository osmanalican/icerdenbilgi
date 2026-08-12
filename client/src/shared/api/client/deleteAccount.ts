import { apiFetch } from "./apiFetch";

type DeleteAccountResponse = {
  success?: boolean;
  message?: string;
};

export async function deleteAccount(): Promise<void> {
  const response = await apiFetch("/auth/account", {
    method: "DELETE",
  });

  const data = (await response
    .json()
    .catch(() => null)) as DeleteAccountResponse | null;

  if (!response.ok) {
    throw new Error(data?.message ?? "Hesap silinemedi.");
  }
}
