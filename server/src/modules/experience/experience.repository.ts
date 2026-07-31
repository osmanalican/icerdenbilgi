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

type UpdateExperienceData = {
  title: string;
  content: string;
  position: string;
  type: "INTERVIEW" | "WORK" | "INTERNSHIP" | "OTHER";
  isAnonymous: boolean;
  companyId: string;
};

export function createExperience(data: CreateExperienceData) {
  return prisma.experience.create({
    data,
  });
}

export function findLatestExperiences(
  page: number,
  limit: number,
  currentUserId?: string,
) {
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

      helpfulVotes: currentUserId
        ? {
            where: {
              userId: currentUserId,
            },
            select: {
              id: true,
            },
          }
        : false,
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

export function findExperienceById(id: string) {
  return prisma.experience.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      status: true,
    },
  });
}

export function findExperienceForUpdate(id: string) {
  return prisma.experience.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      userId: true,
    },
  });
}

export function findHelpfulVote(userId: string, experienceId: string) {
  return prisma.helpfulVote.findUnique({
    where: {
      userId_experienceId: {
        userId,
        experienceId,
      },
    },
  });
}

export function createHelpfulVote(userId: string, experienceId: string) {
  return prisma.helpfulVote.create({
    data: {
      userId,
      experienceId,
    },
  });
}

export function deleteHelpfulVote(userId: string, experienceId: string) {
  return prisma.helpfulVote.delete({
    where: {
      userId_experienceId: {
        userId,
        experienceId,
      },
    },
  });
}

export function countHelpfulVotes(experienceId: string) {
  return prisma.helpfulVote.count({
    where: {
      experienceId,
    },
  });
}

export function updateExperience(id: string, data: UpdateExperienceData) {
  return prisma.experience.update({
    where: {
      id,
    },
    data,
    select: {
      id: true,
      company: {
        select: {
          slug: true,
        },
      },
    },
  });
}
