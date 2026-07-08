import type { NextFunction, Request, Response } from "express";

import { adminAuth } from "../lib/firebase-admin.js";

export async function verifyFirebaseToken(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader?.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Yetkisiz işlem.",
    });
  }

  const token = authorizationHeader.split(" ")[1];

  try {
    const decodedToken = await adminAuth.verifyIdToken(token);

    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email ?? null,
      name: decodedToken.name ?? null,
      picture: decodedToken.picture ?? null,
    };

    next();
  } catch {
    return res.status(401).json({
      message: "Geçersiz veya süresi dolmuş oturum.",
    });
  }
}
