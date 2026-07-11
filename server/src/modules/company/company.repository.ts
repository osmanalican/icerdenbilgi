import { prisma } from "../../lib/prisma";

type CreateCompanyData = {
  name: string;
  slug: string;
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

export function findCompanyBySlugWithExperiences(slug: string) {
  return prisma.company.findUnique({
    where: { slug },
    include: {
      experiences: {
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
