"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upsertCompany = upsertCompany;
exports.findCompanyBySlug = findCompanyBySlug;
exports.createCompany = createCompany;
exports.searchCompanies = searchCompanies;
exports.findCompanyBySlugWithExperiences = findCompanyBySlugWithExperiences;
const prisma_1 = require("../../lib/prisma");
function upsertCompany(data) {
    return prisma_1.prisma.company.upsert({
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
function findCompanyBySlug(slug) {
    return prisma_1.prisma.company.findUnique({
        where: { slug },
    });
}
function createCompany(data) {
    return prisma_1.prisma.company.create({
        data,
    });
}
function searchCompanies(query) {
    return prisma_1.prisma.company.findMany({
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
function findCompanyBySlugWithExperiences(slug, { page, limit, currentUserId }) {
    const skip = (page - 1) * limit;
    return prisma_1.prisma.company.findUnique({
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
