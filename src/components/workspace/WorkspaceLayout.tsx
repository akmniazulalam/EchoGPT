import React from "react";

export interface WorkspaceLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function WorkspaceLayout({
  children,
  className = "",
}: WorkspaceLayoutProps) {
  return (
    <div
      className={`flex flex-col flex-1 h-full min-h-0 bg-[#FAFAFC] dark:bg-[#0C0D11] text-zinc-900 dark:text-zinc-100 ${className}`}
    >
      {children}
    </div>
  );
}
