"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createExperienceController = createExperienceController;
exports.getExperiencesController = getExperiencesController;
exports.toggleHelpfulVoteController = toggleHelpfulVoteController;
const experience_service_1 = require("./experience.service");
const experience_schema_1 = require("./experience.schema");
async function createExperienceController(req, res) {
    if (!req.user) {
        return res.status(401).json({
            message: "Yetkisiz işlem.",
        });
    }
    const validationResult = experience_schema_1.createExperienceSchema.safeParse(req.body);
    if (!validationResult.success) {
        const fieldErrors = validationResult.error.flatten().fieldErrors;
        return res.status(400).json({
            message: "Lütfen form alanlarını kontrol et.",
            errors: fieldErrors,
        });
    }
    try {
        const result = await (0, experience_service_1.createExperienceService)({
            userId: req.user.id,
            ...validationResult.data,
        });
        return res.status(201).json(result);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Deneyim oluşturulurken bir hata oluştu.",
        });
    }
}
async function getExperiencesController(req, res) {
    const rawPage = Number(req.query.page);
    const rawLimit = Number(req.query.limit);
    const page = Number.isInteger(rawPage) && rawPage > 0 ? rawPage : 1;
    const limit = Number.isInteger(rawLimit) && rawLimit > 0 ? Math.min(rawLimit, 20) : 4;
    try {
        const result = await (0, experience_service_1.getExperiencesService)({
            page,
            limit,
            currentUserId: req.user?.id,
        });
        return res.status(200).json(result);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Deneyimler getirilirken bir hata oluştu.",
        });
    }
}
async function toggleHelpfulVoteController(req, res) {
    if (!req.user) {
        return res.status(401).json({
            message: "Bu işlem için giriş yapmalısın.",
        });
    }
    const experienceId = req.params.experienceId;
    if (typeof experienceId !== "string" || !experienceId) {
        return res.status(400).json({
            message: "Geçersiz deneyim.",
        });
    }
    try {
        const result = await (0, experience_service_1.toggleHelpfulVoteService)(req.user.id, experienceId);
        return res.status(200).json(result);
    }
    catch (error) {
        if (error instanceof Error && error.message === "EXPERIENCE_NOT_FOUND") {
            return res.status(404).json({
                message: "Deneyim bulunamadı.",
            });
        }
        console.error(error);
        return res.status(500).json({
            message: "Faydalı oyu güncellenirken bir hata oluştu.",
        });
    }
}
