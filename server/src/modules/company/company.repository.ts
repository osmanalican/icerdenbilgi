import { prisma } from "../../lib/prisma";

type CreateCompanyData = {
  name: string;
  slug: string;
};

type FindCompanyWithExperiencesOptions = {
  page: number;
  limit: number;
  currentUserId?: string;
};

type UpsertCompanyData = {
  name: string;
  slug: string;
};

export function upsertCompany(data: UpsertCompanyData) {
  return prisma.company.upsert({
    where: {
      slug: data.slug,
    },
    update: {},
    create: {
      name: data.name,
      slug: data.slug,
    },
  });
}

export function findCompanyBySlug(slug: string) {
  return prisma.company.findUnique({
    where: { slug },
  });
}

export function createCompany(data: CreateCompanyData) {
  return prisma.company.create({
    data,
  });
}

export function searchCompanies(query: string) {
  return prisma.company.findMany({
    where: {
      name: {
        contains: query,
        mode: "insensitive",
      },
    },
    select: {
      id: true,
      name: true,
      slug: true,
      logoUrl: true,
    },
    orderBy: {
      name: "asc",
    },
    take: 8,
  });
}

export function findCompanyBySlugWithExperiences(
  slug: string,
  { page, limit, currentUserId }: FindCompanyWithExperiencesOptions,
) {
  const skip = (page - 1) * limit;

  return prisma.company.findUnique({
    where: { slug },
    select: {
      id: true,
      name: true,
      slug: true,
      logoUrl: true,

      _count: {
        select: {
          experiences: {
            where: {
              status: "PUBLISHED",
            },
          },
        },
      },

      experiences: {
        where: {
          status: "PUBLISHED",
        },
        skip,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          title: true,
          content: true,
          position: true,
          type: true,
          createdAt: true,
          isAnonymous: true,

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
      },
    },
  });
}
