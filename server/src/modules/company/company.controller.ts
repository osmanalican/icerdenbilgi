import type { Request, Response } from "express";
import { searchCompaniesService } from "./company.service";

export async function searchCompaniesController(req: Request, res: Response) {
  const query = typeof req.query.q === "string" ? req.query.q : "";

  try {
    const companies = await searchCompaniesService(query);

    return res.status(200).json({
      companies,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Şirketler aranırken bir hata oluştu.",
    });
  }
}
