import { slugify } from "../../utils/slugify";
import { upsertCompany } from "../company/company.repository";
import type {
  CreateExperienceInput,
  UpdateExperienceInput,
} from "./experience.schema";
import {
  countHelpfulVotes,
  countPublishedExperiences,
  createExperience,
  createHelpfulVote,
  deleteHelpfulVote,
  findExperienceById,
  findExperienceForEdit,
  findExperienceForUpdate,
  findHelpfulVote,
  findLatestExperiences,
  updateExperience,
} from "./experience.repository";

type GetExperiencesInput = {
  page: number;
  limit: number;
  currentUserId?: string;
};
type CreateExperienceServiceInput = CreateExperienceInput & {
  userId: string;
};

type UpdateExperienceServiceInput = UpdateExperienceInput & {
  experienceId: string;
  userId: string;
};

export async function createExperienceService(
  input: CreateExperienceServiceInput,
) {
  const companySlug = slugify(input.companyName);

  const company = await upsertCompany({
    name: input.companyName,
    slug: companySlug,
  });

  const experience = await createExperience({
    title: input.title,
    content: input.content,
    position: input.position,
    type: input.type,
    isAnonymous: input.isAnonymous,
    userId: input.userId,
    companyId: company.id,
  });

  return {
    experienceId: experience.id,
    companySlug: company.slug,
  };
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

export async function updateExperienceService(
  input: UpdateExperienceServiceInput,
) {
  const existingExperience = await findExperienceForUpdate(input.experienceId);

  if (!existingExperience) {
    throw new Error("EXPERIENCE_NOT_FOUND");
  }

  if (existingExperience.userId !== input.userId) {
    throw new Error("FORBIDDEN");
  }

  const companySlug = slugify(input.companyName);

  const company = await upsertCompany({
    name: input.companyName,
    slug: companySlug,
  });

  const experience = await updateExperience(input.experienceId, {
    title: input.title,
    content: input.content,
    position: input.position,
    type: input.type,
    isAnonymous: input.isAnonymous,
    companyId: company.id,
  });

  return {
    experienceId: experience.id,
    companySlug: experience.company.slug,
  };
}

export async function getExperienceForEditService(
  experienceId: string,
  userId: string,
) {
  const experience = await findExperienceForEdit(experienceId);

  if (!experience) {
    throw new Error("EXPERIENCE_NOT_FOUND");
  }

  if (experience.userId !== userId) {
    throw new Error("FORBIDDEN");
  }

  return {
    experience: {
      id: experience.id,
      companyName: experience.company.name,
      position: experience.position,
      type: experience.type,
      title: experience.title,
      content: experience.content,
      isAnonymous: experience.isAnonymous,
    },
  };
}
