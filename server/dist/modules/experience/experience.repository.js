"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createExperience = createExperience;
exports.findLatestExperiences = findLatestExperiences;
exports.countPublishedExperiences = countPublishedExperiences;
exports.findExperienceById = findExperienceById;
exports.findHelpfulVote = findHelpfulVote;
exports.createHelpfulVote = createHelpfulVote;
exports.deleteHelpfulVote = deleteHelpfulVote;
exports.countHelpfulVotes = countHelpfulVotes;
const prisma_1 = require("../../lib/prisma");
function createExperience(data) {
    return prisma_1.prisma.experience.create({
        data,
    });
}
function findLatestExperiences(page, limit, currentUserId) {
    const skip = (page - 1) * limit;
    return prisma_1.prisma.experience.findMany({
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
function countPublishedExperiences() {
    return prisma_1.prisma.experience.count({
        where: {
            status: "PUBLISHED",
        },
    });
}
function findExperienceById(id) {
    return prisma_1.prisma.experience.findUnique({
        where: {
            id,
        },
        select: {
            id: true,
            status: true,
        },
    });
}
function findHelpfulVote(userId, experienceId) {
    return prisma_1.prisma.helpfulVote.findUnique({
        where: {
            userId_experienceId: {
                userId,
                experienceId,
            },
        },
    });
}
function createHelpfulVote(userId, experienceId) {
    return prisma_1.prisma.helpfulVote.create({
        data: {
            userId,
            experienceId,
        },
    });
}
function deleteHelpfulVote(userId, experienceId) {
    return prisma_1.prisma.helpfulVote.delete({
        where: {
            userId_experienceId: {
                userId,
                experienceId,
            },
        },
    });
}
function countHelpfulVotes(experienceId) {
    return prisma_1.prisma.helpfulVote.count({
        where: {
            experienceId,
        },
    });
}
