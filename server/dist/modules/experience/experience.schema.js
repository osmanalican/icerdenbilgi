"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createExperienceSchema = void 0;
const zod_1 = require("zod");
const experienceTypes = ["INTERVIEW", "WORK", "INTERNSHIP", "OTHER"];
exports.createExperienceSchema = zod_1.z.object({
    companyName: zod_1.z
        .string({
        error: "Şirket adı zorunludur.",
    })
        .trim()
        .min(2, "Şirket adı en az 2 karakter olmalı.")
        .max(100, "Şirket adı en fazla 100 karakter olabilir."),
    position: zod_1.z
        .string({
        error: "Pozisyon zorunludur.",
    })
        .trim()
        .min(2, "Pozisyon en az 2 karakter olmalı.")
        .max(100, "Pozisyon en fazla 100 karakter olabilir."),
    type: zod_1.z.enum(experienceTypes, {
        error: "Geçerli bir deneyim türü seçmelisin.",
    }),
    title: zod_1.z
        .string({
        error: "Başlık zorunludur.",
    })
        .trim()
        .min(5, "Başlık en az 5 karakter olmalı.")
        .max(120, "Başlık en fazla 120 karakter olabilir."),
    content: zod_1.z
        .string({
        error: "Deneyim alanı zorunludur.",
    })
        .trim()
        .min(20, "Deneyim en az 20 karakter olmalı.")
        .max(5000, "Deneyim en fazla 5000 karakter olabilir."),
    isAnonymous: zod_1.z.boolean({
        error: "Anonim paylaşım bilgisi geçersiz.",
    }),
});
