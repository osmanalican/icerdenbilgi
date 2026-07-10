import { slugify } from "../../utils/slugify";
import { findUserByFireBaseUid } from "../auth/auth.repository";
import {
  createCompany,
  findCompanyBySlug,
} from "../company/company.repository";
import { createExperience } from "./experience.repository";

type CreateExperienceInput = {
  firebaseUid: string;
  companyName: string;
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

  const normalizedCompanyName = input.companyName.trim();
  const companySlug = slugify(normalizedCompanyName);

  let company = await findCompanyBySlug(companySlug);

  if (!company) {
    company = await createCompany({
      name: normalizedCompanyName,
      slug: companySlug,
    });
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
