"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchCompaniesController = searchCompaniesController;
exports.getCompanyBySlugController = getCompanyBySlugController;
const company_service_1 = require("./company.service");
const company_constants_1 = require("./company.constants");
async function searchCompaniesController(req, res) {
    const query = typeof req.query.q === "string" ? req.query.q : "";
    try {
        const companies = await (0, company_service_1.searchCompaniesService)(query);
        return res.status(200).json({
            companies,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Şirketler aranırken bir hata oluştu.",
        });
    }
}
async function getCompanyBySlugController(req, res) {
    const { slug } = req.params;
    if (!slug || Array.isArray(slug)) {
        return res.status(400).json({
            message: "Geçersiz şirket adresi.",
        });
    }
    const rawPage = typeof req.query.page === "string" ? req.query.page : "1";
    const parsedPage = Number(rawPage);
    const page = Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;
    try {
        const result = await (0, company_service_1.getCompanyBySlugService)(slug, {
            page,
            limit: company_constants_1.COMPANY_EXPERIENCE_PAGE_SIZE,
            currentUserId: req.user?.id,
        });
        return res.status(200).json(result);
    }
    catch (error) {
        if (error instanceof Error && error.message === "COMPANY_NOT_FOUND") {
            return res.status(404).json({
                message: "Şirket bulunamadı.",
            });
        }
        return res.status(500).json({
            message: "Şirket getirilirken bir hata oluştu.",
        });
    }
}
