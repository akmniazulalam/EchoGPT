"use client";

import React, { useState, useEffect } from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

export interface ToastMessage {
  id: string;
  title: string;
  type?: "success" | "info" | "error";
  duration?: number;
}

export function showToast(
  title: string,
  type: "success" | "info" | "error" = "success",
  duration = 2600
) {
  if (typeof window === "undefined") return;
  const event = new CustomEvent("echogpt:toast", {
    detail: { id: `toast-${Date.now()}-${Math.random()}`, title, type, duration },
  });
  window.dispatchEvent(event);
}

export function ToastContainer() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    const handleNewToast = (e: Event) => {
      const customEvent = e as CustomEvent<ToastMessage>;
      if (!customEvent.detail) return;
      const newToast = customEvent.detail;
      setToasts((prev) => [...prev.slice(-2), newToast]);

      const timer = setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
      }, newToast.duration || 2600);

      return () => clearTimeout(timer);
    };

    window.addEventListener("echogpt:toast", handleNewToast);
    return () => window.removeEventListener("echogpt:toast", handleNewToast);
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed bottom-5 right-5 z-60 flex flex-col gap-2 max-w-sm pointer-events-none"
      aria-live="polite"
    >
      {toasts.map((toast) => {
        const isSuccess = toast.type === "success" || !toast.type;
        const isError = toast.type === "error";

        return (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border bg-white dark:bg-[#1b1725] border-zinc-200 dark:border-zinc-800 shadow-lg text-zinc-900 dark:text-zinc-100 text-[13px] font-medium animate-in slide-in-from-bottom-3 fade-in duration-200"
          >
            {isSuccess && (
              <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
            )}
            {isError && (
              <AlertCircle className="size-4 text-rose-500 shrink-0" />
            )}
            {!isSuccess && !isError && (
              <Info className="size-4 text-[#713CF4] shrink-0" />
            )}

            <span className="flex-1 leading-tight">{toast.title}</span>

            <button
              type="button"
              onClick={() =>
                setToasts((prev) => prev.filter((t) => t.id !== toast.id))
              }
              className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 p-0.5 rounded cursor-pointer"
              aria-label="Dismiss notification"
            >
              <X className="size-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
