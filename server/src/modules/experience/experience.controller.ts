import type { Request, Response } from "express";
import {
  createExperienceService,
  getExperiencesService,
} from "./experience.service";

export async function createExperienceController(req: Request, res: Response) {
  if (!req.user) {
    return res.status(401).json({
      message: "Yetkisiz işlem.",
    });
  }

  try {
    const experience = await createExperienceService({
      firebaseUid: req.user.uid,
      companyName: req.body.companyName,
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

    console.error(error);

    return res.status(500).json({
      message: "Deneyim oluşturulurken bir hata oluştu.",
    });
  }
}

export async function getExperiencesController(req: Request, res: Response) {
  const rawPage = Number(req.query.page);
  const rawLimit = Number(req.query.limit);

  const page = Number.isInteger(rawPage) && rawPage > 0 ? rawPage : 1;

  const limit =
    Number.isInteger(rawLimit) && rawLimit > 0 ? Math.min(rawLimit, 20) : 4;

  try {
    const result = await getExperiencesService({
      page,
      limit,
    });

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Deneyimler getirilirken bir hata oluştu.",
    });
  }
}
