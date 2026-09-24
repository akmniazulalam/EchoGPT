import React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "pro" | "outline" | "success" | "neutral";
  size?: "sm" | "md";
  children: React.ReactNode;
}

export function Badge({
  variant = "default",
  size = "sm",
  className = "",
  children,
  ...props
}: BadgeProps) {
  const variantStyles = {
    default:
      "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 border-zinc-200/80 dark:border-zinc-700/80",
    pro:
      "bg-[#713CF4]/10 text-[#713CF4] dark:bg-[#713CF4]/20 dark:text-[#a78bfa] border-[#713CF4]/25 font-semibold",
    outline:
      "bg-transparent text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800",
    success:
      "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border-emerald-200/60 dark:border-emerald-800/60",
    neutral:
      "bg-zinc-100 text-zinc-500 dark:bg-zinc-850 dark:text-zinc-400 border-transparent",
  };

  const sizeStyles = {
    sm: "text-[10.5px] px-1.5 py-0.5 rounded-md",
    md: "text-xs px-2 py-0.5 rounded-lg",
  };

  return (
    <span
      className={`inline-flex items-center gap-1 font-medium tracking-wide border leading-tight ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
