import type { Request, Response } from "express";

import {
  getCompanyBySlugService,
  searchCompaniesService,
} from "./company.service";

type CompanyParams = {
  slug: string;
};

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

export async function getCompanyBySlugController(
  req: Request<CompanyParams>,
  res: Response,
) {
  const { slug } = req.params;

  if (!slug || Array.isArray(slug)) {
    return res.status(400).json({
      message: "Geçersiz şirket adresi.",
    });
  }

  try {
    const company = await getCompanyBySlugService(slug);

    return res.status(200).json({
      company,
    });
  } catch (error) {
    if (error instanceof Error && error.message === "COMPANY_NOT_FOUND") {
      return res.status(404).json({
        message: "Şirket bulunamadı.",
      });
    }

    return res.status(500).json({
      message: "Şirket getirilirken bir hata oluştu.",
    });
  }
}
