import { apiFetch } from '@/shared/api';

type ExperienceType = 'INTERVIEW' | 'WORK' | 'INTERNSHIP' | 'OTHER';

type CreateExperienceRequest = {
  companyName: string;
  position: string;
  type: ExperienceType;
  title: string;
  content: string;
  isAnonymous: boolean;
};

export async function createExperience(token: string, data: CreateExperienceRequest) {
  const response = await apiFetch('/experiences', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.messsage ?? 'Deneyim oluşturulurken bir hata oluştu.   ');
  }
  return responseData;
}
