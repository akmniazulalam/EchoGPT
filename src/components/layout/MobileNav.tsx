"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Plus } from "lucide-react";
import { Sidebar } from "./Sidebar";

interface MobileNavProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onNewChat: () => void;
}

export function MobileNav({
  isOpen,
  onOpen,
  onClose,
  onNewChat,
}: MobileNavProps) {
  const pathname = usePathname();
  const prevPathnameRef = useRef(pathname);

  // Close drawer ONLY when the pathname actually changes from user navigation
  useEffect(() => {
    if (prevPathnameRef.current !== pathname) {
      prevPathnameRef.current = pathname;
      onClose();
    }
  }, [pathname, onClose]);

  // Close drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleNewChat = () => {
    onNewChat();
    onClose();
  };

  return (
    <>
      {/* Top Mobile Bar (visible only below md breakpoint) */}
      <header className="md:hidden sticky top-0 z-30 flex items-center justify-between h-14 px-4 bg-white/95 dark:bg-[#111217]/95 backdrop-blur-md border-b border-zinc-200/80 dark:border-zinc-800/80 select-none">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpen}
            className="flex items-center justify-center size-9 rounded-lg text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#713CF4] cursor-pointer"
            aria-label="Open navigation menu"
            aria-expanded={isOpen}
          >
            <Menu className="size-5" />
          </button>

          <Link
            href="/chat"
            className="flex items-center gap-2.5 outline-none focus-visible:ring-2 focus-visible:ring-[#713CF4] rounded-md group"
            aria-label="EchoGPT Home"
          >
            <div className="relative size-7 shrink-0 rounded-lg overflow-hidden flex items-center justify-center bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 shadow-2xs">
              <Image
                src="/favicon.svg"
                alt="EchoGPT Logo"
                width={26}
                height={26}
                className="size-6 object-contain"
                priority
              />
            </div>
            <span className="text-[17px] font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 leading-none">
              EchoGPT
            </span>
          </Link>
        </div>

        {/* Quick New Chat Button for Mobile */}
        <button
          type="button"
          onClick={handleNewChat}
          className="flex items-center justify-center size-8.5 rounded-lg bg-[#713CF4] hover:bg-[#602ee0] active:bg-[#5223c7] text-white transition-colors shadow-xs outline-none focus-visible:ring-2 focus-visible:ring-[#713CF4] cursor-pointer"
          aria-label="Start New Chat"
          title="New Chat"
        >
          <Plus className="size-4.5" strokeWidth={2.2} />
        </button>
      </header>

      {/* Slide-in Mobile Drawer */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-visibility duration-300 ${
          isOpen ? "visible" : "invisible pointer-events-none"
        }`}
        aria-hidden={!isOpen}
      >
        {/* Backdrop Overlay */}
        <div
          onClick={onClose}
          className={`absolute inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-xs transition-opacity duration-300 ease-in-out ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden="true"
        />

        {/* Drawer Panel */}
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          onClick={(e) => e.stopPropagation()}
          className={`relative z-10 flex flex-col w-70 max-w-[85vw] h-full bg-white dark:bg-[#111217] shadow-2xl transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Close button at top corner */}
          <div className="absolute top-3.5 right-3.5 z-20">
            <button
              type="button"
              onClick={onClose}
              className="flex items-center justify-center size-8 rounded-lg text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#713CF4] cursor-pointer"
              aria-label="Close navigation menu"
            >
              <X className="size-4.5" />
            </button>
          </div>

          {/* Full Sidebar inside drawer */}
          <Sidebar
            onNewChat={handleNewChat}
            onNavClick={onClose}
            isCollapsed={false}
            isMobileDrawer={true}
            className="w-full border-r-0"
          />
        </div>
      </div>
    </>
  );
}
