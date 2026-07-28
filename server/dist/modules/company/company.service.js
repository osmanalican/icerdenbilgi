"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchCompaniesService = searchCompaniesService;
exports.getCompanyBySlugService = getCompanyBySlugService;
const company_repository_1 = require("./company.repository");
async function searchCompaniesService(rawQuery) {
    const query = rawQuery.trim();
    if (query.length < 2) {
        return [];
    }
    return (0, company_repository_1.searchCompanies)(query);
}
async function getCompanyBySlugService(slug, { page, limit, currentUserId }) {
    const company = await (0, company_repository_1.findCompanyBySlugWithExperiences)(slug, {
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
