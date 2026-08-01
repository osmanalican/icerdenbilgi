import { apiFetch } from "./apiFetch";

export type UpdateExperienceRequest = {
  companyName: string;
  position: string;
  type: "INTERVIEW" | "WORK" | "INTERNSHIP" | "OTHER";
  title: string;
  content: string;
  isAnonymous: boolean;
};

export type UpdateExperienceResponse = {
  experienceId: string;
  companySlug: string;
};

export async function updateExperience(
  experienceId: string,
  body: UpdateExperienceRequest,
) {
  const response = await apiFetch(`/experiences/${experienceId}`, {
    method: "PUT",
    body: JSON.stringify(body),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message ?? "Deneyim güncellenirken bir hata oluştu.");
  }

  return data as UpdateExperienceResponse;
}
