import { apiFetch } from "@/shared/api/client";

export type ExperienceType = "INTERVIEW" | "WORK" | "INTERNSHIP" | "OTHER";

type CreateExperienceRequest = {
  companyName: string;
  position: string;
  type: ExperienceType;
  title: string;
  content: string;
  isAnonymous: boolean;
};

export async function createExperience(data: CreateExperienceRequest) {
  const response = await apiFetch("/experiences", {
    method: "POST",
    body: JSON.stringify(data),
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(
      responseData.message ?? "Deneyim oluşturulurken bir hata oluştu.",
    );
  }

  return responseData;
}
