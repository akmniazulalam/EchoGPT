"use client";

import React from "react";

interface PlaceholderPageProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

export function PlaceholderPage({ title, description, icon }: PlaceholderPageProps) {
  return (
    <div className="flex flex-col flex-1 h-full min-h-0 items-center justify-center bg-[#FAFAFC] dark:bg-[#0C0D11] px-6">
      <div className="text-center space-y-4 max-w-md">
        {icon && (
          <div className="flex justify-center mb-2">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-800/60 text-zinc-400 dark:text-zinc-500">
              {icon}
            </div>
          </div>
        )}
        <h1 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          {title}
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-normal">
          {description ?? "This section is coming soon. Check back when it's ready."}
        </p>
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800/60 text-[11px] font-medium text-zinc-500 dark:text-zinc-400 select-none">
          <span className="size-1.5 rounded-full bg-[#713CF4] inline-block" />
          Coming Soon
        </div>
      </div>
    </div>
  );
}
