import cors from "cors";
import cookieParser from "cookie-parser";
import express from "express";

import { prisma } from "./lib/prisma.js";
import { requireSession } from "./middlewares/requireSession";
import { authRouter } from "./modules/auth";
import { companyRouter } from "./modules/company";
import { experienceRouter } from "./modules/experience";

export const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use("/experiences", experienceRouter);
app.use("/auth", authRouter);
app.use("/companies", companyRouter);

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.get("/db-health", async (_req, res) => {
  const companies = await prisma.company.findMany();

  res.json({
    status: "ok",
    companiesCount: companies.length,
  });
});

app.get("/me", requireSession, (req, res) => {
  res.json({
    user: req.user,
  });
});
