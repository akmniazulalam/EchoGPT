"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Models", href: "#models" },
  { label: "Studios", href: "#studios" },
  { label: "AI Tasks", href: "#tasks" },
  { label: "Connectors", href: "#connectors" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export function LandingNavbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme, mounted } = useTheme();

  useEffect(() => {
  const container = document.getElementById(
    "landing-scroll-container"
  );

  if (!container) return;

  const handleScroll = () => {
    setScrolled(container.scrollTop > 20);
  };

  container.addEventListener("scroll", handleScroll, {
    passive: true,
  });

  handleScroll();

  return () => {
    container.removeEventListener("scroll", handleScroll);
  };
}, []);

  const handleNavClick = (href: string) => {
  setOpen(false);

  if (href.startsWith("#")) {
    const el = document.getElementById(href.slice(1));

    const container = document.getElementById(
      "landing-scroll-container"
    );

    if (el && container) {
      const offset = 80;

      const containerRect =
        container.getBoundingClientRect();

      const elementRect =
        el.getBoundingClientRect();

      const elementPosition =
        elementRect.top -
        containerRect.top +
        container.scrollTop;

      const offsetPosition =
        elementPosition - offset;

      container.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  }
};

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-200 ${
        scrolled
          ? "bg-white/90 dark:bg-[#16131f] backdrop-blur-md border-b border-zinc-200/80 dark:border-white/8 shadow-xs"
          : "bg-white/70 dark:bg-[#16131f] border-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 outline-none focus-visible:ring-2 focus-visible:ring-[#713CF4] rounded-lg group"
          aria-label="EchoGPT Homepage"
        >
          <div className="relative size-9.5 shrink-0 rounded-xl overflow-hidden flex items-center justify-center bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-white/10 shadow-2xs group-hover:border-[#713CF4]/40 transition-colors">
            <Image
              src="/favicon.svg"
              alt="EchoGPT Logo"
              width={38}
              height={38}
              className="size-9.5 object-contain"
              priority
            />
          </div>
          <span className="font-bold leading-none text-[22px] tracking-[6px] bg-linear-to-r from-brand to-secondary bg-clip-text text-transparent">
            EchoGPT
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <button
              key={link.label}
              type="button"
              onClick={() => handleNavClick(link.href)}
              className="px-3 py-1.5 text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:text-primary dark:hover:text-primary hover:bg-zinc-100 dark:hover:bg-white/6 rounded-lg transition-colors cursor-pointer"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Action Controls: Theme Toggle & CTAs */}
        <div className="hidden sm:flex items-center gap-2">
          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="size-9 rounded-xl flex items-center justify-center text-zinc-500 hover:text-primary dark:text-zinc-400 dark:hover:text-primary hover:bg-zinc-100 dark:hover:bg-white/6 border border-transparent hover:border-zinc-200 dark:hover:border-white/8 transition-all cursor-pointer"
            title={mounted && theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            aria-label={mounted && theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
          >
            {mounted && theme === "dark" ? (
              <Sun className="size-4 text-amber-400" />
            ) : (
              <Moon className="size-4 text-zinc-600 dark:text-zinc-400" />
            )}
          </button>

          <Link
            href="/chat"
            className="px-3.5 py-1.5 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:text-primary dark:hover:text-primary rounded-lg hover:bg-zinc-100 dark:hover:bg-white/6 transition-colors"
          >
            Open App
          </Link>

          <Link
            href="/chat"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#713CF4] hover:bg-[#602ee0] active:bg-[#5223c7] text-white text-xs font-semibold transition-all shadow-sm shadow-[#713CF4]/20 hover:shadow-md hover:shadow-[#713CF4]/30"
          >
            <span>Start Free</span>
            <ArrowRight className="size-3.5" />
          </Link>
        </div>

        {/* Mobile Actions & Hamburger */}
        <div className="flex sm:hidden items-center gap-1.5">
          <button
            type="button"
            onClick={toggleTheme}
            className="size-8.5 rounded-lg flex items-center justify-center text-zinc-500 hover:text-primary dark:text-zinc-400 dark:hover:text-primary hover:bg-zinc-100 dark:hover:bg-white/6 transition-colors cursor-pointer"
            aria-label="Toggle theme"
          >
            {mounted && theme === "dark" ? (
              <Sun className="size-4 text-amber-400" />
            ) : (
              <Moon className="size-4 text-zinc-600 dark:text-zinc-400" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="size-8.5 p-1.5 border border-[#2a2536] rounded-lg flex items-center justify-center text-primary dark:text-primary hover:bg-zinc-100 dark:hover:bg-white/6 transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
            aria-expanded={open}
          >
            {open ? <X className="size-5.5" /> : <Menu className="size-5.5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {open && (
        <div className="lg:hidden border-t border-zinc-200/80 dark:border-white/8 bg-white/98 dark:bg-[#090A0F]/98 backdrop-blur-xl animate-in slide-in-from-top-2 duration-150">
          <div className="max-w-6xl mx-auto px-4 py-3.5 space-y-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                type="button"
                onClick={() => handleNavClick(link.href)}
                className="block w-full text-left px-3 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-primary dark:hover:text-zinc-50 hover:bg-zinc-100 dark:hover:bg-white/6 rounded-xl transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            ))}

            <div className="pt-3 pb-1 border-t border-zinc-100 dark:border-white/8 flex flex-col gap-2">
              <Link
                href="/chat"
                onClick={() => setOpen(false)}
                className="block text-center py-2.5 text-sm font-semibold text-zinc-700 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
              >
                Open Workspace
              </Link>
              <Link
                href="/chat"
                onClick={() => setOpen(false)}
                className="block text-center py-2.5 text-sm font-semibold bg-[#713CF4] hover:bg-[#602ee0] text-white rounded-xl transition-colors shadow-sm"
              >
                Start Free →
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
