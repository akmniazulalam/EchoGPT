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
      className={`shrink-0 border-b border-zinc-200/80 dark:border-zinc-800/80 bg-white/70 dark:bg-[#16131fb8] backdrop-blur-md z-10 px-3.5 sm:px-6 py-2 sm:py-0 sm:h-18 flex flex-row items-center justify-between gap-2 sm:gap-4 ${className}`}
    >
      {/* Left: Breadcrumbs + Title + Subtitle (Compact single-line flow on mobile) */}
      <div className="flex flex-col min-w-0 flex-1">
        <div className="flex items-center gap-1.5 flex-nowrap sm:flex-wrap min-w-0">
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={idx}>
              {crumb.href ? (
                <Link
                  href={crumb.href}
                  className="text-[10.5px] sm:text-xs font-medium text-zinc-400 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-300 transition-colors uppercase tracking-wider shrink-0"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-[10.5px] sm:text-xs font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wider shrink-0">
                  {crumb.label}
                </span>
              )}
              <span className="text-zinc-300 dark:text-zinc-700 text-xs">/</span>
            </React.Fragment>
          ))}

          <h1 className="text-xs sm:text-[15px] font-semibold text-zinc-900 dark:text-zinc-100 truncate">
            {title}
          </h1>

          {badge && (
            <Badge variant={badge.variant || "default"} size="sm" className="hidden sm:inline-flex">
              {badge.text}
            </Badge>
          )}
        </div>

        {subtitle && (
          <p className="text-[10.5px] sm:text-[11.5px] text-zinc-500 dark:text-zinc-400 truncate mt-0.5 font-normal max-w-[220px] sm:max-w-none">
            {subtitle}
          </p>
        )}
      </div>

      {/* Right: Actions / Controls (Model Selector etc. side-by-side with header info) */}
      {(actions || children) && (
        <div className="flex items-center gap-1.5 shrink-0">
          {actions}
          {children}
        </div>
      )}
    </header>
  );
}
