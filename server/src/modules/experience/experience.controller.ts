import type { Request, Response } from "express";
import { createExperienceService } from "./experience.service";

export async function createExperienceController(req: Request, res: Response) {
  if (!req.user) {
    return res.status(401).json({
      message: "Yetkisiz işlem.",
    });
  }

  try {
    const experience = await createExperienceService({
      firebaseUid: req.user.uid,
      companySlug: req.body.companySlug,
      title: req.body.title,
      content: req.body.content,
      position: req.body.position,
      type: req.body.type,
      isAnonymous: req.body.isAnonymous,
    });

    return res.status(201).json({
      experience,
    });
  } catch (error) {
    if (error instanceof Error && error.message === "USER_NOT_FOUND") {
      return res.status(404).json({
        message: "Kullanıcı bulunamadı.",
      });
    }

    if (error instanceof Error && error.message === "COMPANY_NOT_FOUND") {
      return res.status(404).json({
        message: "Şirket bulunamadı.",
      });
    }

    return res.status(500).json({
      message: "Deneyim oluşturulurken bir hata oluştu.",
    });
  }
}
