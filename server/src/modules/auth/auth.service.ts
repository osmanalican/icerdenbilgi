import { adminAuth } from "../../lib/firebase-admin";
import {
  createUser,
  findUserByFireBaseUid,
  updateUserByFirebaseUid,
} from "./auth.repository";

const SESSION_DURATION_MILLISECONDS = 1000 * 60 * 60 * 24 * 5;

type SyncUserInput = {
  firebaseUid: string;
  email: string;
  name?: string | null;
  avatarUrl?: string | null;
};

function splitFullName(name?: string | null) {
  const normalizedName = name?.trim();

  if (!normalizedName) {
    return {
      firstName: null,
      lastName: null,
    };
  }

  const [firstName, ...rest] = normalizedName.split(/\s+/);

  return {
    firstName,
    lastName: rest.length > 0 ? rest.join(" ") : null,
  };
}

export async function syncUserService(input: SyncUserInput) {
  const existingUser = await findUserByFireBaseUid(input.firebaseUid);

  const { firstName, lastName } = splitFullName(input.name);

  if (existingUser) {
    return updateUserByFirebaseUid(input.firebaseUid, {
      email: input.email,
      firstName: firstName ?? existingUser.firstName,
      lastName: lastName ?? existingUser.lastName,
      avatarUrl: input.avatarUrl ?? existingUser.avatarUrl,
    });
  }

  return createUser({
    firebaseUid: input.firebaseUid,
    email: input.email,
    firstName,
    lastName,
    avatarUrl: input.avatarUrl,
  });
}

export async function createSessionService(idToken: string) {
  const decodedToken = await adminAuth.verifyIdToken(idToken);

  const signedInAtMilliseconds = decodedToken.auth_time * 1000;
  const fiveMinutesInMilliseconds = 5 * 60 * 1000;

  if (Date.now() - signedInAtMilliseconds > fiveMinutesInMilliseconds) {
    throw new Error("RECENT_LOGIN_REQUIRED");
  }

  if (!decodedToken.email) {
    throw new Error("EMAIL_NOT_FOUND");
  }

  await syncUserService({
    firebaseUid: decodedToken.uid,
    email: decodedToken.email,
    name: decodedToken.name ?? null,
    avatarUrl: decodedToken.picture ?? null,
  });

  return adminAuth.createSessionCookie(idToken, {
    expiresIn: SESSION_DURATION_MILLISECONDS,
  });
}
export async function verifySessionService(sessionCookie: string) {
  return adminAuth.verifySessionCookie(sessionCookie, true);
}

export async function getSessionUserService(firebaseUid: string) {
  return findUserByFireBaseUid(firebaseUid);
}
