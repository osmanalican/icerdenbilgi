import { Router } from "express";

import {
  getCompanyBySlugController,
  searchCompaniesController,
} from "./company.controller";

export const companyRouter = Router();

companyRouter.get("/search", searchCompaniesController);
companyRouter.get("/:slug", getCompanyBySlugController);
