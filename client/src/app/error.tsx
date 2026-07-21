"use client";

import { EmptyState } from "@/shared/components";

type ErrorPageProps = {
  reset: () => void;
};

export default function ErrorPage({ reset }: ErrorPageProps) {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <EmptyState
        title="Bir hata oluştu"
        description="Ana sayfa verileri yüklenemedi."
        action={
          <button
            type="button"
            onClick={reset}
            className="rounded-xl bg-zinc-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-800"
          >
            Tekrar dene
          </button>
        }
      />
    </div>
  );
}
