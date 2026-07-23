import { prisma } from "../../lib/prisma";

type CreateCompanyData = {
  name: string;
  slug: string;
};

type FindCompanyWithExperiencesOptions = {
  page: number;
  limit: number;
};

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
  { page, limit }: FindCompanyWithExperiencesOptions,
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
          experiences: true,
        },
      },
      experiences: {
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
        },
      },
    },
  });
}
