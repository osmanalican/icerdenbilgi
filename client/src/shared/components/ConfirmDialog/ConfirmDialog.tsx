"use client";

import { X } from "lucide-react";

type ConfirmDialogProps = {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Onayla",
  cancelLabel = "Vazgeç",
  isLoading = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <button
        type="button"
        aria-label="Kapat"
        className="absolute inset-0 cursor-default bg-black/40 backdrop-blur-[2px]"
        onClick={isLoading ? undefined : onCancel}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        className="relative z-10 w-full max-w-md rounded-3xl border border-zinc-200 bg-white p-6 shadow-2xl"
      >
        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          aria-label="Kapat"
          className="absolute top-4 right-4 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="pr-8">
          <h2
            id="confirm-dialog-title"
            className="text-lg font-semibold text-zinc-950"
          >
            {title}
          </h2>

          <p className="mt-2 text-sm leading-6 text-zinc-600">{description}</p>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="h-10 cursor-pointer rounded-xl border border-zinc-200 px-4 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {cancelLabel}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="h-10 cursor-pointer rounded-xl bg-red-600 px-4 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "Siliniyor..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
