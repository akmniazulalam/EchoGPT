"use client";

import React from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { useUpgradeModal } from "@/context/UpgradeModalContext";

export function LandingPricingSection() {
  const { isProUser, openUpgradeModal } = useUpgradeModal();

  return (
    <section id="pricing" className="py-20 sm:py-28 scroll-mt-16 bg-zinc-50/50 dark:bg-white/[0.015]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#713CF4] dark:text-[#a78bfa]">
            Transparent Plans
          </p>
          <h2 className="text-2xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
            Start free, upgrade for frontier power
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 font-normal">
            No credit card required to start. Frontend demo environment includes 1-click Pro simulation.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch max-w-4xl mx-auto">
          {/* ── 1. FREE PLAN ── */}
          <div className="flex flex-col justify-between p-6 sm:p-7 rounded-2xl border border-zinc-200/80 dark:border-white/[0.08] bg-white dark:bg-[#12111A] space-y-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  Free Tier
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                  Core AI chat and rapid creative generation for individuals.
                </p>
              </div>

              <div className="flex items-baseline gap-1">
                <span className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-50">
                  $0
                </span>
                <span className="text-xs text-zinc-400">/ forever free</span>
              </div>

              <ul className="space-y-2.5 pt-2 border-t border-zinc-100 dark:border-white/[0.06] text-xs sm:text-[13px] text-zinc-600 dark:text-zinc-300">
                <li className="flex items-start gap-2.5">
                  <Check className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>EchoGPT, Gemini Flash 2.0 & DeepSeek-V3</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>SDXL Turbo real-time image drafting</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Veo 3.1 fast video generation</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>1 Active MCP connector</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Side-by-side compare (2 models)</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Full conversation history & persistence</span>
                </li>
              </ul>
            </div>

            <Link
              href="/chat"
              className="block text-center py-3 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-white/[0.05] dark:hover:bg-white/[0.09] text-zinc-800 dark:text-zinc-200 font-semibold text-xs transition-colors"
            >
              Start Free Workspace
            </Link>
          </div>

          {/* ── 2. PRO PLAN ── */}
          <div className="relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl border border-[#713CF4] bg-white dark:bg-[#12111A] space-y-6 shadow-xl shadow-[#713CF4]/10 ring-1 ring-[#713CF4]/30">
            {/* Badge */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="px-3 py-1 rounded-full bg-[#713CF4] text-white text-[10.5px] font-bold shadow-xs">
                {isProUser ? "EchoGPT Pro Active" : "Full Access"}
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  EchoGPT Pro
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                  Every frontier model, studio engine, and tool connector unlocked.
                </p>
              </div>

              <div className="flex items-baseline gap-1">
                <span className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-50">
                  $9.99
                </span>
                <span className="text-xs text-zinc-400">/ month</span>
              </div>

              <ul className="space-y-2.5 pt-2 border-t border-zinc-100 dark:border-white/[0.06] text-xs sm:text-[13px] text-zinc-600 dark:text-zinc-300">
                <li className="flex items-start gap-2.5 font-medium text-zinc-900 dark:text-zinc-100">
                  <Check className="size-4 text-[#713CF4] shrink-0 mt-0.5" />
                  <span>Every Frontier Model (GPT-5, Claude 3.7, Grok 3, o3)</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="size-4 text-[#713CF4] shrink-0 mt-0.5" />
                  <span>FLUX Pro 4K, DALL-E 3 & Midjourney v6</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="size-4 text-[#713CF4] shrink-0 mt-0.5" />
                  <span>Sora, Kling & Runway Gen-3 AI Video</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="size-4 text-[#713CF4] shrink-0 mt-0.5" />
                  <span>Unlimited MCP Connectors & Tools</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="size-4 text-[#713CF4] shrink-0 mt-0.5" />
                  <span>Full 24 AI Tasks Library, Resume & SOP Builders</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="size-4 text-[#713CF4] shrink-0 mt-0.5" />
                  <span>Priority generation queue & multi-model compare</span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              onClick={() => openUpgradeModal("Upgrade to EchoGPT Pro to unlock all frontier models and studios.")}
              className="block w-full text-center py-3 rounded-xl bg-[#713CF4] hover:bg-[#602ee0] active:bg-[#5223c7] text-white font-semibold text-xs transition-all shadow-sm shadow-[#713CF4]/20 cursor-pointer"
            >
              {isProUser ? "Manage Pro Subscription" : "Start Pro Trial / Demo"}
            </button>
          </div>
        </div>

        {/* Demo Environment Transparency Note */}
        <p className="text-center text-xs text-zinc-400 dark:text-zinc-500 max-w-lg mx-auto leading-relaxed">
          Demo Notice: This application is an evaluation project. Pro tier features can be
          activated instantly via the interactive simulator without real credit card charges.
        </p>
      </div>
    </section>
  );
}
