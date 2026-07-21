import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 py-5 text-sm text-zinc-500 sm:flex-row">
        <span>İçerden</span>

        <nav aria-label="Alt menü" className="flex items-center gap-5">
          <Link href="/gizlilik" className="transition hover:text-zinc-900">
            Gizlilik
          </Link>

          <Link href="/iletisim" className="transition hover:text-zinc-900">
            İletişim
          </Link>

          <a
            href="https://github.com/osmanalican/icerdenbilgi"
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-zinc-900"
          >
            GitHub
          </a>
        </nav>
      </div>
    </footer>
  );
}
