import type { RegisterFormValues } from '@/features/auth/types';
import { getAuthErrorMessage } from '@/features/auth/utils/getAuthErrorMessage';
import { registerWithEmail } from '@/shared/firebase';
import { useForm } from 'react-hook-form';

export function RegisterForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: RegisterFormValues) {
    try {
      await registerWithEmail(values.firstName, values.lastName, values.email, values.password);
    } catch (error) {
      setError('root', {
        message: getAuthErrorMessage(error),
      });
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input
        type="text"
        placeholder="Ad"
        {...register('firstName')}
        className="h-12 w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 outline-none transition focus:border-zinc-400 focus:bg-white"
      />

      <input
        type="text"
        placeholder="Soyad"
        {...register('lastName')}
        className="h-12 w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 outline-none transition focus:border-zinc-400 focus:bg-white"
      />

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

      {errors.root?.message && (
        <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">
          {errors.root.message}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="h-12 w-full rounded-2xl bg-zinc-950 font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? 'Hesap oluşturuluyor...' : 'Hesap oluştur'}
      </button>
    </form>
  );
}
