"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSessionController = createSessionController;
exports.verifySessionController = verifySessionController;
exports.logoutController = logoutController;
const auth_service_1 = require("./auth.service");
const SESSION_COOKIE_NAME = "session";
const SESSION_DURATION_MILLISECONDS = 1000 * 60 * 60 * 24 * 5;
async function createSessionController(req, res) {
    const idToken = req.body?.idToken;
    if (typeof idToken !== "string" || !idToken.trim()) {
        return res.status(400).json({
            message: "Firebase ID token zorunludur.",
        });
    }
    try {
        const sessionCookie = await (0, auth_service_1.createSessionService)(idToken);
        res.cookie(SESSION_COOKIE_NAME, sessionCookie, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: SESSION_DURATION_MILLISECONDS,
        });
        return res.status(200).json({
            success: true,
        });
    }
    catch (error) {
        if (error instanceof Error && error.message === "RECENT_LOGIN_REQUIRED") {
            return res.status(401).json({
                message: "Oturum oluşturmak için tekrar giriş yapmalısın.",
            });
        }
        if (error instanceof Error && error.message === "EMAIL_NOT_FOUND") {
            return res.status(400).json({
                message: "Firebase hesabında email bilgisi bulunamadı.",
            });
        }
        console.error("Session creation failed:", error);
        return res.status(401).json({
            message: "Oturum oluşturulamadı.",
        });
    }
}
async function verifySessionController(req, res) {
    const sessionCookie = req.cookies?.[SESSION_COOKIE_NAME];
    if (!sessionCookie) {
        return res.status(401).json({
            authenticated: false,
        });
    }
    try {
        const decodedToken = await (0, auth_service_1.verifySessionService)(sessionCookie);
        const user = await (0, auth_service_1.getSessionUserService)(decodedToken.uid);
        if (!user) {
            res.clearCookie(SESSION_COOKIE_NAME, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                path: "/",
            });
            return res.status(401).json({
                authenticated: false,
            });
        }
        return res.status(200).json({
            authenticated: true,
            user: {
                id: user.id,
                firebaseUid: user.firebaseUid,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                avatarUrl: user.avatarUrl,
                role: user.role,
            },
        });
    }
    catch {
        res.clearCookie(SESSION_COOKIE_NAME, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
        });
        return res.status(401).json({
            authenticated: false,
        });
    }
}
function logoutController(_req, res) {
    res.clearCookie(SESSION_COOKIE_NAME, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
    });
    return res.status(200).json({
        success: true,
    });
}
