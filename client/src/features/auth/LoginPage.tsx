import { signInWithGoogle, logout } from '@/shared/firebase';

export function LoginPage() {
  return (
    <section className="mx-auto max-w-md px-6 py-16">
      <h1 className="text-3xl font-bold">Giriş yap</h1>

      <div className="mt-8 space-y-3">
        <button
          onClick={() => signInWithGoogle()}
          className="h-12 w-full rounded-xl bg-zinc-950 text-white"
        >
          Google ile devam et
        </button>

        <button onClick={() => logout()} className="h-12 w-full rounded-xl border">
          Çıkış yap
        </button>
      </div>
    </section>
  );
}
