import { Router } from "express";

import {
  createSessionController,
  deleteAccountController,
  logoutController,
  verifySessionController,
} from "./auth.controller";
import { requireSession } from "../../middlewares/requireSession";

export const authRouter = Router();

authRouter.post("/session", createSessionController);

authRouter.get("/session", verifySessionController);

authRouter.delete("/session", logoutController);

authRouter.delete("/account", requireSession, deleteAccountController);
