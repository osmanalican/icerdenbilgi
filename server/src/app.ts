import cors from "cors";
import express from "express";
import { prisma } from "./lib/prisma.js";
import { verifyFirebaseToken } from "./middlewares/verifyFirebaseToken.js";
import { experienceRouter } from "./modules/experience";
import { authRouter } from "./modules/auth";

export const app = express();

app.use(cors());
app.use(express.json());
app.use("/experiences", experienceRouter);
app.use("/auth", authRouter);

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

app.get("/me", verifyFirebaseToken, (req, res) => {
  res.json({
    user: req.user,
  });
});
