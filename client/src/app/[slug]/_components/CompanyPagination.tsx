import Link from "next/link";

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

  const createPageHref = (page: number) => `/${slug}?page=${page}`;

  const visiblePages = Array.from(
    { length: totalPages },
    (_, index) => index + 1,
  );

  return (
    <nav
      aria-label="Deneyim sayfaları"
      className="mt-10 flex flex-wrap items-center justify-center gap-2"
    >
      {currentPage > 1 ? (
        <Link
          href={createPageHref(currentPage - 1)}
          className="inline-flex h-10 items-center justify-center rounded-lg border border-zinc-200 px-4 text-sm font-medium text-zinc-700 transition hover:border-zinc-300 hover:bg-zinc-50"
        >
          Önceki
        </Link>
      ) : (
        <span className="inline-flex h-10 cursor-not-allowed items-center justify-center rounded-lg border border-zinc-100 px-4 text-sm font-medium text-zinc-300">
          Önceki
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
                ? "inline-flex h-10 min-w-10 items-center justify-center rounded-lg bg-zinc-950 px-3 text-sm font-medium text-white"
                : "inline-flex h-10 min-w-10 items-center justify-center rounded-lg border border-zinc-200 px-3 text-sm font-medium text-zinc-700 transition hover:border-zinc-300 hover:bg-zinc-50"
            }
          >
            {page}
          </Link>
        );
      })}

      {currentPage < totalPages ? (
        <Link
          href={createPageHref(currentPage + 1)}
          className="inline-flex h-10 items-center justify-center rounded-lg border border-zinc-200 px-4 text-sm font-medium text-zinc-700 transition hover:border-zinc-300 hover:bg-zinc-50"
        >
          Sonraki
        </Link>
      ) : (
        <span className="inline-flex h-10 cursor-not-allowed items-center justify-center rounded-lg border border-zinc-100 px-4 text-sm font-medium text-zinc-300">
          Sonraki
        </span>
      )}
    </nav>
  );
}
