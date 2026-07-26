import type { Request } from "express";

import { adminAuth } from "../lib/firebase-admin.js";
import { findUserByFireBaseUid } from "../modules/auth/auth.repository.js";

const SESSION_COOKIE_NAME = "session";

export async function resolveSessionUser(req: Request) {
  const sessionCookie = req.cookies?.[SESSION_COOKIE_NAME];

  if (!sessionCookie) {
    return null;
  }

  try {
    const decodedToken = await adminAuth.verifySessionCookie(
      sessionCookie,
      true,
    );

    const user = await findUserByFireBaseUid(decodedToken.uid);

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      firebaseUid: user.firebaseUid,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      avatarUrl: user.avatarUrl,
      role: user.role,
    };
  } catch {
    return null;
  }
}
