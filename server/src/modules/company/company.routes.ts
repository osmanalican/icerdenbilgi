import { Router } from "express";

import { searchCompaniesController } from "./company.controller";

export const companyRouter = Router();

companyRouter.get("/search", searchCompaniesController);
