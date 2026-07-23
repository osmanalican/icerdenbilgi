import {
  findCompanyBySlugWithExperiences,
  searchCompanies,
} from "./company.repository";

type GetCompanyBySlugOptions = {
  page: number;
  limit: number;
};

export async function searchCompaniesService(rawQuery: string) {
  const query = rawQuery.trim();

  if (query.length < 2) {
    return [];
  }

  return searchCompanies(query);
}

export async function getCompanyBySlugService(
  slug: string,
  { page, limit }: GetCompanyBySlugOptions,
) {
  const company = await findCompanyBySlugWithExperiences(slug, {
    page,
    limit,
  });

  if (!company) {
    throw new Error("COMPANY_NOT_FOUND");
  }

  const total = company._count.experiences;
  const totalPages = Math.ceil(total / limit);

  return {
    company: {
      id: company.id,
      name: company.name,
      slug: company.slug,
      logoUrl: company.logoUrl,
      experiences: company.experiences,
      experienceCount: total,
    },
    pagination: {
      page,
      limit,
      total,
      totalPages,
    },
  };
}
