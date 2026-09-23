"use client";

import React from "react";
import type { NavItem as NavItemType } from "@/types/navigation";

interface NavItemProps {
  item: NavItemType;
  isActive?: boolean;
  isCollapsed?: boolean;
  onClick?: () => void;
}

export function NavItem({
  item,
  isActive = false,
  isCollapsed = false,
  onClick,
}: NavItemProps) {
  const Icon = item.icon;

  const content = (
    <div
      className={`group relative flex items-center w-full transition-all duration-150 rounded-lg select-none ${
        isCollapsed
          ? "justify-center p-2.5 h-10 w-10 mx-auto"
          : "px-3 py-2 gap-3 h-9"
      } ${
        isActive
          ? "bg-[#713CF4]/10 dark:bg-[#713CF4]/15 text-[#713CF4] dark:text-[#a78bfa] font-medium"
          : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100/80 dark:hover:bg-zinc-800/50 font-normal"
      } ${item.disabled ? "opacity-40 cursor-not-allowed pointer-events-none" : "cursor-pointer"}`}
      title={isCollapsed ? item.label : undefined}
    >
      {/* Active Indicator Bar (when expanded) */}
      {isActive && !isCollapsed && (
        <span
          className="absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r-full bg-[#713CF4]"
          aria-hidden="true"
        />
      )}

      {/* Icon */}
      <Icon
        className={`shrink-0 transition-colors duration-150 ${
          isCollapsed ? "size-5" : "size-[18px]"
        } ${
          isActive
            ? "text-[#713CF4] dark:text-[#a78bfa]"
            : "text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-800 dark:group-hover:text-zinc-200"
        }`}
        strokeWidth={isActive ? 2.2 : 1.8}
        aria-hidden="true"
      />

      {/* Label and Badge (when not collapsed) */}
      {!isCollapsed && (
        <div className="flex flex-1 items-center justify-between min-w-0">
          <span className="truncate text-[13.5px] leading-tight tracking-[-0.005em]">
            {item.label}
          </span>

          {item.badge && (
            <span
              className={`shrink-0 ml-2 px-1.5 py-0.5 rounded text-[10px] font-semibold tracking-wide uppercase transition-colors ${
                item.badge.variant === "pro"
                  ? "bg-[#713CF4]/10 text-[#713CF4] dark:bg-[#713CF4]/20 dark:text-[#a78bfa] border border-[#713CF4]/25"
                  : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
              }`}
            >
              {item.badge.text}
            </span>
          )}
        </div>
      )}

      {/* Compact PRO dot indicator when collapsed */}
      {isCollapsed && item.isPro && (
        <span
          className="absolute top-1.5 right-1.5 size-2 rounded-full bg-[#713CF4] ring-2 ring-white dark:ring-zinc-900"
          title="PRO feature"
          aria-hidden="true"
        />
      )}
    </div>
  );

  const baseClasses =
    "w-full text-left rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-[#713CF4] focus-visible:ring-offset-1 focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-950 block";

  if (item.isExternal) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className={baseClasses}
        aria-label={`${item.label} (opens in new tab)`}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={baseClasses}
      aria-current={isActive ? "page" : undefined}
      aria-label={item.label}
      disabled={item.disabled}
    >
      {content}
    </button>
  );
}
