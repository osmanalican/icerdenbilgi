import { Router } from "express";

import { optionalSession } from "../../middlewares/optionalSession";

import {
  getCompaniesForSitemapController,
  getCompanyBySlugController,
  searchCompaniesController,
} from "./company.controller";

export const companyRouter = Router();

companyRouter.get("/search", searchCompaniesController);

companyRouter.get("/sitemap", getCompaniesForSitemapController);

companyRouter.get("/:slug", optionalSession, getCompanyBySlugController);
