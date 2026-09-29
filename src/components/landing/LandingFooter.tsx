"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/echogptlive/",
    icon: FacebookIcon,
    hoverClass:
      "hover:text-[#1877F2] hover:border-[#1877F2]/40 hover:bg-[#1877F2]/5 dark:hover:bg-[#1877F2]/10",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/echogptlive/",
    icon: InstagramIcon,
    hoverClass:
      "hover:text-[#E4405F] hover:border-[#E4405F]/40 hover:bg-[#E4405F]/5 dark:hover:bg-[#E4405F]/10",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/echogpt/",
    icon: LinkedInIcon,
    hoverClass:
      "hover:text-[#0A66C2] hover:border-[#0A66C2]/40 hover:bg-[#0A66C2]/5 dark:hover:bg-[#0A66C2]/10",
  },
];

export function LandingFooter() {
  return (
    <footer className="border-t border-zinc-200/80 dark:border-white/8 bg-zinc-50/60 dark:bg-[#07060B] py-12 sm:py-16 text-xs text-zinc-500 dark:text-zinc-400 font-lexend">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Column 1: Brand & Overview */}
          <div className="col-span-2 space-y-3.5">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="relative size-9.5 shrink-0 rounded-lg overflow-hidden flex items-center justify-center bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-white/[0.1] shadow-2xs">
                <Image
                  src="/favicon.svg"
                  alt="EchoGPT"
                  width={38}
                  height={38}
                  className="size-9.5 object-contain"
                />
              </div>
              <span className="font-bold leading-none text-[22px] tracking-[6px] bg-linear-to-r from-brand to-secondary bg-clip-text text-transparent">
                EchoGPT
              </span>
            </Link>

            <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-sm leading-relaxed font-normal">
              A unified productivity and creation ecosystem bringing multi-model
              intelligence, creative studios, AI tasks, and live MCP tools into one workspace.
            </p>

            <div className="flex items-center gap-2 pt-1" role="list" aria-label="Official Social Profiles">
              {SOCIAL_LINKS.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`EchoGPT on ${item.name}`}
                    title={`Follow EchoGPT on ${item.name}`}
                    className={`size-8.5 rounded-xl flex items-center justify-center bg-white dark:bg-white/[0.04] border border-zinc-200/80 dark:border-white/8 text-zinc-500 dark:text-zinc-400 shadow-2xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xs motion-reduce:hover:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#713CF4] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#07060B] ${item.hoverClass}`}
                  >
                    <Icon className="size-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2: Workspaces */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
              Workspaces
            </h4>
            <ul className="space-y-2 font-normal">
              <li>
                <Link href="/chat" className="hover:text-primary dark:hover:text-zinc-200 transition-colors">
                  AI Chat
                </Link>
              </li>
              <li>
                <Link href="/image-studio" className="hover:text-primary dark:hover:text-zinc-200 transition-colors">
                  Image Studio
                </Link>
              </li>
              <li>
                <Link href="/video-studio" className="hover:text-primary dark:hover:text-zinc-200 transition-colors">
                  Video Studio
                </Link>
              </li>
              <li>
                <Link href="/compare" className="hover:text-primary dark:hover:text-zinc-200 transition-colors">
                  Model Compare
                </Link>
              </li>
              <li>
                <Link href="/connectors" className="hover:text-primary dark:hover:text-zinc-200 transition-colors">
                  MCP Connectors
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Productivity Tools */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
              Productivity
            </h4>
            <ul className="space-y-2 font-normal">
              <li>
                <Link href="/tasks" className="hover:text-primary dark:hover:text-zinc-200 transition-colors">
                  AI Tasks Library
                </Link>
              </li>
              <li>
                <Link href="/resume" className="hover:text-primary dark:hover:text-zinc-200 transition-colors">
                  AI Job Analysis
                </Link>
              </li>
              <li>
                <Link href="/sop" className="hover:text-primary dark:hover:text-zinc-200 transition-colors">
                  AI SOP Builder
                </Link>
              </li>
              <li>
                <Link href="/history" className="hover:text-primary dark:hover:text-zinc-200 transition-colors">
                  Conversation History
                </Link>
              </li>
              <li>
                <Link href="/store" className="hover:text-primary dark:hover:text-zinc-200 transition-colors">
                  Model Store
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Platform & Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
              Platform
            </h4>
            <ul className="space-y-2 font-normal">
              <li>
                <Link href="/subscriptions" className="hover:text-primary dark:hover:text-zinc-200 transition-colors">
                  Pricing & Pro
                </Link>
              </li>
              <li>
                <Link href="/support" className="hover:text-primary dark:hover:text-zinc-200 transition-colors">
                  Support Center
                </Link>
              </li>
              <li>
                <Link href="/newsletter" className="hover:text-primary dark:hover:text-zinc-200 transition-colors">
                  AI Newsletter
                </Link>
              </li>
              <li>
                <Link href="/api-platform" className="hover:text-primary dark:hover:text-zinc-200 transition-colors">
                  API Platform
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Platform Links */}
        <div className="pt-8 border-t border-zinc-200/80 dark:border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-400 dark:text-zinc-500">
          <p>© {new Date().getFullYear()} EchoGPT. Built for modern AI productivity & creation.</p>
          <div className="flex items-center gap-4">
            <Link href="/support" className="hover:text-[#713CF4] dark:hover:text-[#a78bfa] transition-colors">
              Support Center
            </Link>
            <span>·</span>
            <Link href="/subscriptions" className="hover:text-[#713CF4] dark:hover:text-[#a78bfa] transition-colors">
              Pricing & Pro
            </Link>
            <span>·</span>
            <Link href="/api-platform" className="hover:text-[#713CF4] dark:hover:text-[#a78bfa] transition-colors">
              API Platform
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
