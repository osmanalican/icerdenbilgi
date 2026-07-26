import { slugify } from "../../utils/slugify";
import {
  createCompany,
  findCompanyBySlug,
} from "../company/company.repository";
import {
  countHelpfulVotes,
  countPublishedExperiences,
  createExperience,
  createHelpfulVote,
  deleteHelpfulVote,
  findExperienceById,
  findHelpfulVote,
  findLatestExperiences,
} from "./experience.repository";

type CreateExperienceInput = {
  userId: string;
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
  currentUserId?: string;
};

export async function createExperienceService(input: CreateExperienceInput) {
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
    userId: input.userId,
    companyId: company.id,
  });
}

export async function getExperiencesService({
  page,
  limit,
  currentUserId,
}: GetExperiencesInput) {
  const [experiences, total] = await Promise.all([
    findLatestExperiences(page, limit, currentUserId),
    countPublishedExperiences(),
  ]);

  return {
    experiences: experiences.map((experience) => ({
      id: experience.id,
      title: experience.title,
      content: experience.content,
      position: experience.position,
      type: experience.type,
      isAnonymous: experience.isAnonymous,
      createdAt: experience.createdAt,
      company: experience.company,
      user: experience.user,

      helpfulCount: experience._count.helpfulVotes,

      hasVoted: experience.helpfulVotes
        ? experience.helpfulVotes.length > 0
        : false,
    })),

    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export async function toggleHelpfulVoteService(
  userId: string,
  experienceId: string,
) {
  const experience = await findExperienceById(experienceId);

  if (!experience || experience.status !== "PUBLISHED") {
    throw new Error("EXPERIENCE_NOT_FOUND");
  }

  const existingVote = await findHelpfulVote(userId, experienceId);

  if (existingVote) {
    await deleteHelpfulVote(userId, experienceId);

    const helpfulCount = await countHelpfulVotes(experienceId);

    return {
      isHelpful: false,
      helpfulCount,
    };
  }

  await createHelpfulVote(userId, experienceId);

  const helpfulCount = await countHelpfulVotes(experienceId);

  return {
    isHelpful: true,
    helpfulCount,
  };
}
