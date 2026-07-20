"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useAuth } from "@/shared/hooks";
import { createSession } from "@/shared/auth";
import { registerWithEmail } from "@/shared/firebase";
import type { RegisterFormValues } from "@/shared/types";
import { getAuthErrorMessage } from "@/shared/utils";

type RegisterFormProps = {
  redirectTo: string;
};

export function RegisterForm({ redirectTo }: RegisterFormProps) {
  const router = useRouter();
  const { refreshSession } = useAuth();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: RegisterFormValues) {
    try {
      const credentials = await registerWithEmail(
        values.firstName,
        values.lastName,
        values.email,
        values.password,
      );

      const idToken = await credentials.user.getIdToken(true);

      await createSession(idToken);
      await refreshSession();

      router.replace(redirectTo);
      router.refresh();
    } catch (error) {
      setError("root", {
        message: getAuthErrorMessage(error),
      });
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <input
          type="text"
          placeholder="Ad"
          autoComplete="given-name"
          aria-invalid={Boolean(errors.firstName)}
          {...register("firstName", {
            required: "Ad zorunlu.",
          })}
          className="h-12 w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 outline-none transition focus:border-zinc-400 focus:bg-white"
        />

        {errors.firstName?.message && (
          <p className="mt-2 text-sm text-red-600">
            {errors.firstName.message}
          </p>
        )}
      </div>

      <div>
        <input
          type="text"
          placeholder="Soyad"
          autoComplete="family-name"
          aria-invalid={Boolean(errors.lastName)}
          {...register("lastName", {
            required: "Soyad zorunlu.",
          })}
          className="h-12 w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 outline-none transition focus:border-zinc-400 focus:bg-white"
        />

        {errors.lastName?.message && (
          <p className="mt-2 text-sm text-red-600">{errors.lastName.message}</p>
        )}
      </div>

      <div>
        <input
          type="email"
          placeholder="Email"
          autoComplete="email"
          aria-invalid={Boolean(errors.email)}
          {...register("email", {
            required: "Email zorunlu.",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Geçerli bir email gir.",
            },
          })}
          className="h-12 w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 outline-none transition focus:border-zinc-400 focus:bg-white"
        />

        {errors.email?.message && (
          <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <input
          type="password"
          placeholder="Şifre"
          autoComplete="new-password"
          aria-invalid={Boolean(errors.password)}
          {...register("password", {
            required: "Şifre zorunlu.",
            minLength: {
              value: 6,
              message: "Şifre en az 6 karakter olmalı.",
            },
          })}
          className="h-12 w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 outline-none transition focus:border-zinc-400 focus:bg-white"
        />

        {errors.password?.message && (
          <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>

      {errors.root?.message && (
        <p
          role="alert"
          className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600"
        >
          {errors.root.message}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="h-12 w-full rounded-2xl bg-zinc-950 font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Hesap oluşturuluyor..." : "Hesap oluştur"}
      </button>
    </form>
  );
}
