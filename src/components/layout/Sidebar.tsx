"use client";

import React, { useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Plus,
  PanelLeftClose,
  PanelLeftOpen,
  Sun,
  Moon,
  Check,
} from "lucide-react";
import { NAVIGATION_SECTIONS, BOTTOM_UTILITY_ITEMS } from "@/config/navigation";
import { useTheme } from "@/context/ThemeContext";
import { useUpgradeModal } from "@/context/UpgradeModalContext";
import { showToast } from "@/components/ui/Toast";
import { NavItem } from "./NavItem";
import { UpgradeCard } from "./UpgradeCard";

interface SidebarProps {
  onNewChat: () => void;
  onNavClick?: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  className?: string;
  isMobileDrawer?: boolean;
}

// Client-safe platform detection for Command+Shift+K vs Ctrl+Shift+K shortcut badge
function usePlatformShortcut(): string {
  return useSyncExternalStore(
    () => () => {},
    () => {
      if (typeof navigator === "undefined") return "Ctrl+Shift+K";
      const isMac = /(Mac|iPhone|iPod|iPad)/i.test(navigator.userAgent || "");
      return isMac ? "⌘⇧K" : "Ctrl+Shift+K";
    },
    () => "Ctrl+Shift+K",
  );
}

export function Sidebar({
  onNewChat,
  onNavClick,
  isCollapsed = false,
  onToggleCollapse,
  className = "",
  isMobileDrawer = false,
}: SidebarProps) {
  const { theme, toggleTheme, mounted } = useTheme();
  const { openUpgradeModal } = useUpgradeModal();
  const shortcutKey = usePlatformShortcut();
  const [shareFeedback, setShareFeedback] = useState(false);

  // Functional Share Handler (Web Share API with Clipboard Fallback)
  const handleShare = () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const shareData = {
      title: "EchoGPT - AI Productivity Solutions",
      text: "Modern AI Productivity & Creation Ecosystem",
      url,
    };

    if (typeof navigator !== "undefined" && navigator.share) {
      navigator
        .share(shareData)
        .then(() => {
          showToast("Shared successfully!", "success");
        })
        .catch((err) => {
          if (err.name !== "AbortError") {
            copyFallback(url);
          }
        });
    } else {
      copyFallback(url);
    }
  };

  const copyFallback = (url: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        setShareFeedback(true);
        showToast("Link copied to clipboard!", "success");
        setTimeout(() => setShareFeedback(false), 2200);
      });
    }
  };

  return (
    <aside
      className={`relative flex flex-col h-full bg-surface border-r border-zinc-200/80 dark:border-zinc-800/80 transition-all duration-200 ease-in-out select-none ${
        isCollapsed ? "w-18" : "w-66"
      } ${className}`}
      aria-label="Sidebar Navigation">
      {/* 1. Header & Brand (Polished SaaS Brand Header - No Scale on Hover) */}
      <div
        className={`flex items-center h-18 shrink-0 border-b border-zinc-200/80 dark:border-zinc-800/80 px-3.5 ${
          isCollapsed ? "justify-center" : "justify-between"
        }`}>
        <Link
          href="/chat"
          className="flex items-center gap-2.5 outline-none rounded-lg p-1 -ml-1 focus-visible:ring-2 focus-visible:ring-[#713CF4] group cursor-pointer"
          aria-label="EchoGPT Home"
          onClick={onNavClick}>
          {/* Logo mark without scale transform */}
          <div className="relative size-8.5 shrink-0 rounded-lg overflow-hidden flex items-center justify-center bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 shadow-2xs">
            <Image
              src="/logo.svg"
              alt="EchoGPT Logo"
              width={38}
              height={38}
              className="object-contain"
              priority
            />
          </div>

          {!isCollapsed && (
            <div className="flex items-center gap-1.5 min-w-0">
              <span
                className="font-bold leading-none text-[22px] tracking-[6px] bg-linear-to-r from-brand to-secondary bg-clip-text text-transparent">
                EchoGPT
              </span>
            </div>
          )}
        </Link>

        {/* Desktop / Tablet Collapse Toggle */}
        {!isMobileDrawer && onToggleCollapse && (
          <button
            type="button"
            onClick={onToggleCollapse}
            className="flex items-center justify-center size-8 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#713CF4] cursor-pointer"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}>
            {isCollapsed ? (
              <PanelLeftOpen className="size-4.5" />
            ) : (
              <PanelLeftClose className="size-4.5" />
            )}
          </button>
        )}
      </div>

      {/* 2. Primary Action: New Chat CTA with Platform Shortcut */}
      <div className={`p-3 shrink-0 ${isCollapsed ? "px-2.5" : "px-3"}`}>
        <button
          type="button"
          onClick={() => {
            onNewChat();
            onNavClick?.();
          }}
          className={`group flex items-center justify-center w-full rounded-lg bg-[#713CF4] hover:bg-[#602ee0] active:bg-[#5223c7] text-white font-medium text-[13.5px] transition-all duration-150 shadow-xs cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#713CF4] focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-950 ${
            isCollapsed ? "h-10 px-0" : "h-9.5 px-3.5 gap-2"
          }`}
          title={isCollapsed ? `New Chat (${shortcutKey})` : undefined}
          aria-label={`Start New Chat (${shortcutKey})`}>
          <Plus
            className={`transition-transform duration-150 group-hover:scale-110 shrink-0 ${
              isCollapsed ? "size-5" : "size-4.5"
            }`}
            strokeWidth={2.2}
          />
          {!isCollapsed && (
            <>
              <span className="tracking-tight">New Chat</span>
              <kbd className="ml-auto text-[11px] font-normal font-sans text-white/80 bg-white/15 px-1.5 py-0.5 rounded tracking-wider">
                {shortcutKey}
              </kbd>
            </>
          )}
        </button>
      </div>

      {/* 3. Navigation Sections (Scrollable Area) */}
      <nav
        className="flex-1 overflow-y-auto min-h-0 custom-scrollbar px-2.5 py-1 space-y-4"
        aria-label="Main Navigation">
        {NAVIGATION_SECTIONS.map((section) => (
          <div key={section.id} className="space-y-0.5">
            {/* Section Header */}
            {!isCollapsed ? (
              <div className="px-2.5 pt-2 pb-1.5">
                <span className="text-[11px] font-semibold tracking-[0.06em] text-zinc-400 dark:text-zinc-500 uppercase select-none">
                  {section.title}
                </span>
              </div>
            ) : (
              <div className="my-2 border-t border-zinc-200/60 dark:border-zinc-800/60 mx-2" />
            )}

            {/* Section Items */}
            <div className="space-y-0.5">
              {section.items.map((item) => (
                <NavItem
                  key={item.id}
                  item={item}
                  isCollapsed={isCollapsed}
                  onClick={onNavClick}
                />
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* 4. Bottom Area: Pro Card & Utility Items (Pinned & Strictly Within Sidebar Bounds) */}
      <div className="shrink-0 p-3 pt-2 border-t border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-[#111217] space-y-2.5">
        {/* Pro Upgrade Card */}
        <UpgradeCard
          isCollapsed={isCollapsed}
          onUpgrade={() => {
            openUpgradeModal(
              "Upgrade to EchoGPT Pro to unlock unlimited models and creative studios.",
            );
            onNavClick?.();
          }}
        />

        {/* Bottom Utility Items: Grid row preventing horizontal overflow */}
        <div
          className={
            isCollapsed
              ? "flex flex-col gap-1.5 items-center pt-1"
              : "grid grid-cols-4 gap-1 w-full pt-1"
          }>
          {BOTTOM_UTILITY_ITEMS.map((item) => {
            const isThemeItem = item.id === "theme";
            const isShareItem = item.id === "share";

            // Dynamic icons
            let Icon = item.icon;
            if (isThemeItem) {
              Icon = mounted && theme === "dark" ? Sun : Moon;
            } else if (isShareItem && shareFeedback) {
              Icon = Check;
            }

            // Dynamic titles & aria labels
            let itemTitle = item.label;
            if (isThemeItem) {
              itemTitle =
                mounted && theme === "dark"
                  ? "Switch to light theme"
                  : "Switch to dark theme";
            } else if (isShareItem) {
              itemTitle = shareFeedback
                ? "Link copied to clipboard!"
                : "Share link";
            }

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  if (isThemeItem) {
                    toggleTheme();
                  } else if (isShareItem) {
                    handleShare();
                  } else if (item.id === "account" || item.id === "settings") {
                    showToast(`${item.label} settings opened`, "info");
                  }
                }}
                className={`flex items-center justify-center rounded-lg transition-colors duration-150 outline-none focus-visible:ring-2 focus-visible:ring-[#713CF4] cursor-pointer relative ${
                  isCollapsed
                    ? "size-9 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/60"
                    : "h-8.5 w-full text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/60"
                } ${
                  isShareItem && shareFeedback
                    ? "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30"
                    : ""
                }`}
                title={itemTitle}
                aria-label={itemTitle}>
                <Icon
                  className={`size-4 shrink-0 transition-transform ${
                    isShareItem && shareFeedback
                      ? "scale-110 text-emerald-500"
                      : ""
                  }`}
                  strokeWidth={1.8}
                />
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
