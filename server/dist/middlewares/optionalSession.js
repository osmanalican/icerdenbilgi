"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.optionalSession = optionalSession;
const resolveSessionUser_js_1 = require("./resolveSessionUser.js");
async function optionalSession(req, _res, next) {
    const user = await (0, resolveSessionUser_js_1.resolveSessionUser)(req);
    if (user) {
        req.user = user;
    }
    next();
}
