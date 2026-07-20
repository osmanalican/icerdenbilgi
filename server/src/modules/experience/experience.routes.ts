import { Router } from "express";

import { requireSession } from "../../middlewares/requireSession";
import {
  createExperienceController,
  getExperiencesController,
} from "./experience.controller";

export const experienceRouter = Router();

experienceRouter.get("/", getExperiencesController);

experienceRouter.post("/", requireSession, createExperienceController);
