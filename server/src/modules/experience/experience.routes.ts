import { Router } from "express";

import { verifyFirebaseToken } from "../../middlewares/verifyFirebaseToken";
import {
  createExperienceController,
  getExperiencesController,
} from "./experience.controller";

export const experienceRouter = Router();

experienceRouter.get("/", getExperiencesController);

experienceRouter.post("/", verifyFirebaseToken, createExperienceController);
