"use client";

import React from "react";
import { Mail, ArrowRight, MessageCircle, Clock } from "lucide-react";
import { WorkspaceHeader } from "@/components/workspace/WorkspaceHeader";

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
    handle: "@echogptlive",
    href: "https://www.facebook.com/echogptlive/",
    icon: FacebookIcon,
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-950/30",
    border: "border-blue-100 dark:border-blue-900/40",
    hoverBorder: "hover:border-blue-300 dark:hover:border-blue-700",
  },
  {
    name: "Instagram",
    handle: "@echogptlive",
    href: "https://www.instagram.com/echogptlive/",
    icon: InstagramIcon,
    color: "text-pink-600 dark:text-pink-400",
    bg: "bg-pink-50 dark:bg-pink-950/30",
    border: "border-pink-100 dark:border-pink-900/40",
    hoverBorder: "hover:border-pink-300 dark:hover:border-pink-700",
  },
  {
    name: "LinkedIn",
    handle: "EchoGPT",
    href: "https://www.linkedin.com/company/echogpt/",
    icon: LinkedInIcon,
    color: "text-sky-600 dark:text-sky-400",
    bg: "bg-sky-50 dark:bg-sky-950/30",
    border: "border-sky-100 dark:border-sky-900/40",
    hoverBorder: "hover:border-sky-300 dark:hover:border-sky-700",
  },
];

export function SupportWorkspace() {
  return (
    <div className="flex flex-col flex-1 h-full min-h-0 bg-[#FAFAFC] dark:bg-[#0E0C15] text-zinc-900 dark:text-zinc-100 font-lexend">
      <WorkspaceHeader
        title="Support"
        breadcrumbs={[{ label: "Workspace" }, { label: "Support" }]}
        subtitle="We're here to help — reach out anytime"
      />

      <div className="flex-1 overflow-y-auto min-h-0 custom-scrollbar">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-10">

          {/* Hero */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center size-14 rounded-2xl bg-[#713CF4]/10 border border-[#713CF4]/20 mx-auto">
              <MessageCircle className="size-7 text-[#713CF4]" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
              Talk with our team
            </h1>
            <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400 max-w-md mx-auto font-normal leading-relaxed">
              Have a question about your account, billing, or a feature request? We{"'"}re
              happy to help — choose the channel that works best for you.
            </p>
          </div>

          {/* Email Card — Primary, more emphasis */}
          <a
            href="mailto:appifydevs@gmail.com"
            className="group block p-6 sm:p-8 rounded-2xl border-2 border-[#713CF4]/30 dark:border-[#713CF4]/40 bg-white dark:bg-[#111217] shadow-sm hover:border-[#713CF4]/70 hover:shadow-[0_0_0_4px_rgba(113,60,244,0.08)] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#713CF4] focus-visible:ring-offset-2"
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-5">
              <div className="shrink-0 size-14 rounded-2xl bg-[#713CF4]/10 border border-[#713CF4]/20 flex items-center justify-center group-hover:bg-[#713CF4]/20 transition-colors">
                <Mail className="size-7 text-[#713CF4]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-50">
                    Email Us
                  </h2>
                  <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-[#713CF4]/10 text-[#713CF4] dark:text-[#a78bfa] font-medium border border-[#713CF4]/20">
                    Recommended
                  </span>
                </div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 font-normal leading-relaxed">
                  Send us a detailed message and we{"'"}ll respond within one business day.
                </p>
                <p className="mt-2 text-sm font-semibold text-[#713CF4] dark:text-[#a78bfa] break-all">
                  appifydevs@gmail.com
                </p>
              </div>
              <div className="shrink-0 flex items-center gap-1.5 text-xs font-medium text-zinc-500 dark:text-zinc-400 group-hover:text-[#713CF4] dark:group-hover:text-[#a78bfa] transition-colors">
                <Clock className="size-3.5" />
                <span>~1 day response</span>
                <ArrowRight className="size-3.5 translate-x-0 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </a>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800" />
            <span className="text-xs text-zinc-400 dark:text-zinc-500 font-medium uppercase tracking-wider">
              or find us on social
            </span>
            <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800" />
          </div>

          {/* Social Links Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {SOCIAL_LINKS.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex flex-col items-center gap-3 p-5 rounded-2xl border bg-white dark:bg-[#111217] ${social.border} ${social.hoverBorder} shadow-sm hover:shadow-md transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#713CF4] focus-visible:ring-offset-2`}
                >
                  <div
                    className={`size-11 rounded-xl ${social.bg} border ${social.border} flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}
                  >
                    <Icon className={`size-5 ${social.color}`} />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                      {social.name}
                    </p>
                    <p className={`text-xs font-medium mt-0.5 ${social.color}`}>
                      {social.handle}
                    </p>
                  </div>
                  <span className={`text-[11px] font-medium flex items-center gap-1 ${social.color} opacity-0 group-hover:opacity-100 transition-opacity`}>
                    Follow us <ArrowRight className="size-3" />
                  </span>
                </a>
              );
            })}
          </div>

          {/* Footer note */}
          <p className="text-center text-xs text-zinc-400 dark:text-zinc-500 font-normal leading-relaxed pb-4">
            For urgent billing issues or account security concerns, email is always the fastest path.
            <br />
            We typically respond within one business day.
          </p>
        </div>
      </div>
    </div>
  );
}
