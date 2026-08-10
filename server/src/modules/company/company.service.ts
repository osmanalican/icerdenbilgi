import {
  findCompaniesForSitemap,
  findCompanyBySlugWithExperiences,
  searchCompanies,
} from "./company.repository";

type GetCompanyBySlugOptions = {
  page: number;
  limit: number;
  currentUserId?: string;
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
  { page, limit, currentUserId }: GetCompanyBySlugOptions,
) {
  const company = await findCompanyBySlugWithExperiences(slug, {
    page,
    limit,
    currentUserId,
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

      experiences: company.experiences.map((experience) => ({
        id: experience.id,
        title: experience.title,
        content: experience.content,
        position: experience.position,
        type: experience.type,
        createdAt: experience.createdAt,
        isAnonymous: experience.isAnonymous,
        user: experience.user,

        helpfulCount: experience._count.helpfulVotes,

        hasVoted: experience.helpfulVotes
          ? experience.helpfulVotes.length > 0
          : false,

        canEdit: Boolean(currentUserId) && experience.userId === currentUserId,
      })),

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

export async function getCompaniesForSitemapService() {
  return findCompaniesForSitemap();
}
