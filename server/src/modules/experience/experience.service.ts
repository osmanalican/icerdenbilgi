import {
  createExperience,
  findCompanyBySlug,
  findUserByFireBaseUid,
} from "./experience.repository";

type CreateExperienceInput = {
  firebaseUid: string;
  companySlug: string;
  title: string;
  content: string;
  position: string;
  type: "INTERVIEW" | "WORK" | "INTERNSHIP" | "OTHER";
  isAnonymous: boolean;
};

export async function createExperienceService(input: CreateExperienceInput) {
  const user = await findUserByFireBaseUid(input.firebaseUid);

  if (!user) {
    throw new Error("User not found");
  }

  const company = await findCompanyBySlug(input.companySlug);

  if (!company) {
    throw new Error("Company not found");
  }

  return createExperience({
    title: input.title,
    content: input.content,
    position: input.position,
    type: input.type,
    isAnonymous: input.isAnonymous,
    userId: user.id,
    companyId: company.id,
  });
}
