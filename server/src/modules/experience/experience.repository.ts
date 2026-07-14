import { prisma } from "../../lib/prisma";

type CreateExperienceData = {
  title: string;
  content: string;
  position: string;
  type: "INTERVIEW" | "WORK" | "INTERNSHIP" | "OTHER";
  isAnonymous: boolean;
  userId: string;
  companyId: string;
};

export function createExperience(data: CreateExperienceData) {
  return prisma.experience.create({
    data,
  });
}

export function findLatestExperiences(page: number, limit: number) {
  const skip = (page - 1) * limit;

  return prisma.experience.findMany({
    where: {
      status: "PUBLISHED",
    },
    orderBy: {
      createdAt: "desc",
    },
    skip,
    take: limit,
    select: {
      id: true,
      title: true,
      content: true,
      position: true,
      type: true,
      isAnonymous: true,
      createdAt: true,
      company: {
        select: {
          id: true,
          name: true,
          slug: true,
          logoUrl: true,
        },
      },
      user: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
      _count: {
        select: {
          helpfulVotes: true,
        },
      },
    },
  });
}

export function countPublishedExperiences() {
  return prisma.experience.count({
    where: {
      status: "PUBLISHED",
    },
  });
}
