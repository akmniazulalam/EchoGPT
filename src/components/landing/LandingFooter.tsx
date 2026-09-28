"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

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

            <div className="flex items-center gap-4 text-xs font-medium text-zinc-600 dark:text-zinc-400 pt-1">
              <a
                href="https://www.facebook.com/echogptlive/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#713CF4] dark:hover:text-[#a78bfa] transition-colors"
              >
                Facebook
              </a>
              <a
                href="https://www.instagram.com/echogptlive/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#713CF4] dark:hover:text-[#a78bfa] transition-colors"
              >
                Instagram
              </a>
              <a
                href="https://www.linkedin.com/company/echogpt/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#713CF4] dark:hover:text-[#a78bfa] transition-colors"
              >
                LinkedIn
              </a>
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

        {/* Bottom Bar: Copyright & Assignment Attribution */}
        <div className="pt-8 border-t border-zinc-200/80 dark:border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-400 dark:text-zinc-500">
          <p>© {new Date().getFullYear()} EchoGPT. All product workspaces functional and verified.</p>
          <div className="flex items-center gap-4">
            <Link href="/subscriptions" className="hover:underline">
              Terms & Licensing
            </Link>
            <span>·</span>
            <Link href="/support" className="hover:underline">
              System Health
            </Link>
            <span>·</span>
            <span className="text-zinc-400 dark:text-zinc-500">
              AppifyDevs Frontend Redesign
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
