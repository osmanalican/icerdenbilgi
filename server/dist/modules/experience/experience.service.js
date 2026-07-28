"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createExperienceService = createExperienceService;
exports.getExperiencesService = getExperiencesService;
exports.toggleHelpfulVoteService = toggleHelpfulVoteService;
const slugify_1 = require("../../utils/slugify");
const company_repository_1 = require("../company/company.repository");
const experience_repository_1 = require("./experience.repository");
async function createExperienceService(input) {
    const companySlug = (0, slugify_1.slugify)(input.companyName);
    const company = await (0, company_repository_1.upsertCompany)({
        name: input.companyName,
        slug: companySlug,
    });
    const experience = await (0, experience_repository_1.createExperience)({
        title: input.title,
        content: input.content,
        position: input.position,
        type: input.type,
        isAnonymous: input.isAnonymous,
        userId: input.userId,
        companyId: company.id,
    });
    return {
        experienceId: experience.id,
        companySlug: company.slug,
    };
}
async function getExperiencesService({ page, limit, currentUserId, }) {
    const [experiences, total] = await Promise.all([
        (0, experience_repository_1.findLatestExperiences)(page, limit, currentUserId),
        (0, experience_repository_1.countPublishedExperiences)(),
    ]);
    return {
        experiences: experiences.map((experience) => ({
            id: experience.id,
            title: experience.title,
            content: experience.content,
            position: experience.position,
            type: experience.type,
            isAnonymous: experience.isAnonymous,
            createdAt: experience.createdAt,
            company: experience.company,
            user: experience.user,
            helpfulCount: experience._count.helpfulVotes,
            hasVoted: experience.helpfulVotes
                ? experience.helpfulVotes.length > 0
                : false,
        })),
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
        },
    };
}
async function toggleHelpfulVoteService(userId, experienceId) {
    const experience = await (0, experience_repository_1.findExperienceById)(experienceId);
    if (!experience || experience.status !== "PUBLISHED") {
        throw new Error("EXPERIENCE_NOT_FOUND");
    }
    const existingVote = await (0, experience_repository_1.findHelpfulVote)(userId, experienceId);
    if (existingVote) {
        await (0, experience_repository_1.deleteHelpfulVote)(userId, experienceId);
        const helpfulCount = await (0, experience_repository_1.countHelpfulVotes)(experienceId);
        return {
            isHelpful: false,
            helpfulCount,
        };
    }
    await (0, experience_repository_1.createHelpfulVote)(userId, experienceId);
    const helpfulCount = await (0, experience_repository_1.countHelpfulVotes)(experienceId);
    return {
        isHelpful: true,
        helpfulCount,
    };
}
