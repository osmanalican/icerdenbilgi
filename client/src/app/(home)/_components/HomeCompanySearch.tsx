"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

import { useDebounce, useSearchCompanies } from "@/shared/hooks";

const popularCompanies = [
  { name: "Trendyol", slug: "trendyol" },
  { name: "Getir", slug: "getir" },
  { name: "Hepsiburada", slug: "hepsiburada" },
  { name: "Insider", slug: "insider" },
];

export function HomeCompanySearch() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const listboxId = useId();

  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const debouncedQuery = useDebounce(query, 300);
  const normalizedQuery = debouncedQuery.trim();

  const {
    data: companies = [],
    isFetching,
    isError,
  } = useSearchCompanies(normalizedQuery);

  const canSearch = query.trim().length >= 2;

  const safeActiveIndex =
    activeIndex >= 0 && activeIndex < companies.length ? activeIndex : -1;

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setActiveIndex(-1);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  function navigateToCompany(slug: string) {
    setIsOpen(false);
    setActiveIndex(-1);
    router.push(`/${slug}`);
  }

  function handleSearch() {
    const trimmedQuery = query.trim();

    if (trimmedQuery.length < 2) {
      return;
    }

    const exactMatch = companies.find(
      (company) =>
        company.name.toLocaleLowerCase("tr-TR") ===
        trimmedQuery.toLocaleLowerCase("tr-TR"),
    );

    if (exactMatch) {
      navigateToCompany(exactMatch.slug);
      return;
    }

    if (companies.length === 1) {
      navigateToCompany(companies[0].slug);
      return;
    }

    setIsOpen(true);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();

      if (!isOpen && canSearch) {
        setIsOpen(true);
      }

      if (companies.length > 0) {
        setActiveIndex((currentIndex) =>
          currentIndex >= companies.length - 1 ? 0 : currentIndex + 1,
        );
      }

      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();

      if (companies.length > 0) {
        setActiveIndex((currentIndex) =>
          currentIndex <= 0 ? companies.length - 1 : currentIndex - 1,
        );
      }

      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();

      if (safeActiveIndex >= 0) {
        navigateToCompany(companies[safeActiveIndex].slug);
        return;
      }

      handleSearch();
      return;
    }

    if (event.key === "Escape") {
      setIsOpen(false);
      setActiveIndex(-1);
    }
  }

  const shouldShowDropdown = isOpen && canSearch;

  return (
    <div ref={containerRef} className="relative mt-8 w-full max-w-2xl sm:mt-10">
      <div className="flex w-full gap-2 sm:gap-3">
        <div className="relative min-w-0 flex-1">
          <Search
            className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-zinc-400 sm:hidden"
            aria-hidden="true"
          />

          <input
            type="search"
            role="combobox"
            name="company"
            value={query}
            onChange={(event) => {
              const value = event.target.value;

              setQuery(value);
              setIsOpen(value.trim().length >= 2);
              setActiveIndex(-1);
            }}
            onFocus={() => {
              if (canSearch) {
                setIsOpen(true);
              }
            }}
            onKeyDown={handleKeyDown}
            aria-label="Şirket ara"
            aria-expanded={shouldShowDropdown}
            aria-autocomplete="list"
            aria-controls={shouldShowDropdown ? listboxId : undefined}
            aria-activedescendant={
              safeActiveIndex >= 0
                ? `${listboxId}-option-${safeActiveIndex}`
                : undefined
            }
            autoComplete="off"
            placeholder="Şirket ara..."
            className="h-12 w-full rounded-xl border border-zinc-300 bg-white pr-4 pl-11 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-zinc-500 sm:pl-4 sm:text-base"
          />

          {shouldShowDropdown && (
            <div
              id={listboxId}
              role="listbox"
              className="absolute top-full left-0 z-30 mt-2 max-h-72 w-full overflow-y-auto rounded-xl border border-zinc-200 bg-white p-1 shadow-lg"
            >
              {isFetching && (
                <p className="px-3 py-3 text-sm text-zinc-500">
                  Şirketler aranıyor...
                </p>
              )}

              {!isFetching && isError && (
                <p className="px-3 py-3 text-sm text-red-600">
                  Şirketler getirilemedi.
                </p>
              )}

              {!isFetching &&
                !isError &&
                companies.map((company, index) => {
                  const isActive = safeActiveIndex === index;

                  return (
                    <button
                      id={`${listboxId}-option-${index}`}
                      key={company.id}
                      type="button"
                      role="option"
                      aria-selected={isActive}
                      onMouseEnter={() => setActiveIndex(index)}
                      onMouseDown={(event) => {
                        event.preventDefault();
                        navigateToCompany(company.slug);
                      }}
                      className={[
                        "flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-left transition",
                        isActive ? "bg-zinc-100" : "hover:bg-zinc-50",
                      ].join(" ")}
                    >
                      <div className="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-zinc-100 text-sm font-semibold text-zinc-600">
                        {company.logoUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={company.logoUrl}
                            alt=""
                            className="size-full object-cover"
                          />
                        ) : (
                          company.name.charAt(0).toLocaleUpperCase("tr-TR")
                        )}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-zinc-950">
                          {company.name}
                        </p>

                        <p className="truncate text-xs text-zinc-500">
                          /{company.slug}
                        </p>
                      </div>
                    </button>
                  );
                })}

              {!isFetching && !isError && companies.length === 0 && (
                <p className="px-3 py-3 text-sm text-zinc-500">
                  Eşleşen şirket bulunamadı.
                </p>
              )}
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={handleSearch}
          disabled={!canSearch}
          aria-label="Şirket ara"
          className="flex h-12 shrink-0 cursor-pointer items-center justify-center rounded-xl bg-zinc-950 px-4 font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50 sm:px-6"
        >
          <Search className="h-4 w-4 sm:hidden" aria-hidden="true" />

          <span className="hidden sm:inline">Ara</span>
        </button>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-1.5 gap-y-2 text-xs text-zinc-500 sm:text-sm">
        <span>Popüler:</span>

        {popularCompanies.map((company, index) => (
          <span key={company.slug} className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => navigateToCompany(company.slug)}
              className="cursor-pointer text-zinc-700 transition hover:text-zinc-950 hover:underline"
            >
              {company.name}
            </button>

            {index < popularCompanies.length - 1 && (
              <span className="text-zinc-300" aria-hidden="true">
                ·
              </span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
