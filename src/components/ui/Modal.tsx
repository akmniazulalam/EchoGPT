"use client";

import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";
  showCloseButton?: boolean;
  className?: string;
  bodyClassName?: string;
}

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  maxWidth = "md",
  showCloseButton = true,
  className = "",
  bodyClassName = "",
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidthStyles: Record<string, string> = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "3xl": "max-w-3xl",
    "4xl": "max-w-4xl",
    "5xl": "max-w-5xl",
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full ${maxWidthStyles[maxWidth] || maxWidthStyles.md} max-h-[94vh] flex flex-col bg-white dark:bg-[#121118] border border-zinc-200 dark:border-white/[0.08] rounded-2xl sm:rounded-3xl shadow-2xl z-10 overflow-hidden animate-in zoom-in-95 fade-in duration-200 ${className}`}
      >
        {/* Header (rendered if title exists) */}
        {title ? (
          <div className="flex items-start justify-between p-5 pb-3 border-b border-zinc-100 dark:border-zinc-850 shrink-0">
            <div>
              {typeof title === "string" ? (
                <h3 className="text-base sm:text-lg font-semibold text-zinc-900 dark:text-zinc-100 leading-tight">
                  {title}
                </h3>
              ) : (
                title
              )}
              {description && (
                <p className="text-xs sm:text-[13px] text-zinc-500 dark:text-zinc-400 mt-1">
                  {description}
                </p>
              )}
            </div>

            {showCloseButton && (
              <button
                type="button"
                onClick={onClose}
                className="size-8 -mr-1 -mt-1 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors flex items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-[#713CF4] cursor-pointer"
                aria-label="Close modal"
              >
                <X className="size-4.5" />
              </button>
            )}
          </div>
        ) : showCloseButton ? (
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 z-30 size-8.5 rounded-xl text-zinc-400 hover:text-white dark:text-zinc-400 dark:hover:text-white bg-zinc-100/80 hover:bg-[#DC2626] dark:bg-white/[0.06] dark:hover:bg-[#F87171] border border-zinc-200/60 dark:border-white/[0.08] transition-all flex items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-[#713CF4] cursor-pointer"
            aria-label="Close modal"
          >
            <X className="size-4" />
          </button>
        ) : null}

        {/* Content Body */}
        <div className={`p-4 sm:p-6 overflow-y-auto custom-scrollbar flex-1 ${bodyClassName}`}>
          {children}
        </div>
      </div>
    </div>
  );
}
