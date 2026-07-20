import type { NextFunction, Request, Response } from "express";

import { adminAuth } from "../lib/firebase-admin.js";
import { findUserByFireBaseUid } from "../modules/auth/auth.repository.js";

const SESSION_COOKIE_NAME = "session";

export async function requireSession(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const sessionCookie = req.cookies[SESSION_COOKIE_NAME];

  if (!sessionCookie) {
    return res.status(401).json({
      message: "Oturum bulunamadı.",
    });
  }

  try {
    const decodedToken = await adminAuth.verifySessionCookie(
      sessionCookie,
      true,
    );

    const user = await findUserByFireBaseUid(decodedToken.uid);

    if (!user) {
      res.clearCookie(SESSION_COOKIE_NAME, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      });

      return res.status(401).json({
        message: "Kullanıcı bulunamadı.",
      });
    }

    req.user = {
      id: user.id,
      firebaseUid: user.firebaseUid,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      avatarUrl: user.avatarUrl,
      role: user.role,
    };

    next();
  } catch {
    return res.status(401).json({
      message: "Geçersiz veya süresi dolmuş oturum.",
    });
  }
}
