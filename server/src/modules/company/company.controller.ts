import type { Request, Response } from "express";

import {
  getCompanyBySlugService,
  searchCompaniesService,
} from "./company.service";
import { COMPANY_EXPERIENCE_PAGE_SIZE } from "./company.constants";

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

  const rawPage = typeof req.query.page === "string" ? req.query.page : "1";
  const parsedPage = Number(rawPage);

  const page = Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;

  try {
    const result = await getCompanyBySlugService(slug, {
      page,
      limit: COMPANY_EXPERIENCE_PAGE_SIZE,
    });

    return res.status(200).json(result);
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
