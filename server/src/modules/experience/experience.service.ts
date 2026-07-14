import { slugify } from "../../utils/slugify";
import { findUserByFireBaseUid } from "../auth/auth.repository";
import {
  createCompany,
  findCompanyBySlug,
} from "../company/company.repository";
import {
  countPublishedExperiences,
  createExperience,
  findLatestExperiences,
} from "./experience.repository";

type CreateExperienceInput = {
  firebaseUid: string;
  companyName: string;
  title: string;
  content: string;
  position: string;
  type: "INTERVIEW" | "WORK" | "INTERNSHIP" | "OTHER";
  isAnonymous: boolean;
};

type GetExperiencesInput = {
  page: number;
  limit: number;
};

export async function createExperienceService(input: CreateExperienceInput) {
  const user = await findUserByFireBaseUid(input.firebaseUid);

  if (!user) {
    throw new Error("USER_NOT_FOUND");
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
    title: input.title.trim(),
    content: input.content.trim(),
    position: input.position.trim(),
    type: input.type,
    isAnonymous: input.isAnonymous,
    userId: user.id,
    companyId: company.id,
  });
}

export async function getExperiencesService({
  page,
  limit,
}: GetExperiencesInput) {
  const [experiences, total] = await Promise.all([
    findLatestExperiences(page, limit),
    countPublishedExperiences(),
  ]);

  return {
    experiences,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}
