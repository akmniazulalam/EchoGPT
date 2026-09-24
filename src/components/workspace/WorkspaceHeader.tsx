"use client";

import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface WorkspaceHeaderProps {
  title: string;
  breadcrumbs?: BreadcrumbItem[];
  badge?: {
    text: string;
    variant?: "default" | "pro" | "success" | "outline";
  };
  subtitle?: string;
  actions?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export function WorkspaceHeader({
  title,
  breadcrumbs = [{ label: "Workspace" }],
  badge,
  subtitle,
  actions,
  children,
  className = "",
}: WorkspaceHeaderProps) {
  return (
    <header
      className={`shrink-0 border-b border-zinc-200/80 dark:border-zinc-800/80 bg-white/70 dark:bg-[#16131fb8] backdrop-blur-md z-10 px-4 sm:px-6 py-2.5 sm:py-0 sm:h-18 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 sm:gap-4 ${className}`}
    >
      {/* Left: Breadcrumbs + Title */}
      <div className="flex flex-col min-w-0">
        <div className="flex items-center gap-2 flex-wrap min-w-0">
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={idx}>
              {crumb.href ? (
                <Link
                  href={crumb.href}
                  className="text-xs font-medium text-zinc-400 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-300 transition-colors uppercase tracking-wider"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-xs font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                  {crumb.label}
                </span>
              )}
              <span className="text-zinc-300 dark:text-zinc-700">/</span>
            </React.Fragment>
          ))}

          <h1 className="text-sm sm:text-[15px] font-semibold text-zinc-900 dark:text-zinc-100 truncate">
            {title}
          </h1>

          {badge && (
            <Badge variant={badge.variant || "default"} size="sm">
              {badge.text}
            </Badge>
          )}
        </div>

        {subtitle && (
          <p className="text-[11.5px] text-zinc-500 dark:text-zinc-400 line-clamp-1 mt-0.5 font-normal">
            {subtitle}
          </p>
        )}
      </div>

      {/* Right: Actions / Controls (Reflows on mobile without overflowing) */}
      {(actions || children) && (
        <div className="flex items-center gap-2 flex-wrap shrink-0">
          {actions}
          {children}
        </div>
      )}
    </header>
  );
}
