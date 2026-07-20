import { Router } from "express";

import {
  createSessionController,
  logoutController,
  verifySessionController,
} from "./auth.controller";

export const authRouter = Router();

authRouter.post("/session", createSessionController);

authRouter.get("/session", verifySessionController);

authRouter.delete("/session", logoutController);
