"use client";

import React from "react";
import { Sparkles, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { useUpgradeModal } from "@/context/UpgradeModalContext";

interface UpgradeCardProps {
  isCollapsed?: boolean;
  onUpgrade?: () => void;
}

export function UpgradeCard({
  isCollapsed = false,
  onUpgrade,
}: UpgradeCardProps) {
  const { isProUser } = useUpgradeModal();

  if (isCollapsed) {
    return (
      <div className="flex justify-center p-1">
        <button
          type="button"
          onClick={onUpgrade}
          className={`group relative flex items-center justify-center size-10 rounded-lg transition-all duration-150 outline-none focus-visible:ring-2 focus-visible:ring-[#713CF4] focus-visible:ring-offset-2 ${
            isProUser
              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500 hover:text-white"
              : "bg-[#713CF4]/10 dark:bg-[#713CF4]/15 text-[#713CF4] hover:bg-[#713CF4] hover:text-white"
          }`}
          title={isProUser ? "EchoGPT Pro Active" : "Upgrade to Pro"}
          aria-label={isProUser ? "EchoGPT Pro Active" : "Upgrade to Pro"}
        >
          {isProUser ? (
            <CheckCircle2 className="size-4.5 transition-transform duration-150 group-hover:scale-110" />
          ) : (
            <Sparkles className="size-4.5 transition-transform duration-150 group-hover:scale-110" />
          )}
        </button>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-xl border border-zinc-200/80 dark:border-zinc-800/90 bg-linear-to-b from-white to-zinc-50/80 dark:from-zinc-900/80 dark:to-zinc-900/40 p-3.5 shadow-xs">
      {/* Subtle brand ambient accent */}
      <div
        className={`pointer-events-none absolute -right-6 -top-6 size-20 rounded-full blur-xl ${
          isProUser ? "bg-emerald-500/10" : "bg-[#713CF4]/8 dark:bg-[#713CF4]/12"
        }`}
        aria-hidden="true"
      />

      <div className="flex items-center gap-2.5 mb-2">
        <div
          className={`flex size-7 items-center justify-center rounded-lg ${
            isProUser
              ? "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400"
              : "bg-[#713CF4]/10 text-[#713CF4] dark:bg-[#713CF4]/20 dark:text-[#a78bfa]"
          }`}
        >
          {isProUser ? <CheckCircle2 className="size-3.5" /> : <Sparkles className="size-3.5" />}
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight">
            {isProUser ? "EchoGPT Pro Active" : "EchoGPT Pro"}
          </span>
          <span
            className={`rounded px-1 py-0.2 text-[9px] font-bold uppercase tracking-wider ${
              isProUser
                ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                : "bg-[#713CF4]/15 text-[#713CF4]"
            }`}
          >
            {isProUser ? "ACTIVE" : "PRO"}
          </span>
        </div>
      </div>

      <p className="text-[12px] leading-relaxed text-zinc-500 dark:text-zinc-400 mb-3 font-normal">
        {isProUser
          ? "All 36+ frontier models, multimodal uploads, and studio tools are unlocked."
          : "Unlock Pro creation studios, advanced models, and faster workflows."}
      </p>

      <button
        type="button"
        onClick={onUpgrade}
        className={`w-full inline-flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium tracking-tight shadow-xs transition-colors duration-150 outline-none focus-visible:ring-2 focus-visible:ring-offset-1 cursor-pointer ${
          isProUser
            ? "border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-700 focus-visible:ring-[#713CF4]"
            : "bg-[#713CF4] hover:bg-[#602ee0] active:bg-[#5223c7] text-white focus-visible:ring-[#713CF4]"
        }`}
        aria-label={isProUser ? "Manage EchoGPT Pro Plan" : "Upgrade to EchoGPT Pro"}
      >
        <span>{isProUser ? "Manage Plan" : "Upgrade Plan"}</span>
        <ArrowUpRight className="size-3.5" />
      </button>
    </div>
  );
}
