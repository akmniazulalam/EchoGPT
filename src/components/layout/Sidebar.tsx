"use client";

import React from "react";
import Image from "next/image";
import {
  Plus,
  PanelLeftClose,
  PanelLeftOpen,
  Sun,
  Moon,
} from "lucide-react";
import {
  NAVIGATION_SECTIONS,
  BOTTOM_UTILITY_ITEMS,
} from "@/config/navigation";
import { useTheme } from "@/context/ThemeContext";
import { NavItem } from "./NavItem";
import { UpgradeCard } from "./UpgradeCard";

interface SidebarProps {
  activeId: string;
  onSelectNav: (id: string) => void;
  onNewChat: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  className?: string;
  isMobileDrawer?: boolean;
}

export function Sidebar({
  activeId,
  onSelectNav,
  onNewChat,
  isCollapsed = false,
  onToggleCollapse,
  className = "",
  isMobileDrawer = false,
}: SidebarProps) {
  const { theme, toggleTheme, mounted } = useTheme();

  return (
    <aside
      className={`relative flex flex-col h-full bg-white dark:bg-[#111217] border-r border-zinc-200/80 dark:border-zinc-800/80 transition-all duration-200 ease-in-out select-none ${
        isCollapsed ? "w-[72px]" : "w-[264px]"
      } ${className}`}
      aria-label="Sidebar Navigation"
    >
      {/* 1. Header & Brand */}
      <div
        className={`flex items-center h-14 shrink-0 border-b border-zinc-100 dark:border-zinc-850 px-3.5 ${
          isCollapsed ? "justify-center" : "justify-between"
        }`}
      >
        <button
          type="button"
          onClick={onNewChat}
          className="flex items-center gap-2.5 outline-none rounded-lg p-1 -ml-1 focus-visible:ring-2 focus-visible:ring-[#713CF4] group cursor-pointer"
          aria-label="EchoGPT Home"
        >
          <div className="relative size-7 shrink-0 rounded-lg overflow-hidden flex items-center justify-center">
            <Image
              src="/favicon.svg"
              alt="EchoGPT Logo"
              width={28}
              height={28}
              className="size-7 object-contain transition-transform duration-150 group-hover:scale-105"
              priority
            />
          </div>

          {!isCollapsed && (
            <span className="text-[15px] font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
              EchoGPT
            </span>
          )}
        </button>

        {/* Desktop / Tablet Collapse Toggle */}
        {!isMobileDrawer && onToggleCollapse && (
          <button
            type="button"
            onClick={onToggleCollapse}
            className="flex items-center justify-center size-8 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#713CF4] cursor-pointer"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              <PanelLeftOpen className="size-4.5" />
            ) : (
              <PanelLeftClose className="size-4.5" />
            )}
          </button>
        )}
      </div>

      {/* 2. Primary Action: New Chat CTA */}
      <div className={`p-3 shrink-0 ${isCollapsed ? "px-2.5" : "px-3"}`}>
        <button
          type="button"
          onClick={onNewChat}
          className={`group flex items-center justify-center w-full rounded-lg bg-[#713CF4] hover:bg-[#602ee0] active:bg-[#5223c7] text-white font-medium text-[13.5px] transition-all duration-150 shadow-xs cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#713CF4] focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-950 ${
            isCollapsed ? "h-10 px-0" : "h-9.5 px-3.5 gap-2"
          }`}
          title={isCollapsed ? "New Chat" : undefined}
          aria-label="Start New Chat"
        >
          <Plus
            className={`transition-transform duration-150 group-hover:scale-110 shrink-0 ${
              isCollapsed ? "size-5" : "size-4.5"
            }`}
            strokeWidth={2.2}
          />
          {!isCollapsed && (
            <>
              <span className="tracking-tight">New Chat</span>
              <span className="ml-auto text-[11px] font-normal text-white/70 bg-white/15 px-1.5 py-0.5 rounded">
                ⌘K
              </span>
            </>
          )}
        </button>
      </div>

      {/* 3. Navigation Sections (Scrollable Area) */}
      <nav
        className="flex-1 overflow-y-auto min-h-0 custom-scrollbar px-2.5 py-1 space-y-4"
        aria-label="Main Navigation"
      >
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
                  isActive={activeId === item.id}
                  isCollapsed={isCollapsed}
                  onClick={() => onSelectNav(item.id)}
                />
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* 4. Bottom Area: Pro Card & Utility Items (Pinned & Safe) */}
      <div className="shrink-0 p-3 pt-2 border-t border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-[#111217] space-y-2.5">
        {/* Pro Upgrade Card */}
        <UpgradeCard
          isCollapsed={isCollapsed}
          onUpgrade={() => onSelectNav("subscriptions")}
        />

        {/* Bottom Utility Items */}
        <div
          className={`flex items-center pt-1 ${
            isCollapsed
              ? "flex-col gap-1.5 justify-center"
              : "justify-between px-1"
          }`}
        >
          {BOTTOM_UTILITY_ITEMS.map((item) => {
            const isThemeItem = item.id === "theme";
            const Icon = isThemeItem
              ? mounted && theme === "dark"
                ? Sun
                : Moon
              : item.icon;
            const isItemActive = activeId === item.id;
            const itemLabel = isThemeItem
              ? mounted && theme === "dark"
                ? "Light"
                : "Dark"
              : item.label;
            const itemTitle = isThemeItem
              ? mounted && theme === "dark"
                ? "Switch to light theme"
                : "Switch to dark theme"
              : item.label;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  if (isThemeItem) {
                    toggleTheme();
                  } else {
                    onSelectNav(item.id);
                  }
                }}
                className={`flex items-center justify-center rounded-lg transition-colors duration-150 outline-none focus-visible:ring-2 focus-visible:ring-[#713CF4] cursor-pointer ${
                  isCollapsed
                    ? "size-9 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/60"
                    : "flex items-center gap-1.5 px-2 py-1.5 text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 rounded-md"
                } ${
                  isItemActive
                    ? "text-[#713CF4] dark:text-[#a78bfa] font-medium"
                    : ""
                }`}
                title={itemTitle}
                aria-label={itemTitle}
              >
                <Icon className="size-4 shrink-0" strokeWidth={1.8} />
                {!isCollapsed && (
                  <span className="text-[12px] font-normal leading-tight">
                    {itemLabel}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
