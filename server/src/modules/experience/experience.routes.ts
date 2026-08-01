import { Router } from "express";

import { optionalSession } from "../../middlewares/optionalSession";
import { requireSession } from "../../middlewares/requireSession";

import {
  createExperienceController,
  getExperienceForEditController,
  getExperiencesController,
  toggleHelpfulVoteController,
  updateExperienceController,
} from "./experience.controller";

export const experienceRouter = Router();

experienceRouter.get("/", optionalSession, getExperiencesController);

experienceRouter.get(
  "/:experienceId/edit",
  requireSession,
  getExperienceForEditController,
);

experienceRouter.post("/", requireSession, createExperienceController);

experienceRouter.put(
  "/:experienceId",
  requireSession,
  updateExperienceController,
);

experienceRouter.post(
  "/:experienceId/helpful",
  requireSession,
  toggleHelpfulVoteController,
);
