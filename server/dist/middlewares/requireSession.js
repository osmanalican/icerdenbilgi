"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireSession = requireSession;
const resolveSessionUser_js_1 = require("./resolveSessionUser.js");
async function requireSession(req, res, next) {
    const user = await (0, resolveSessionUser_js_1.resolveSessionUser)(req);
    if (!user) {
        return res.status(401).json({
            message: "Geçerli bir oturum bulunamadı.",
        });
    }
    req.user = user;
    next();
}
