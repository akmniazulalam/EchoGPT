"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Zap,
  Layers,
  Film,
  Bot,
  ShieldCheck,
} from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { showToast } from "@/components/ui/Toast";
import { useUpgradeModal } from "@/context/UpgradeModalContext";

export function UpgradeProModal() {
  const { isOpen, featureReason, closeUpgradeModal } = useUpgradeModal();
  const [billingCycle, setBillingCycle] = useState<"annual" | "monthly">(
    "annual"
  );
  const [isProcessing, setIsProcessing] = useState(false);

  const benefits = [
    {
      icon: Bot,
      title: "All Flagship AI Models",
      desc: "Instant access to GPT-5, Claude Opus, Gemini Advanced, DeepSeek R1 & Grok 4.",
    },
    {
      icon: Layers,
      title: "Image Studio Pro",
      desc: "Generate 4K resolution images with unlimited batch rendering and Octane 3D styles.",
    },
    {
      icon: Film,
      title: "Video Studio Pro",
      desc: "Create up to 10-second cinematic scenes with full camera trajectory control.",
    },
    {
      icon: Zap,
      title: "Maximum Compute & Zero Queues",
      desc: "Dedicated high-speed inference pipeline with 10x higher rate limits.",
    },
  ];

  const handleSimulateUpgrade = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      closeUpgradeModal();
      showToast("Welcome to EchoGPT Pro! All Pro features unlocked.", "success");
    }, 900);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeUpgradeModal}
      maxWidth="lg"
      showCloseButton={true}
    >
      <div className="space-y-5">
        {/* Header with Sparkles */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center size-12 rounded-2xl bg-[#713CF4]/10 dark:bg-[#713CF4]/20 text-[#713CF4] dark:text-[#a78bfa] border border-[#713CF4]/25 mx-auto">
            <Sparkles className="size-6" />
          </div>

          <div>
            <div className="flex items-center justify-center gap-2">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                Supercharge with EchoGPT Pro
              </h2>
              <Badge variant="pro">PRO</Badge>
            </div>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-md mx-auto mt-1">
              Unlock the full power of state-of-the-art AI intelligence, creative
              multimodal studios, and unlimited productivity workflows.
            </p>
          </div>

          {/* Contextual trigger reason if opened from a specific action */}
          {featureReason && (
            <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-[#713CF4]/20 text-xs text-[#713CF4] dark:text-[#c4b5fd] font-medium text-center">
              {featureReason}
            </div>
          )}
        </div>

        {/* Billing Switcher (Annual vs Monthly) */}
        <div className="flex items-center justify-center p-1 bg-zinc-100 dark:bg-zinc-850 rounded-xl max-w-xs mx-auto text-xs">
          <button
            type="button"
            onClick={() => setBillingCycle("annual")}
            className={`flex-1 py-1.5 px-3 rounded-lg font-medium transition-all cursor-pointer ${
              billingCycle === "annual"
                ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-2xs"
                : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900"
            }`}
          >
            Annual <span className="text-[#713CF4] font-semibold">(Save 20%)</span>
          </button>
          <button
            type="button"
            onClick={() => setBillingCycle("monthly")}
            className={`flex-1 py-1.5 px-3 rounded-lg font-medium transition-all cursor-pointer ${
              billingCycle === "monthly"
                ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-2xs"
                : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900"
            }`}
          >
            Monthly
          </button>
        </div>

        {/* Pricing Display */}
        <div className="text-center p-4 rounded-xl bg-zinc-50 dark:bg-[#161720] border border-zinc-200/80 dark:border-zinc-800">
          <div className="flex items-baseline justify-center gap-1.5">
            <span className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
              {billingCycle === "annual" ? "$16" : "$20"}
            </span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              / user / month
            </span>
          </div>
          <p className="text-[11px] text-zinc-400 dark:text-zinc-500 mt-0.5">
            {billingCycle === "annual"
              ? "Billed annually ($192/yr). Cancel anytime."
              : "Billed monthly. Cancel anytime."}
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {benefits.map((b, i) => {
            const Icon = b.icon;
            return (
              <div
                key={i}
                className="flex items-start gap-3 p-3 rounded-xl bg-white dark:bg-[#161720] border border-zinc-200/60 dark:border-zinc-800/80"
              >
                <div className="p-2 rounded-lg bg-[#713CF4]/10 dark:bg-[#713CF4]/20 text-[#713CF4] dark:text-[#a78bfa] shrink-0 mt-0.5">
                  <Icon className="size-4" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-[13px] font-semibold text-zinc-900 dark:text-zinc-100 leading-snug">
                    {b.title}
                  </h4>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed mt-0.5">
                    {b.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Actions */}
        <div className="space-y-2 pt-2">
          <Button
            variant="primary"
            size="lg"
            className="w-full text-sm font-semibold tracking-tight shadow-md"
            isLoading={isProcessing}
            onClick={handleSimulateUpgrade}
          >
            <Sparkles className="size-4 mr-1.5" />
            Upgrade to Pro Now
          </Button>

          <button
            type="button"
            onClick={closeUpgradeModal}
            className="w-full text-center text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 py-1.5 cursor-pointer outline-none"
          >
            Maybe later
          </button>
        </div>

        {/* Safe guarantee note */}
        <div className="flex items-center justify-center gap-1.5 text-[11px] text-zinc-400 dark:text-zinc-500 border-t border-zinc-100 dark:border-zinc-850 pt-3">
          <ShieldCheck className="size-3.5 text-emerald-500" />
          <span>7-day risk-free money-back guarantee. No questions asked.</span>
        </div>
      </div>
    </Modal>
  );
}
