"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Zap,
  Film,
  Bot,
  ShieldCheck,
  MessageSquareText,
  Users,
  CheckCircle2,
  Lightbulb,
  FileText,
  FileSearch,
  PenTool,
  Languages,
  Code2,
  Globe,
  ImageIcon,
  Eye,
  Cpu,
  Layers,
  Check,
} from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { showToast } from "@/components/ui/Toast";
import { useUpgradeModal } from "@/context/UpgradeModalContext";

type BillingCycle = "monthly" | "quarterly" | "semi-annual" | "annual";

interface BillingPlan {
  id: BillingCycle;
  label: string;
  pricePerMonth: string;
  originalPrice?: string;
  billedNote: string;
  discountBadge?: string;
  highlight: string;
}

const BILLING_PLANS: Record<BillingCycle, BillingPlan> = {
  monthly: {
    id: "monthly",
    label: "Monthly",
    pricePerMonth: "$9.99",
    billedNote: "Billed monthly. Cancel anytime.",
    highlight: "Monthly Plan",
  },
  quarterly: {
    id: "quarterly",
    label: "Quarterly",
    pricePerMonth: "$8.99",
    originalPrice: "$9.99",
    billedNote: "Billed $26.97 every 3 months. Cancel anytime.",
    discountBadge: "Save 10%",
    highlight: "Quarterly Plan",
  },
  "semi-annual": {
    id: "semi-annual",
    label: "Semi-Annual",
    pricePerMonth: "$7.99",
    originalPrice: "$9.99",
    billedNote: "Billed $47.94 every 6 months. Cancel anytime.",
    discountBadge: "Save 20%",
    highlight: "Semi-Annual Plan",
  },
  annual: {
    id: "annual",
    label: "Annual",
    pricePerMonth: "$6.99",
    originalPrice: "$9.99",
    billedNote: "Billed $83.88 annually ($6.99/mo). Cancel anytime.",
    discountBadge: "Save 30%",
    highlight: "Annual Plan — Best Value",
  },
};

interface ShowcaseModel {
  name: string;
  provider: string;
  tag: string;
  icon: React.ElementType;
}

const SHOWCASE_MODELS: ShowcaseModel[] = [
  {
    name: "DeepSeek V4 Pro",
    provider: "DeepSeek",
    tag: "Reasoning",
    icon: Sparkles,
  },
  { name: "GLM-5.2", provider: "Zhipu AI", tag: "Frontier", icon: Cpu },
  { name: "MiMo V2.5 Pro", provider: "Xiaomi", tag: "Vision", icon: Layers },
  {
    name: "Qwen 3.7 Plus",
    provider: "Alibaba",
    tag: "Math & Code",
    icon: Code2,
  },
  { name: "GPT-5.6 Sol", provider: "OpenAI", tag: "Frontier", icon: Bot },
  {
    name: "GLM-5.3 Flash",
    provider: "Zhipu AI",
    tag: "Low Latency",
    icon: Zap,
  },
  { name: "Qwen 3.8 27B", provider: "Alibaba", tag: "Open Weights", icon: Cpu },
  {
    name: "Kimi K3",
    provider: "Moonshot",
    tag: "200K Context",
    icon: Sparkles,
  },
  { name: "MiniMax M3", provider: "MiniMax", tag: "Multimodal", icon: Layers },
];

const FEATURE_CATEGORIES = [
  {
    category: "Chat",
    items: [
      {
        name: "AI Chat",
        desc: "Chat with AI-powered models",
        icon: MessageSquareText,
        color: "text-[#713CF4] bg-[#713CF4]/10 dark:bg-[#713CF4]/20",
      },
      {
        name: "AI Characters",
        desc: "Talk to famous personas",
        icon: Users,
        color: "text-indigo-500 bg-indigo-500/10 dark:bg-indigo-500/20",
      },
      {
        name: "AI Tasks",
        desc: "Quick tips and suggestions",
        icon: CheckCircle2,
        color: "text-emerald-500 bg-emerald-500/10 dark:bg-emerald-500/20",
      },
      {
        name: "Brainstorming",
        desc: "Generate creative ideas",
        icon: Lightbulb,
        color: "text-amber-500 bg-amber-500/10 dark:bg-amber-500/20",
      },
    ],
  },
  {
    category: "Content",
    items: [
      {
        name: "ChatDoc",
        desc: "Interact with your documents",
        icon: FileText,
        color: "text-blue-500 bg-blue-500/10 dark:bg-blue-500/20",
      },
      {
        name: "Content Summary",
        desc: "Get quick summaries",
        icon: FileSearch,
        color: "text-teal-500 bg-teal-500/10 dark:bg-teal-500/20",
      },
      {
        name: "Content Editing",
        desc: "Proofread and refine text",
        icon: PenTool,
        color: "text-orange-500 bg-orange-500/10 dark:bg-orange-500/20",
      },
      {
        name: "Language Translator",
        desc: "Translate languages instantly",
        icon: Languages,
        color: "text-sky-500 bg-sky-500/10 dark:bg-sky-500/20",
      },
      {
        name: "Code Generation",
        desc: "Write and debug code",
        icon: Code2,
        color: "text-purple-500 bg-purple-500/10 dark:bg-purple-500/20",
      },
      {
        name: "Web Search",
        desc: "Fetch live info from the web",
        icon: Globe,
        color: "text-cyan-500 bg-cyan-500/10 dark:bg-cyan-500/20",
        badge: "Coming Soon",
      },
    ],
  },
  {
    category: "Image & Video",
    items: [
      {
        name: "Text to Image",
        desc: "Create 4K images from text prompts",
        icon: ImageIcon,
        color: "text-pink-500 bg-pink-500/10 dark:bg-pink-500/20",
        badge: "Image Studio",
      },
      {
        name: "Ask Image",
        desc: "Ask questions about images & visuals",
        icon: Eye,
        color: "text-rose-500 bg-rose-500/10 dark:bg-rose-500/20",
        badge: "Multimodal",
      },
      {
        name: "Video Studio",
        desc: "Cinematic scenes with camera motion",
        icon: Film,
        color: "text-[#713CF4] bg-[#713CF4]/10 dark:bg-[#713CF4]/20",
        badge: "PRO Studio",
      },
    ],
  },
];

export function UpgradeProModal() {
  const { isOpen, featureReason, closeUpgradeModal } = useUpgradeModal();
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");
  const [isProcessing, setIsProcessing] = useState(false);

  const currentPlan = BILLING_PLANS[billingCycle];

  const handleSimulateUpgrade = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      closeUpgradeModal();
      showToast(
        `Welcome to EchoGPT Pro! Subscribed to ${currentPlan.label} plan.`,
        "success",
      );
    }, 900);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeUpgradeModal}
      maxWidth="5xl"
      showCloseButton={true}
      className="p-0 border-zinc-200/90 dark:border-white/[0.08]"
      bodyClassName="p-4 sm:p-6 lg:p-7 overflow-y-auto">
      <div className="space-y-6">
        {/* Modal Header */}
        <div className="text-center space-y-2 relative pt-1 sm:pt-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#713CF4]/10 dark:bg-[#713CF4]/20 text-[#713CF4] dark:text-[#c4b5fd] border border-[#713CF4]/20 text-xs font-semibold mb-1">
            <Sparkles className="size-3.5" />
            <span>EchoGPT Premium</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Upgrade your plan
          </h2>

          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-lg mx-auto leading-relaxed">
            Want to get more out of EchoGPT? Subscribe to one of our
            professional plans.
          </p>

          {/* Contextual trigger reason banner if opened from a specific action */}
          {featureReason && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-[#713CF4]/25 text-xs text-[#713CF4] dark:text-[#c4b5fd] font-medium mx-auto animate-in fade-in">
              <Sparkles className="size-3 shrink-0" />
              <span>{featureReason}</span>
            </div>
          )}
        </div>

        {/* Main 2-Column Responsive Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-start">
          {/* Left Column: Unlock All Premium Features (7 cols desktop, 2nd on mobile) */}
          <div className="order-2 lg:order-1 lg:col-span-7 rounded-2xl border border-zinc-200/80 dark:border-white/[0.08] bg-zinc-50/60 dark:bg-white/[0.02] p-4 sm:p-5 flex flex-col justify-between space-y-5">
            <div>
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-200/60 dark:border-white/[0.06]">
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                    Unlock all premium features
                  </h3>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                    Everything you need for advanced intelligence, creativity,
                    and workflow automation.
                  </p>
                </div>
                <Badge variant="pro" size="sm">
                  UNLIMITED
                </Badge>
              </div>

              {/* Categorized Features */}
              <div className="space-y-4">
                {FEATURE_CATEGORIES.map((cat) => (
                  <div key={cat.category} className="space-y-2">
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 px-0.5">
                      {cat.category}
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
                      {cat.items.map((item) => {
                        const Icon = item.icon;
                        return (
                          <div
                            key={item.name}
                            className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white dark:bg-[#161520] border border-zinc-200/60 dark:border-white/[0.06] hover:border-[#713CF4]/30 dark:hover:border-[#713CF4]/40 transition-colors group">
                            <div
                              className={`size-7.5 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-transform group-hover:scale-105 ${item.color}`}>
                              <Icon className="size-4" />
                            </div>

                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-1.5">
                                <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 leading-tight truncate">
                                  {item.name}
                                </span>
                                {item.badge && (
                                  <span className="text-[9.5px] font-medium px-1.5 py-0.2 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border border-zinc-200/60 dark:border-white/[0.06] shrink-0">
                                    {item.badge}
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-snug mt-0.5 line-clamp-1">
                                {item.desc}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom highlight pill */}
            <div className="pt-2 border-t border-zinc-200/60 dark:border-white/[0.06] flex items-center justify-between text-[11px] text-zinc-500 dark:text-zinc-400">
              <span className="flex items-center gap-1">
                <Check className="size-3.5 text-emerald-500" />
                Priority access during peak traffic
              </span>
              <span className="flex items-center gap-1">
                <Check className="size-3.5 text-emerald-500" />
                Dedicated inference pipelines
              </span>
            </div>
          </div>

          {/* Right Column: Billing Selector, Models Showcase, Pricing, CTA (5 cols desktop, 1st on mobile) */}
          <div className="order-1 lg:order-2 lg:col-span-5 flex flex-col space-y-4">
            {/* Billing Period Selector Tabs */}
            <div className="p-1 rounded-xl bg-zinc-100/90 dark:bg-white/[0.04] border border-zinc-200/80 dark:border-white/[0.06] grid grid-cols-2 sm:grid-cols-4 gap-1">
              {(
                [
                  "monthly",
                  "quarterly",
                  "semi-annual",
                  "annual",
                ] as BillingCycle[]
              ).map((cycleKey) => {
                const plan = BILLING_PLANS[cycleKey];
                const isActive = billingCycle === cycleKey;
                return (
                  <button
                    key={cycleKey}
                    type="button"
                    onClick={() => setBillingCycle(cycleKey)}
                    className={`relative py-2 px-2 rounded-lg text-xs font-medium transition-colors duration-300 ease-in-out flex flex-col items-center justify-center gap-0.5 cursor-pointer select-none outline-none border ${
                      isActive
                        ? "bg-white dark:bg-[#1e1c2a] text-zinc-900 dark:text-white shadow-xs font-semibold border-zinc-200/80 dark:border-white/10"
                        : "border-transparent text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
                    }`}>
                    <span>{plan.label}</span>
                    {plan.discountBadge && (
                      <span
                        className={`text-[9px] font-semibold px-1 rounded-sm leading-tight ${
                          isActive
                            ? "bg-[#713CF4]/15 text-[#713CF4] dark:text-[#c4b5fd]"
                            : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                        }`}>
                        {plan.discountBadge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* AI Models Showcase Box */}
            <div className="rounded-2xl border border-zinc-200/80 dark:border-white/[0.08] bg-white dark:bg-[#161520] p-3.5 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                  Included Frontier AI Models
                </span>
                <span className="text-[10px] font-semibold text-[#713CF4] dark:text-[#a78bfa] px-1.5 py-0.5 rounded-md bg-[#713CF4]/10 dark:bg-[#713CF4]/20 border border-[#713CF4]/20">
                  {SHOWCASE_MODELS.length}+ Models
                </span>
              </div>

              {/* Models Compact Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-1.5 max-h-[175px] overflow-y-auto custom-scrollbar pr-1">
                {SHOWCASE_MODELS.map((m) => {
                  const Icon = m.icon;
                  return (
                    <div
                      key={m.name}
                      className="flex items-center justify-between py-1 px-2 rounded-lg bg-zinc-50/80 dark:bg-white/[0.02] border border-zinc-200/50 dark:border-white/[0.04] text-xs">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <Icon className="size-3.5 text-[#713CF4] dark:text-[#a78bfa] shrink-0" />
                        <span className="font-medium text-zinc-900 dark:text-zinc-100 truncate text-[11.5px]">
                          {m.name}
                        </span>
                      </div>
                      <span className="text-[10px] text-zinc-400 dark:text-zinc-500 shrink-0 font-normal">
                        {m.tag}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Plan Description & Pricing Card */}
            <div className="rounded-2xl border border-[#713CF4]/25 dark:border-[#713CF4]/30 bg-gradient-to-b from-[#713CF4]/[0.04] to-transparent dark:from-[#713CF4]/[0.08] dark:to-transparent p-4 space-y-3.5">
              <div>
                <p className="text-[11.5px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  Experience the benefits of Pro membership with unlimited
                  chats, full access to frontier reasoning models, and creative
                  studios.
                </p>

                <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-[#713CF4] dark:text-[#c4b5fd]">
                  <Sparkles className="size-3.5" />
                  <span>✦ {currentPlan.highlight}</span>
                </div>
              </div>

              {/* Price Row */}
              <div className="pt-2 border-t border-zinc-200/60 dark:border-white/[0.06]">
                <div className="flex items-baseline gap-2">
                  <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                    USD
                  </span>
                  <span className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
                    {currentPlan.pricePerMonth}
                  </span>
                  {currentPlan.originalPrice && (
                    <span className="text-sm text-zinc-400 dark:text-zinc-500 line-through">
                      {currentPlan.originalPrice}
                    </span>
                  )}
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">
                    / month
                  </span>
                </div>

                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                  {currentPlan.billedNote}
                </p>
              </div>

              {/* Upgrade Button */}
              <div className="space-y-2 pt-1">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full text-sm font-semibold tracking-tight shadow-md hover:shadow-lg hover:shadow-[#713CF4]/20 transition-all cursor-pointer h-11"
                  isLoading={isProcessing}
                  onClick={handleSimulateUpgrade}>
                  <Sparkles className="size-4 mr-1.5" />
                  Upgrade Now
                </Button>

                <button
                  type="button"
                  onClick={closeUpgradeModal}
                  className="w-full text-center text-xs text-zinc-400 dark:text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 py-1 transition-colors cursor-pointer outline-none">
                  Maybe later
                </button>
              </div>
            </div>

            {/* Trust and Safety Guarantee */}
            <div className="flex items-center justify-center gap-1.5 text-[11px] text-zinc-400 dark:text-zinc-500 text-center px-1">
              <ShieldCheck className="size-3.5 text-emerald-500 shrink-0" />
              <span>7-day risk-free money-back guarantee • Cancel anytime</span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
