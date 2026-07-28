"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.companyRouter = void 0;
const express_1 = require("express");
const optionalSession_1 = require("../../middlewares/optionalSession");
const company_controller_1 = require("./company.controller");
exports.companyRouter = (0, express_1.Router)();
exports.companyRouter.get("/search", company_controller_1.searchCompaniesController);
exports.companyRouter.get("/:slug", optionalSession_1.optionalSession, company_controller_1.getCompanyBySlugController);
