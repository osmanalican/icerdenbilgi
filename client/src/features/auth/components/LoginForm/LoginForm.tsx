import type { LoginFormValues } from '@/features/auth/types';
import { signInWithEmail } from '@/shared/firebase/auth';
import { useForm } from 'react-hook-form';

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: LoginFormValues) {
    await signInWithEmail(values.email, values.password);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input
        type="email"
        placeholder="Email"
        {...register('email')}
        className="h-12 w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 outline-none transition focus:border-zinc-400 focus:bg-white"
      />

      <input
        type="password"
        placeholder="Şifre"
        {...register('password')}
        className="h-12 w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 outline-none transition focus:border-zinc-400 focus:bg-white"
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="h-12 w-full rounded-2xl bg-zinc-950 font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? 'Giriş yapılıyor...' : 'Giriş yap'}
      </button>
    </form>
  );
}
