import { Router } from "express";
import { verifyFirebaseToken } from "../../middlewares/verifyFirebaseToken";
import { syncUserController } from "./auth.controller";

export const authRouter = Router();

authRouter.post("/sync", verifyFirebaseToken, syncUserController);
