"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";
import { Sun, Moon } from "lucide-react";

interface AuthLayoutProps {
  /** Heading shown above the form card */
  heading: string;
  /** Sub-heading shown below the main heading */
  subheading: string;
  /** Feature bullets shown on the left branding panel (desktop) */
  features: { icon: React.ReactNode; label: string }[];
  children: React.ReactNode;
}

/**
 * Shared two-column auth page layout.
 *
 * Desktop: left branding panel + right form card.
 * Mobile: centered form card only (no branding panel).
 */
export function AuthPageLayout({
  heading,
  subheading,
  features,
  children,
}: AuthLayoutProps) {
  const { theme, toggleTheme, mounted } = useTheme();

  return (
    <div className="min-h-screen flex flex-col bg-[#FCFCFD] dark:bg-[#090A0F] font-lexend">
      {/* Top bar */}
      <header className="shrink-0 px-5 sm:px-8 h-14 flex items-center justify-between border-b border-zinc-200/60 dark:border-white/[0.06] bg-white/80 dark:bg-[#090A0F]/80 backdrop-blur-md">
        <Link
          href="/"
          className="flex items-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-[#713CF4] rounded-lg group"
          aria-label="EchoGPT Homepage"
        >
          <div className="relative size-8 shrink-0 rounded-xl overflow-hidden flex items-center justify-center bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-white/10 shadow-2xs group-hover:border-[#713CF4]/40 transition-colors">
            <Image
              src="/favicon.svg"
              alt="EchoGPT Logo"
              width={32}
              height={32}
              className="size-8 object-contain"
              priority
            />
          </div>
          <span className="font-bold text-[18px] tracking-[5px] bg-linear-to-r from-brand to-secondary bg-clip-text text-transparent">
            EchoGPT
          </span>
        </Link>

        <button
          type="button"
          onClick={toggleTheme}
          className="size-8.5 rounded-xl flex items-center justify-center text-zinc-500 hover:text-primary dark:text-zinc-400 dark:hover:text-primary hover:bg-zinc-100 dark:hover:bg-white/6 border border-transparent hover:border-zinc-200 dark:hover:border-white/8 transition-all cursor-pointer"
          title={mounted && theme === "dark" ? "Switch to light" : "Switch to dark"}
          aria-label={mounted && theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
        >
          {mounted && theme === "dark" ? (
            <Sun className="size-4 text-amber-400" />
          ) : (
            <Moon className="size-4 text-zinc-600 dark:text-zinc-400" />
          )}
        </button>
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center px-4 py-10 sm:py-14">
        <div className="w-full max-w-4xl flex flex-col lg:flex-row items-center lg:items-stretch gap-8 lg:gap-12">
          {/* ── Left: Branding panel (desktop only) ── */}
          <div className="hidden lg:flex flex-col justify-center flex-1 space-y-8 pr-4">
            {/* Logo + name */}
            <div className="space-y-3">
              <div className="size-14 rounded-2xl overflow-hidden border border-zinc-200/80 dark:border-white/10 shadow-sm bg-white dark:bg-zinc-900 flex items-center justify-center">
                <Image
                  src="/favicon.svg"
                  alt="EchoGPT"
                  width={56}
                  height={56}
                  className="size-14 object-contain"
                />
              </div>
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
                  EchoGPT
                </h1>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed max-w-xs">
                  Your unified AI workspace — chat, create, compare, and automate with the
                  world&apos;s leading AI models.
                </p>
              </div>
            </div>

            {/* Feature list */}
            <ul className="space-y-3.5">
              {features.map((f, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="size-8 rounded-xl flex items-center justify-center bg-[#713CF4]/10 border border-[#713CF4]/20 text-[#713CF4] dark:text-[#a78bfa] shrink-0">
                    {f.icon}
                  </div>
                  <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    {f.label}
                  </span>
                </li>
              ))}
            </ul>

            {/* Decorative ambient */}
            <div className="relative h-32 overflow-hidden rounded-2xl bg-gradient-to-br from-[#713CF4]/8 to-[#a78bfa]/4 border border-[#713CF4]/10 flex items-center justify-center">
              <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_30%_50%,_#713CF4_0%,_transparent_60%)]" />
              <p className="relative text-xs font-semibold text-[#713CF4] dark:text-[#a78bfa] tracking-wide uppercase">
                Free tier · No credit card required
              </p>
            </div>
          </div>

          {/* ── Right: Form card ── */}
          <div className="w-full lg:max-w-sm xl:max-w-md">
            <div className="bg-white dark:bg-[#12111A] rounded-2xl border border-zinc-200/80 dark:border-white/8 shadow-xl shadow-zinc-200/50 dark:shadow-none p-7 sm:p-8 space-y-6">
              {/* Card heading */}
              <div className="space-y-1">
                <h2 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
                  {heading}
                </h2>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">{subheading}</p>
              </div>

              {/* Divider */}
              <div className="h-px bg-zinc-100 dark:bg-white/[0.06]" />

              {/* Form slot */}
              {children}
            </div>
          </div>
        </div>
      </main>

      {/* Footer micro-copy */}
      <footer className="shrink-0 py-5 text-center text-[11px] text-zinc-400 dark:text-zinc-600">
        &copy; {new Date().getFullYear()} EchoGPT. All rights reserved.
      </footer>
    </div>
  );
}
