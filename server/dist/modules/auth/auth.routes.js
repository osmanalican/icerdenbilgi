"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
exports.authRouter = (0, express_1.Router)();
exports.authRouter.post("/session", auth_controller_1.createSessionController);
exports.authRouter.get("/session", auth_controller_1.verifySessionController);
exports.authRouter.delete("/session", auth_controller_1.logoutController);
