"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { createSession } from "@/shared/auth";
import { signInWithEmail } from "@/shared/firebase/auth";
import { getAuthErrorMessage } from "@/shared/utils";
import { useAuth } from "@/shared/hooks";

type LoginFormValues = {
  email: string;
  password: string;
};

type LoginFormProps = {
  redirectTo: string;
};

export function LoginForm({ redirectTo }: LoginFormProps) {
  const router = useRouter();
  const { refreshSession } = useAuth();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginFormValues) {
    try {
      const credentials = await signInWithEmail(values.email, values.password);

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
          type="email"
          autoComplete="email"
          placeholder="Email"
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
          autoComplete="current-password"
          placeholder="Şifre"
          aria-invalid={Boolean(errors.password)}
          {...register("password", {
            required: "Şifre zorunlu.",
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
        {isSubmitting ? "Giriş yapılıyor..." : "Giriş yap"}
      </button>
    </form>
  );
}
