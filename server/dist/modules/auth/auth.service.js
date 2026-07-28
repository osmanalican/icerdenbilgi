"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncUserService = syncUserService;
exports.createSessionService = createSessionService;
exports.verifySessionService = verifySessionService;
exports.getSessionUserService = getSessionUserService;
const firebase_admin_1 = require("../../lib/firebase-admin");
const auth_repository_1 = require("./auth.repository");
const SESSION_DURATION_MILLISECONDS = 1000 * 60 * 60 * 24 * 5;
function splitFullName(name) {
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
async function syncUserService(input) {
    const existingUser = await (0, auth_repository_1.findUserByFireBaseUid)(input.firebaseUid);
    const { firstName, lastName } = splitFullName(input.name);
    if (existingUser) {
        return (0, auth_repository_1.updateUserByFirebaseUid)(input.firebaseUid, {
            email: input.email,
            firstName: firstName ?? existingUser.firstName,
            lastName: lastName ?? existingUser.lastName,
            avatarUrl: input.avatarUrl ?? existingUser.avatarUrl,
        });
    }
    return (0, auth_repository_1.createUser)({
        firebaseUid: input.firebaseUid,
        email: input.email,
        firstName,
        lastName,
        avatarUrl: input.avatarUrl,
    });
}
async function createSessionService(idToken) {
    const decodedToken = await firebase_admin_1.adminAuth.verifyIdToken(idToken);
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
    return firebase_admin_1.adminAuth.createSessionCookie(idToken, {
        expiresIn: SESSION_DURATION_MILLISECONDS,
    });
}
async function verifySessionService(sessionCookie) {
    return firebase_admin_1.adminAuth.verifySessionCookie(sessionCookie, true);
}
async function getSessionUserService(firebaseUid) {
    return (0, auth_repository_1.findUserByFireBaseUid)(firebaseUid);
}
