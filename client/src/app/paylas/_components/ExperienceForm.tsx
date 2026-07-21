"use client";

import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import { Spinner } from "@/shared/components";
import { useAuth } from "@/shared/hooks";
import { createExperience } from "@/app/paylas/_api";

type ExperienceFormProps = {
  fixedCompanyName?: string;
};

const experienceTypeMap = {
  interview: "INTERVIEW",
  work: "WORK",
  internship: "INTERNSHIP",
  other: "OTHER",
} as const;

type ExperienceFormType = keyof typeof experienceTypeMap;

type ExperienceFormValues = {
  companyName: string;
  position: string;
  type: ExperienceFormType;
  title: string;
  content: string;
  isAnonymous: boolean;
};

const inputClassName =
  "mt-2 h-12 w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-zinc-400 focus:bg-white";

const textareaClassName =
  "mt-2 w-full resize-y rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-zinc-400 focus:bg-white";

const disabledInputClassName =
  "mt-2 h-12 w-full cursor-not-allowed rounded-2xl border border-zinc-200 bg-zinc-100 px-4 text-zinc-500 outline-none";

const errorClassName = "mt-2 text-sm text-red-600";

export function ExperienceForm({ fixedCompanyName }: ExperienceFormProps) {
  const { user } = useAuth();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<ExperienceFormValues>({
    defaultValues: {
      companyName: fixedCompanyName ?? "",
      position: "",
      type: "other",
      title: "",
      content: "",
      isAnonymous: true,
    },
  });

  useEffect(() => {
    setValue("companyName", fixedCompanyName ?? "");
  }, [fixedCompanyName, setValue]);

  const createExperienceMutation = useMutation({
    mutationFn: async (values: ExperienceFormValues) => {
      if (!user) {
        throw new Error("Deneyim paylaşmak için giriş yapmalısın.");
      }

      return createExperience({
        companyName: values.companyName.trim(),
        position: values.position.trim(),
        type: experienceTypeMap[values.type],
        title: values.title.trim(),
        content: values.content.trim(),
        isAnonymous: values.isAnonymous,
      });
    },
  });

  async function onSubmit(values: ExperienceFormValues) {
    clearErrors("root");
    setSuccessMessage(null);

    try {
      await createExperienceMutation.mutateAsync(values);

      reset({
        companyName: fixedCompanyName ?? "",
        position: "",
        type: "other",
        title: "",
        content: "",
        isAnonymous: true,
      });

      setSuccessMessage("Deneyimin başarıyla paylaşıldı.");
    } catch (error) {
      setError("root", {
        type: "server",
        message:
          error instanceof Error
            ? error.message
            : "Deneyim paylaşılırken beklenmeyen bir hata oluştu.",
      });
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8"
      noValidate
    >
      <div>
        <label
          htmlFor="companyName"
          className="text-sm font-medium text-zinc-800"
        >
          Şirket adı
        </label>

        {fixedCompanyName ? (
          <input
            id="companyName"
            {...register("companyName")}
            readOnly
            className={disabledInputClassName}
          />
        ) : (
          <>
            <input
              id="companyName"
              {...register("companyName", {
                required: "Şirket adı zorunludur.",
                minLength: {
                  value: 2,
                  message: "Şirket adı en az 2 karakter olmalı.",
                },
              })}
              placeholder="Örn. Trendyol"
              className={inputClassName}
              aria-invalid={Boolean(errors.companyName)}
            />

            {errors.companyName?.message && (
              <p className={errorClassName}>{errors.companyName.message}</p>
            )}
          </>
        )}
      </div>

      <div>
        <label htmlFor="position" className="text-sm font-medium text-zinc-800">
          Pozisyon
        </label>

        <input
          id="position"
          {...register("position", {
            required: "Pozisyon zorunludur.",
            minLength: {
              value: 2,
              message: "Pozisyon en az 2 karakter olmalı.",
            },
          })}
          placeholder="Örn. Satış uzmanı, frontend developer, mimar..."
          className={inputClassName}
          aria-invalid={Boolean(errors.position)}
        />

        {errors.position?.message && (
          <p className={errorClassName}>{errors.position.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="type" className="text-sm font-medium text-zinc-800">
          Deneyim türü
        </label>

        <div className="relative mt-2">
          <select
            id="type"
            {...register("type", {
              required: "Deneyim türü zorunludur.",
            })}
            className="h-12 w-full cursor-pointer appearance-none rounded-2xl border border-zinc-200 bg-zinc-50 px-4 pr-12 text-zinc-950 outline-none transition focus:border-zinc-400 focus:bg-white"
          >
            <option value="interview">Mülakat</option>
            <option value="work">Çalışma deneyimi</option>
            <option value="internship">Staj</option>
            <option value="other">Diğer</option>
          </select>

          <span className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-zinc-400">
            ↓
          </span>
        </div>

        {errors.type?.message && (
          <p className={errorClassName}>{errors.type.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="title" className="text-sm font-medium text-zinc-800">
          Başlık
        </label>

        <input
          id="title"
          {...register("title", {
            required: "Başlık zorunludur.",
            minLength: {
              value: 5,
              message: "Başlık en az 5 karakter olmalı.",
            },
            maxLength: {
              value: 120,
              message: "Başlık en fazla 120 karakter olabilir.",
            },
          })}
          placeholder="Deneyimini özetleyen kısa bir başlık"
          className={inputClassName}
          aria-invalid={Boolean(errors.title)}
        />

        {errors.title?.message && (
          <p className={errorClassName}>{errors.title.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="content" className="text-sm font-medium text-zinc-800">
          Deneyimin
        </label>

        <textarea
          id="content"
          {...register("content", {
            required: "Deneyim alanı zorunludur.",
            minLength: {
              value: 20,
              message: "Deneyim en az 20 karakter olmalı.",
            },
            maxLength: {
              value: 5000,
              message: "Deneyim en fazla 5000 karakter olabilir.",
            },
          })}
          rows={7}
          placeholder="Süreç nasıldı, neler soruldu, çalışma ortamı nasıldı?"
          className={textareaClassName}
          aria-invalid={Boolean(errors.content)}
        />

        {errors.content?.message && (
          <p className={errorClassName}>{errors.content.message}</p>
        )}
      </div>

      <label className="flex cursor-pointer items-center gap-3 text-sm text-zinc-700">
        <input
          type="checkbox"
          {...register("isAnonymous")}
          className="h-4 w-4 cursor-pointer accent-zinc-950"
        />

        <span>Anonim paylaş</span>
      </label>

      {errors.root?.message && (
        <p
          role="alert"
          className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {errors.root.message}
        </p>
      )}

      {successMessage && (
        <p
          role="status"
          className="rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-emerald-700"
        >
          {successMessage}
        </p>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={createExperienceMutation.isPending}
          className="inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-2xl bg-zinc-950 px-6 font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {createExperienceMutation.isPending && (
            <Spinner size="md" className="text-white" />
          )}

          {createExperienceMutation.isPending ? "Paylaşılıyor..." : "Yayınla"}
        </button>
      </div>
    </form>
  );
}
