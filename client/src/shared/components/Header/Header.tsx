export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <a href="/" className="text-lg font-semibold tracking-tight text-zinc-950">
          İçerden
        </a>

        <nav className="flex items-center gap-4 text-sm">
          <a href="/giris" className="text-zinc-600 transition hover:text-zinc-950">
            Giriş yap
          </a>

          <a
            href="/kayit"
            className="rounded-full border border-zinc-300 px-4 py-2 text-zinc-900 transition hover:border-zinc-500"
          >
            Katıl
          </a>
        </nav>
      </div>
    </header>
  );
}
