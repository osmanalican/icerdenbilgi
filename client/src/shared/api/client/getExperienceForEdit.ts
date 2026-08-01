import { apiFetch } from "./apiFetch";

export type GetExperienceForEditResponse = {
  experience: {
    id: string;
    companyName: string;
    position: string;
    type: "INTERVIEW" | "WORK" | "INTERNSHIP" | "OTHER";
    title: string;
    content: string;
    isAnonymous: boolean;
  };
};

export async function getExperienceForEdit(experienceId: string) {
  const response = await apiFetch(`/experiences/${experienceId}/edit`);

  if (!response.ok) {
    throw new Error("Deneyim alınamadı.");
  }

  return response.json() as Promise<GetExperienceForEditResponse>;
}
