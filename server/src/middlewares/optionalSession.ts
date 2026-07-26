import type { NextFunction, Request, Response } from "express";

import { resolveSessionUser } from "./resolveSessionUser.js";

export async function optionalSession(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  const user = await resolveSessionUser(req);

  if (user) {
    req.user = user;
  }

  next();
}
