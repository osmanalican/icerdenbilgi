"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveSessionUser = resolveSessionUser;
const firebase_admin_js_1 = require("../lib/firebase-admin.js");
const auth_repository_js_1 = require("../modules/auth/auth.repository.js");
const SESSION_COOKIE_NAME = "session";
async function resolveSessionUser(req) {
    const sessionCookie = req.cookies?.[SESSION_COOKIE_NAME];
    if (!sessionCookie) {
        return null;
    }
    try {
        const decodedToken = await firebase_admin_js_1.adminAuth.verifySessionCookie(sessionCookie, true);
        const user = await (0, auth_repository_js_1.findUserByFireBaseUid)(decodedToken.uid);
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
    }
    catch {
        return null;
    }
}
