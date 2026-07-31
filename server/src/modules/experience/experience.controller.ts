import type { Request, Response } from "express";

import {
  createExperienceService,
  getExperiencesService,
  toggleHelpfulVoteService,
  updateExperienceService,
} from "./experience.service";

import {
  createExperienceSchema,
  updateExperienceSchema,
} from "./experience.schema";

type ExperienceParams = {
  experienceId: string;
};

export async function createExperienceController(req: Request, res: Response) {
  if (!req.user) {
    return res.status(401).json({
      message: "Yetkisiz işlem.",
    });
  }

  const validationResult = createExperienceSchema.safeParse(req.body);

  if (!validationResult.success) {
    const fieldErrors = validationResult.error.flatten().fieldErrors;

    return res.status(400).json({
      message: "Lütfen form alanlarını kontrol et.",
      errors: fieldErrors,
    });
  }

  try {
    const result = await createExperienceService({
      userId: req.user.id,
      ...validationResult.data,
    });

    return res.status(201).json(result);
  } catch (error) {
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
      currentUserId: req.user?.id,
    });

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Deneyimler getirilirken bir hata oluştu.",
    });
  }
}

export async function updateExperienceController(
  req: Request<ExperienceParams>,
  res: Response,
) {
  if (!req.user) {
    return res.status(401).json({
      message: "Yetkisiz işlem.",
    });
  }

  const { experienceId } = req.params;

  if (!experienceId) {
    return res.status(400).json({
      message: "Geçersiz deneyim.",
    });
  }

  const validationResult = updateExperienceSchema.safeParse(req.body);

  if (!validationResult.success) {
    const fieldErrors = validationResult.error.flatten().fieldErrors;

    return res.status(400).json({
      message: "Lütfen form alanlarını kontrol et.",
      errors: fieldErrors,
    });
  }

  try {
    const result = await updateExperienceService({
      experienceId,
      userId: req.user.id,
      ...validationResult.data,
    });

    return res.status(200).json(result);
  } catch (error) {
    if (error instanceof Error && error.message === "EXPERIENCE_NOT_FOUND") {
      return res.status(404).json({
        message: "Deneyim bulunamadı.",
      });
    }

    if (error instanceof Error && error.message === "FORBIDDEN") {
      return res.status(403).json({
        message: "Bu deneyimi düzenleme yetkin bulunmuyor.",
      });
    }

    console.error(error);

    return res.status(500).json({
      message: "Deneyim güncellenirken bir hata oluştu.",
    });
  }
}

export async function toggleHelpfulVoteController(
  req: Request<ExperienceParams>,
  res: Response,
) {
  if (!req.user) {
    return res.status(401).json({
      message: "Bu işlem için giriş yapmalısın.",
    });
  }

  const { experienceId } = req.params;

  if (!experienceId) {
    return res.status(400).json({
      message: "Geçersiz deneyim.",
    });
  }

  try {
    const result = await toggleHelpfulVoteService(req.user.id, experienceId);

    return res.status(200).json(result);
  } catch (error) {
    if (error instanceof Error && error.message === "EXPERIENCE_NOT_FOUND") {
      return res.status(404).json({
        message: "Deneyim bulunamadı.",
      });
    }

    console.error(error);

    return res.status(500).json({
      message: "Faydalı oyu güncellenirken bir hata oluştu.",
    });
  }
}
