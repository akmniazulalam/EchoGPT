import React from "react";

export interface WorkspaceToolbarProps {
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export function WorkspaceToolbar({
  leftContent,
  rightContent,
  children,
  className = "",
}: WorkspaceToolbarProps) {
  return (
    <div
      className={`shrink-0 flex items-center justify-between gap-3 px-4 sm:px-6 py-2.5 border-b border-zinc-200/60 dark:border-zinc-800/60 bg-white/50 dark:bg-[#111217]/50 backdrop-blur-xs flex-wrap ${className}`}
    >
      <div className="flex items-center gap-2 flex-wrap min-w-0">
        {leftContent}
        {children}
      </div>
      {rightContent && (
        <div className="flex items-center gap-2 shrink-0">{rightContent}</div>
      )}
    </div>
  );
}
