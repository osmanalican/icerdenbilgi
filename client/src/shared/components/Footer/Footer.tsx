import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-4 px-4 py-6 text-sm text-zinc-500 sm:flex-row sm:justify-between sm:px-6">
        <span className="font-medium text-zinc-700">İçerden</span>

        <nav
          aria-label="Alt menü"
          className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2"
        >
          <Link href="/gizlilik" className="transition hover:text-zinc-900">
            Gizlilik
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
