import { Router } from "express";
import { verifyFirebaseToken } from "../../middlewares/verifyFirebaseToken";
import { createExperienceController } from "./experience.controller";

export const experienceRouter = Router();

experienceRouter.post("/", verifyFirebaseToken, createExperienceController);
