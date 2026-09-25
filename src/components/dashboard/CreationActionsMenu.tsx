"use client";

import React, { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

const emptySubscribe = () => () => {};

export interface CreationActionItem {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  danger?: boolean;
}

export interface CreationActionsMenuProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  actions: CreationActionItem[];
}

export function CreationActionsMenu({
  isOpen,
  onClose,
  triggerRef,
  actions,
}: CreationActionsMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState<{ top: number; left: number; placement: "top" | "bottom" } | null>(null);
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  // Compute position on open and update on scroll/resize
  useEffect(() => {
    if (!isOpen) return;

    const updatePosition = () => {
      if (!triggerRef.current) return;
      const rect = triggerRef.current.getBoundingClientRect();

      // If trigger is scrolled completely out of view, close menu
      if (rect.bottom < 0 || rect.top > window.innerHeight) {
        onClose();
        return;
      }

      const menuWidth = 176; // w-44
      const menuHeight = 195; // estimated menu height
      const spaceBelow = window.innerHeight - rect.bottom;
      const placement: "top" | "bottom" =
        spaceBelow < menuHeight && rect.top > menuHeight ? "top" : "bottom";

      const top = placement === "top" ? rect.top - menuHeight - 6 : rect.bottom + 6;
      let left = rect.right - menuWidth;

      // Keep inside screen boundaries
      if (left < 12) left = 12;
      if (left + menuWidth > window.innerWidth - 12) {
        left = window.innerWidth - menuWidth - 12;
      }

      setCoords({ top, left, placement });
    };

    const rafId = requestAnimationFrame(updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [isOpen, onClose, triggerRef]);

  // Click outside listener
  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      if (
        menuRef.current &&
        !menuRef.current.contains(target) &&
        triggerRef.current &&
        !triggerRef.current.contains(target)
      ) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose, triggerRef]);

  // Escape key listener
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
        triggerRef.current?.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, triggerRef]);

  if (!isOpen || !mounted || !coords) return null;

  return createPortal(
    <div
      ref={menuRef}
      role="menu"
      aria-label="Creation actions"
      style={{
        position: "fixed",
        top: `${coords.top}px`,
        left: `${coords.left}px`,
      }}
      className={`w-44 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#1b1725] shadow-2xl z-50 py-1 overflow-hidden animate-in fade-in-50 zoom-in-95 duration-100 ${
        coords.placement === "top" ? "origin-bottom-right" : "origin-top-right"
      }`}
    >
      {actions.map((item, idx) => (
        <button
          key={idx}
          type="button"
          role="menuitem"
          onClick={() => {
            item.onClick();
            onClose();
          }}
          className={`w-full flex items-center gap-2.5 px-3 py-2 text-[12px] font-medium transition-colors cursor-pointer outline-none focus-visible:bg-zinc-100 dark:focus-visible:bg-zinc-800/80 ${
            item.danger
              ? "text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 focus-visible:text-red-600"
              : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/60"
          }`}
        >
          <span className={`shrink-0 ${item.danger ? "text-red-400" : "text-zinc-400 dark:text-zinc-500"}`}>
            {item.icon}
          </span>
          <span className="truncate">{item.label}</span>
        </button>
      ))}
    </div>,
    document.body
  );
}
