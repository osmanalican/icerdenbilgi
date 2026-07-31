import { z } from "zod";

const experienceTypes = ["INTERVIEW", "WORK", "INTERNSHIP", "OTHER"] as const;

const experiencePayloadSchema = z.object({
  companyName: z
    .string({
      error: "Şirket adı zorunludur.",
    })
    .trim()
    .min(2, "Şirket adı en az 2 karakter olmalı.")
    .max(100, "Şirket adı en fazla 100 karakter olabilir."),

  position: z
    .string({
      error: "Pozisyon zorunludur.",
    })
    .trim()
    .min(2, "Pozisyon en az 2 karakter olmalı.")
    .max(100, "Pozisyon en fazla 100 karakter olabilir."),

  type: z.enum(experienceTypes, {
    error: "Geçerli bir deneyim türü seçmelisin.",
  }),

  title: z
    .string({
      error: "Başlık zorunludur.",
    })
    .trim()
    .min(5, "Başlık en az 5 karakter olmalı.")
    .max(120, "Başlık en fazla 120 karakter olabilir."),

  content: z
    .string({
      error: "Deneyim alanı zorunludur.",
    })
    .trim()
    .min(20, "Deneyim en az 20 karakter olmalı.")
    .max(5000, "Deneyim en fazla 5000 karakter olabilir."),

  isAnonymous: z.boolean({
    error: "Anonim paylaşım bilgisi geçersiz.",
  }),
});

export const createExperienceSchema = experiencePayloadSchema;

export const updateExperienceSchema = experiencePayloadSchema;

export type CreateExperienceInput = z.infer<typeof createExperienceSchema>;

export type UpdateExperienceInput = z.infer<typeof updateExperienceSchema>;
