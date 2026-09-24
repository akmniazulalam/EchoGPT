import React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "xs" | "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export function Button({
  variant = "secondary",
  size = "md",
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center font-medium transition-all duration-150 rounded-lg outline-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none focus-visible:ring-2 focus-visible:ring-[#713CF4] focus-visible:ring-offset-1 dark:focus-visible:ring-offset-zinc-950";

  const variantClasses = {
    primary:
      "bg-[#713CF4] hover:bg-[#602ee0] active:bg-[#5223c7] text-white shadow-xs",
    secondary:
      "bg-zinc-100 hover:bg-zinc-200/80 active:bg-zinc-200 text-zinc-800 dark:bg-zinc-800 dark:hover:bg-zinc-750 dark:active:bg-zinc-700 dark:text-zinc-100",
    outline:
      "border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#15161C] hover:bg-zinc-50 dark:hover:bg-zinc-800/60 text-zinc-700 dark:text-zinc-300 shadow-2xs",
    ghost:
      "bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800/60 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100",
    danger:
      "bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white shadow-xs",
  };

  const sizeClasses = {
    xs: "h-7 px-2 text-xs gap-1",
    sm: "h-8 px-2.5 text-xs gap-1.5",
    md: "h-9 px-3.5 text-[13px] gap-2",
    lg: "h-10 px-4 text-sm gap-2",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="size-3.5 border-2 border-current border-t-transparent rounded-full animate-spin shrink-0" />
      ) : (
        leftIcon && <span className="shrink-0">{leftIcon}</span>
      )}
      {children}
      {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </button>
  );
}
