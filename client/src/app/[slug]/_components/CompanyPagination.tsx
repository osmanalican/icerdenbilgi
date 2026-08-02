import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

type CompanyPaginationProps = {
  slug: string;
  currentPage: number;
  totalPages: number;
};

export function CompanyPagination({
  slug,
  currentPage,
  totalPages,
}: CompanyPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const createPageHref = (page: number) =>
    page === 1 ? `/${slug}` : `/${slug}?page=${page}`;

  const visiblePages = Array.from(
    { length: totalPages },
    (_, index) => index + 1,
  );

  return (
    <nav
      aria-label="Deneyim sayfaları"
      className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:mt-10"
    >
      {currentPage > 1 ? (
        <Link
          href={createPageHref(currentPage - 1)}
          className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-3 text-sm font-medium text-zinc-600 shadow-sm transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700 sm:px-4"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />

          <span className="hidden sm:inline">Önceki</span>
        </Link>
      ) : (
        <span className="inline-flex h-10 cursor-not-allowed items-center justify-center gap-1.5 rounded-xl border border-zinc-200/70 bg-white/60 px-3 text-sm font-medium text-zinc-300 sm:px-4">
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />

          <span className="hidden sm:inline">Önceki</span>
        </span>
      )}

      {visiblePages.map((page) => {
        const isActive = page === currentPage;

        return (
          <Link
            key={page}
            href={createPageHref(page)}
            aria-current={isActive ? "page" : undefined}
            className={
              isActive
                ? "inline-flex h-10 min-w-10 items-center justify-center rounded-xl bg-indigo-600 px-3 text-sm font-semibold text-white shadow-sm shadow-indigo-200"
                : "inline-flex h-10 min-w-10 items-center justify-center rounded-xl border border-zinc-200 bg-white px-3 text-sm font-medium text-zinc-600 shadow-sm transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
            }
          >
            {page}
          </Link>
        );
      })}

      {currentPage < totalPages ? (
        <Link
          href={createPageHref(currentPage + 1)}
          className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-3 text-sm font-medium text-zinc-600 shadow-sm transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700 sm:px-4"
        >
          <span className="hidden sm:inline">Sonraki</span>

          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      ) : (
        <span className="inline-flex h-10 cursor-not-allowed items-center justify-center gap-1.5 rounded-xl border border-zinc-200/70 bg-white/60 px-3 text-sm font-medium text-zinc-300 sm:px-4">
          <span className="hidden sm:inline">Sonraki</span>

          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </span>
      )}
    </nav>
  );
}
