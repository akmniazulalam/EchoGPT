"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Zap,
  Film,
  Bot,
  ShieldCheck,
  CreditCard,
  Building2,
  CheckCircle2,
  Code2,
  ArrowLeft,
  RotateCcw,
  Check,
  Layers,
  Cpu,
} from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { showToast } from "@/components/ui/Toast";
import { useUpgradeModal } from "@/context/UpgradeModalContext";

type BillingCycle = "monthly" | "quarterly" | "semi-annual" | "annual";
type PaymentGateway = "international" | "bdt";

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
  { name: "GPT-5", provider: "OpenAI", tag: "Frontier", icon: Bot },
  { name: "Claude 4 Sonnet", provider: "Anthropic", tag: "Coding", icon: Code2 },
  { name: "Gemini Advanced", provider: "Google", tag: "1M Context", icon: Sparkles },
  { name: "DeepSeek R1", provider: "DeepSeek", tag: "Reasoning", icon: Cpu },
  { name: "Grok 4", provider: "xAI", tag: "Compute", icon: Zap },
  { name: "o3 & o4-mini", provider: "OpenAI", tag: "Logic", icon: Bot },
  { name: "Llama 3.1 405B", provider: "Meta", tag: "Open Frontier", icon: Layers },
  { name: "Kimi K2.7 Code", provider: "Moonshot", tag: "256K Repo", icon: Sparkles },
];

const FEATURE_CATEGORIES = [
  {
    category: "Frontier AI Access",
    items: [
      {
        name: "36+ Frontier Models",
        desc: "Unlimited reasoning across GPT-5, Claude, Gemini, DeepSeek & Llama",
        icon: Bot,
        color: "text-purple-600 bg-purple-50 dark:bg-purple-950/40",
        badge: "Uncapped",
      },
      {
        name: "Autonomous Deep Reasoning",
        desc: "DeepSeek R1, OpenAI o3, Gemini 2.5 Pro chain-of-thought",
        icon: Sparkles,
        color: "text-amber-500 bg-amber-50 dark:bg-amber-950/40",
        badge: "CoT Verified",
      },
    ],
  },
  {
    category: "Multimodal & Workflow Studios",
    items: [
      {
        name: "Document & Code Attachments",
        desc: "Attach PDFs, images, spreadsheets, and source repositories directly",
        icon: Layers,
        color: "text-blue-500 bg-blue-50 dark:bg-blue-950/40",
        badge: "Pro Input",
      },
      {
        name: "Image & Video Studios",
        desc: "4K Master synthesis and cinematic camera control pipelines",
        icon: Film,
        color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40",
        badge: "Pro Studios",
      },
    ],
  },
];

export function UpgradeProModal() {
  const {
    isOpen,
    featureReason,
    closeUpgradeModal,
    isProUser,
    activateDemoPro,
    resetDemoPro,
  } = useUpgradeModal();

  const [step, setStep] = useState<"plan" | "payment">("plan");
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");
  const [paymentGateway, setPaymentGateway] = useState<PaymentGateway>("international");
  const [isProcessing, setIsProcessing] = useState(false);

  const currentPlan = BILLING_PLANS[billingCycle];

  const handleClose = () => {
    closeUpgradeModal();
    setTimeout(() => {
      setStep("plan");
      setIsProcessing(false);
    }, 200);
  };

  const handleProceedToPayment = () => {
    setStep("payment");
  };

  const handleCompleteDemoCheckout = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      activateDemoPro();
      handleClose();
      showToast(
        `Demo Pro Mode Activated! (${paymentGateway === "international" ? "Stripe Global" : "BDT Gateway"}) All frontier models and features unlocked.`,
        "success"
      );
    }, 600);
  };

  const handleResetPro = () => {
    resetDemoPro();
    handleClose();
    showToast("EchoGPT Pro demo state has been reset to Free tier.", "info");
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      maxWidth="5xl"
      showCloseButton={true}
      className="p-0 border-zinc-200/90 dark:border-white/[0.08]"
      bodyClassName="p-4 sm:p-6 lg:p-7 overflow-y-auto"
    >
      {/* ── VIEW A: ALREADY PRO ACTIVE ─────────────────────────────────── */}
      {isProUser ? (
        <div className="py-6 px-2 text-center max-w-lg mx-auto space-y-5">
          <div className="size-14 rounded-2xl bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/20 shadow-xs">
            <CheckCircle2 className="size-7" />
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
              <Sparkles className="size-3.5" />
              <span>EchoGPT Pro Active</span>
            </div>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
              You Have Active Pro Access
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-normal">
              Your session is currently running in Demo Pro mode. All 36+ frontier
              models, file attachments, and studio pipelines are unlocked.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/40 text-left text-xs space-y-1.5">
            <div className="flex items-center justify-between text-zinc-700 dark:text-zinc-300 font-medium">
              <span>Subscription Status</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Active (Demo)</span>
            </div>
            <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400">
              <span>Frontier Access</span>
              <span>Unlimited (36 Models)</span>
            </div>
            <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400">
              <span>Attachments & Studios</span>
              <span>Enabled</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleResetPro}
              className="text-xs text-rose-600 dark:text-rose-400 hover:border-rose-300 dark:hover:border-rose-800"
            >
              <RotateCcw className="size-3.5 mr-1.5" />
              Reset Demo to Free Tier
            </Button>

            <Button variant="primary" size="sm" onClick={handleClose}>
              Done
            </Button>
          </div>
        </div>
      ) : step === "payment" ? (
        /* ── VIEW B: STEP 2 – CHOOSE PAYMENT METHOD (MATCHING SCREENSHOT) ─ */
        <div className="max-w-xl mx-auto py-2 space-y-5">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#713CF4]/10 dark:bg-[#713CF4]/20 text-[#713CF4] dark:text-[#c4b5fd] border border-[#713CF4]/20 text-xs font-semibold">
              <CreditCard className="size-3.5" />
              <span>Step 2 of 2 · Payment Method</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              Choose Payment Method
            </h2>

            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-normal">
              Select your preferred gateway for your EchoGPT Pro subscription.
            </p>
          </div>

          {/* Selected Plan Summary Pill */}
          <div className="p-3.5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-[#151620] flex items-center justify-between shadow-2xs">
            <div>
              <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                EchoGPT Pro — {currentPlan.label} Plan
              </span>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                {currentPlan.billedNote}
              </p>
            </div>
            <div className="text-right">
              <span className="text-sm font-bold text-[#713CF4] dark:text-[#a78bfa]">
                {currentPlan.pricePerMonth}
              </span>
              <span className="text-[10px] text-zinc-400">/mo</span>
            </div>
          </div>

          {/* Payment Gateways Selection (Directly inspired by original EchoGPT flow) */}
          <div className="space-y-3 pt-1">
            {/* 1. Secure International Payment */}
            <label
              className={`flex items-start gap-3.5 p-4 rounded-2xl border transition-all cursor-pointer ${
                paymentGateway === "international"
                  ? "border-[#713CF4] bg-[#713CF4]/[0.03] dark:bg-[#713CF4]/[0.08] shadow-xs"
                  : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#121319] hover:border-zinc-300 dark:hover:border-zinc-700"
              }`}
            >
              <input
                type="radio"
                name="payment_gateway"
                value="international"
                checked={paymentGateway === "international"}
                onChange={() => setPaymentGateway("international")}
                className="mt-1 text-[#713CF4] focus:ring-[#713CF4]"
              />

              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    Secure International Payments
                  </span>
                  <div className="flex items-center gap-1.5 text-zinc-400">
                    <CreditCard className="size-4" />
                  </div>
                </div>
                <p className="text-[11.5px] text-zinc-500 dark:text-zinc-400 leading-relaxed font-normal">
                  Credit / Debit Card (Visa, Mastercard, American Express, UnionPay), PayPal, and Apple Pay via Stripe.
                </p>
                <span className="inline-block text-[10px] font-medium text-emerald-600 dark:text-emerald-400 pt-0.5">
                  ✓ Instant activation worldwide
                </span>
              </div>
            </label>

            {/* 2. Pay in BDT */}
            <label
              className={`flex items-start gap-3.5 p-4 rounded-2xl border transition-all cursor-pointer ${
                paymentGateway === "bdt"
                  ? "border-[#713CF4] bg-[#713CF4]/[0.03] dark:bg-[#713CF4]/[0.08] shadow-xs"
                  : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#121319] hover:border-zinc-300 dark:hover:border-zinc-700"
              }`}
            >
              <input
                type="radio"
                name="payment_gateway"
                value="bdt"
                checked={paymentGateway === "bdt"}
                onChange={() => setPaymentGateway("bdt")}
                className="mt-1 text-[#713CF4] focus:ring-[#713CF4]"
              />

              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    Pay in BDT (Bangladesh)
                  </span>
                  <div className="flex items-center gap-1.5 text-zinc-400">
                    <Building2 className="size-4" />
                  </div>
                </div>
                <p className="text-[11.5px] text-zinc-500 dark:text-zinc-400 leading-relaxed font-normal">
                  Local Mobile Banking (bKash, Nagad, Rocket, Upay) or local Bangladeshi Visa/Mastercard cards.
                </p>
                <span className="inline-block text-[10px] font-medium text-emerald-600 dark:text-emerald-400 pt-0.5">
                  ✓ Converted at live bank exchange rate
                </span>
              </div>
            </label>
          </div>

          {/* Honest Demo Evaluation Notice */}
          <div className="p-3 rounded-xl border border-amber-500/20 bg-amber-50/60 dark:bg-amber-950/20 text-[11px] text-amber-700 dark:text-amber-300 leading-relaxed space-y-1">
            <span className="font-semibold block">Frontend Demo Environment</span>
            <span>
              This is a portfolio assignment prototype. Completing this step will
              activate Demo Pro mode locally in your browser without charging real
              funds or requiring live payment credentials.
            </span>
          </div>

          {/* Trust strip */}
          <div className="flex items-center justify-center gap-1.5 text-[11px] text-zinc-400 dark:text-zinc-500">
            <ShieldCheck className="size-3.5 text-emerald-500 shrink-0" />
            <span>256-bit SSL encrypted checkout simulation • Cancel anytime</span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2">
            <Button
              variant="outline"
              size="lg"
              className="flex-1 h-11 text-xs sm:text-sm font-medium"
              onClick={() => setStep("plan")}
            >
              <ArrowLeft className="size-4 mr-1.5" />
              Back to Plans
            </Button>

            <Button
              variant="primary"
              size="lg"
              className="flex-2 h-11 text-xs sm:text-sm font-semibold shadow-md hover:shadow-lg hover:shadow-[#713CF4]/20"
              isLoading={isProcessing}
              onClick={handleCompleteDemoCheckout}
            >
              <Sparkles className="size-4 mr-1.5" />
              Complete Demo Upgrade
            </Button>
          </div>
        </div>
      ) : (
        /* ── VIEW C: STEP 1 – PLAN & FEATURES SHOWCASE ───────────────────── */
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

            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-lg mx-auto leading-relaxed font-normal">
              Want to get more out of EchoGPT? Subscribe to one of our
              professional plans to access all frontier intelligence engines.
            </p>

            {featureReason && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-[#713CF4]/25 text-xs text-[#713CF4] dark:text-[#c4b5fd] font-medium mx-auto animate-in fade-in">
                <Sparkles className="size-3 shrink-0" />
                <span>{featureReason}</span>
              </div>
            )}
          </div>

          {/* Main 2-Column Responsive Body */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-start">
            {/* Left Column: Unlock All Premium Features */}
            <div className="order-2 lg:order-1 lg:col-span-7 rounded-2xl border border-zinc-200/80 dark:border-white/[0.08] bg-zinc-50/60 dark:bg-white/[0.02] p-4 sm:p-5 flex flex-col justify-between space-y-5">
              <div>
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-200/60 dark:border-white/[0.06]">
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                      Unlock all premium features
                    </h3>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5 font-normal">
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
                              className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white dark:bg-[#161520] border border-zinc-200/60 dark:border-white/[0.06] hover:border-[#713CF4]/30 dark:hover:border-[#713CF4]/40 transition-colors group"
                            >
                              <div
                                className={`size-7.5 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-transform group-hover:scale-105 ${item.color}`}
                              >
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
                                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-snug mt-0.5 line-clamp-1 font-normal">
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

            {/* Right Column: Billing Selector, Models Showcase, Pricing, CTA */}
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
                      }`}
                    >
                      <span>{plan.label}</span>
                      {plan.discountBadge && (
                        <span
                          className={`text-[9px] font-semibold px-1 rounded-sm leading-tight ${
                            isActive
                              ? "bg-[#713CF4]/15 text-[#713CF4] dark:text-[#c4b5fd]"
                              : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                          }`}
                        >
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

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-1.5 max-h-[175px] overflow-y-auto custom-scrollbar pr-1">
                  {SHOWCASE_MODELS.map((m) => {
                    const Icon = m.icon;
                    return (
                      <div
                        key={m.name}
                        className="flex items-center justify-between py-1 px-2 rounded-lg bg-zinc-50/80 dark:bg-white/[0.02] border border-zinc-200/50 dark:border-white/[0.04] text-xs"
                      >
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
                  <p className="text-[11.5px] text-zinc-500 dark:text-zinc-400 leading-relaxed font-normal">
                    Experience the full benefits of Pro membership with unlimited
                    chats, full access to all 36+ frontier reasoning models, and
                    creative studios.
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
                    onClick={handleProceedToPayment}
                  >
                    <Sparkles className="size-4 mr-1.5" />
                    Continue to Payment
                  </Button>

                  <button
                    type="button"
                    onClick={handleClose}
                    className="w-full text-center text-xs text-zinc-400 dark:text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 py-1 transition-colors cursor-pointer outline-none"
                  >
                    Maybe later
                  </button>
                </div>
              </div>

              {/* Trust Guarantee */}
              <div className="flex items-center justify-center gap-1.5 text-[11px] text-zinc-400 dark:text-zinc-500 text-center px-1">
                <ShieldCheck className="size-3.5 text-emerald-500 shrink-0" />
                <span>7-day risk-free money-back guarantee • Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}
