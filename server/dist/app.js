"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const prisma_js_1 = require("./lib/prisma.js");
const requireSession_1 = require("./middlewares/requireSession");
const auth_1 = require("./modules/auth");
const company_1 = require("./modules/company");
const experience_1 = require("./modules/experience");
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    credentials: true,
}));
exports.app.use(express_1.default.json());
exports.app.use((0, cookie_parser_1.default)());
exports.app.use("/experiences", experience_1.experienceRouter);
exports.app.use("/auth", auth_1.authRouter);
exports.app.use("/companies", company_1.companyRouter);
exports.app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
});
exports.app.get("/db-health", async (_req, res) => {
    const companies = await prisma_js_1.prisma.company.findMany();
    res.json({
        status: "ok",
        companiesCount: companies.length,
    });
});
exports.app.get("/me", requireSession_1.requireSession, (req, res) => {
    res.json({
        user: req.user,
    });
});
