import { apiFetch } from "./apiFetch";

type DeleteExperienceResponse = {
  success: boolean;
};

export async function deleteExperience(experienceId: string) {
  const response = await apiFetch(`/experiences/${experienceId}`, {
    method: "DELETE",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message ?? "Deneyim silinirken bir hata oluştu.");
  }

  return data as DeleteExperienceResponse;
}
