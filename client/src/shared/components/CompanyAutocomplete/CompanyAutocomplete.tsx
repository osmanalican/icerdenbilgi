"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";

import { useDebounce, useSearchCompanies } from "@/shared/hooks";

type CompanyAutocompleteProps = {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  error?: string;
  placeholder?: string;
};

export function CompanyAutocomplete({
  value,
  id,
  onChange,
  disabled = false,
  error,
  placeholder = "Şirket adı",
}: CompanyAutocompleteProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const listboxId = useId();

  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const debouncedValue = useDebounce(value, 300);

  const normalizedValue = value.trim();
  const normalizedDebouncedValue = debouncedValue.trim();

  const {
    data: companies = [],
    isFetching,
    isError,
  } = useSearchCompanies(normalizedDebouncedValue);

  const canSearch = normalizedValue.length >= 2;

  const hasExactMatch = companies.some(
    (company) =>
      company.name.trim().toLocaleLowerCase("tr-TR") ===
      normalizedValue.toLocaleLowerCase("tr-TR"),
  );

  const showCreateOption =
    canSearch &&
    !isFetching &&
    normalizedDebouncedValue === normalizedValue &&
    !hasExactMatch;

  const optionCount = companies.length + (showCreateOption ? 1 : 0);
  const safeActiveIndex =
    activeIndex >= 0 && activeIndex < optionCount ? activeIndex : -1;

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

  function handleInputChange(nextValue: string) {
    onChange(nextValue);
    setIsOpen(nextValue.trim().length >= 2);
    setActiveIndex(-1);
  }

  function selectCompany(companyName: string) {
    onChange(companyName);
    setIsOpen(false);
    setActiveIndex(-1);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (!isOpen || optionCount === 0) {
      if (event.key === "ArrowDown" && canSearch) {
        setIsOpen(true);
      }

      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();

      setActiveIndex((currentIndex) =>
        currentIndex >= optionCount - 1 ? 0 : currentIndex + 1,
      );

      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();

      setActiveIndex((currentIndex) =>
        currentIndex <= 0 ? optionCount - 1 : currentIndex - 1,
      );

      return;
    }

    if (event.key === "Enter" && safeActiveIndex >= 0) {
      event.preventDefault();

      if (safeActiveIndex < companies.length) {
        selectCompany(companies[safeActiveIndex].name);
        return;
      }

      if (showCreateOption) {
        selectCompany(normalizedValue);
      }

      return;
    }

    if (event.key === "Escape") {
      setIsOpen(false);
      setActiveIndex(-1);
    }
  }

  const shouldShowDropdown = isOpen && canSearch;

  return (
    <div ref={containerRef} className="relative">
      <input
        type="text"
        id={id}
        value={value}
        onChange={(event) => handleInputChange(event.target.value)}
        onFocus={() => {
          if (canSearch) {
            setIsOpen(true);
          }
        }}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        placeholder={placeholder}
        autoComplete="off"
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={shouldShowDropdown}
        aria-controls={shouldShowDropdown ? listboxId : undefined}
        aria-activedescendant={
          safeActiveIndex >= 0
            ? `${listboxId}-option-${safeActiveIndex}`
            : undefined
        }
        aria-invalid={Boolean(error)}
        className={[
          "w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-900",
          "outline-none transition",
          "placeholder:text-slate-400",
          "focus:border-slate-400 focus:ring-4 focus:ring-slate-100",
          "disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500",
          error ? "border-red-400" : "border-slate-200",
        ].join(" ")}
      />

      {shouldShowDropdown && (
        <div
          id={listboxId}
          role="listbox"
          className="absolute z-30 mt-2 max-h-72 w-full overflow-y-auto rounded-xl border border-slate-200 bg-white p-1 shadow-lg"
        >
          {isFetching && (
            <p className="px-3 py-3 text-sm text-slate-500">
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
                    selectCompany(company.name);
                  }}
                  className={[
                    "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left",
                    isActive ? "bg-slate-100" : "hover:bg-slate-50",
                  ].join(" ")}
                >
                  <div className="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-slate-100 text-sm font-semibold text-slate-600">
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
                    <p className="truncate text-sm font-medium text-slate-900">
                      {company.name}
                    </p>
                    <p className="truncate text-xs text-slate-500">
                      /{company.slug}
                    </p>
                  </div>
                </button>
              );
            })}

          {!isFetching && !isError && showCreateOption && (
            <button
              id={`${listboxId}-option-${companies.length}`}
              type="button"
              role="option"
              aria-selected={safeActiveIndex === companies.length}
              onMouseEnter={() => setActiveIndex(companies.length)}
              onMouseDown={(event) => {
                event.preventDefault();
                selectCompany(normalizedValue);
              }}
              className={[
                "w-full rounded-lg px-3 py-3 text-left text-sm",
                safeActiveIndex === companies.length
                  ? "bg-slate-100"
                  : "hover:bg-slate-50",
              ].join(" ")}
            >
              <span className="font-medium text-slate-900">
                “{normalizedValue}”
              </span>
              <span className="text-slate-600"> adlı yeni şirketi kullan</span>
            </button>
          )}

          {!isFetching &&
            !isError &&
            companies.length === 0 &&
            !showCreateOption && (
              <p className="px-3 py-3 text-sm text-slate-500">
                Eşleşen şirket bulunamadı.
              </p>
            )}
        </div>
      )}

      {error && (
        <p role="alert" className="mt-1.5 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
