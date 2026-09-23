"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { Menu, X, Plus } from "lucide-react";
import { Sidebar } from "./Sidebar";

interface MobileNavProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  activeId: string;
  onSelectNav: (id: string) => void;
  onNewChat: () => void;
}

export function MobileNav({
  isOpen,
  onOpen,
  onClose,
  activeId,
  onSelectNav,
  onNewChat,
}: MobileNavProps) {
  // Close drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
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

  const handleNavSelect = (id: string) => {
    onSelectNav(id);
    onClose();
  };

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

          <div className="flex items-center gap-2">
            <Image
              src="/favicon.svg"
              alt="EchoGPT"
              width={24}
              height={24}
              className="size-6 object-contain"
            />
            <span className="text-[15px] font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
              EchoGPT
            </span>
          </div>
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
          className={`absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-xs transition-opacity duration-300 ease-in-out ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden="true"
        />

        {/* Drawer Panel */}
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className={`relative z-10 flex flex-col w-[280px] max-w-[85vw] h-full bg-white dark:bg-[#111217] shadow-xl transition-transform duration-300 ease-in-out ${
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
            activeId={activeId}
            onSelectNav={handleNavSelect}
            onNewChat={handleNewChat}
            isCollapsed={false}
            isMobileDrawer={true}
            className="w-full border-r-0"
          />
        </div>
      </div>
    </>
  );
}
