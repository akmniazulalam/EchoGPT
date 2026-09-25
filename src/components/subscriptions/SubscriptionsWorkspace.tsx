"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Check,
  Sparkles,
  ShieldCheck,
  ChevronDown,
  ArrowRight,
  Search,
  Lock,
  Crown,
  LifeBuoy,
  Bot,
  Cpu,
  Film,
  Image as ImageIcon,
  CreditCard,
  CheckCircle2,
  SlidersHorizontal,
  Info,
} from "lucide-react";
import { WorkspaceHeader } from "@/components/workspace/WorkspaceHeader";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { showToast } from "@/components/ui/Toast";
import { AI_MODELS, IMAGE_MODELS, VIDEO_MODELS } from "@/config/models";

/* ─────────────────────────────────────────────────────────────
   1. TYPES & DATA DEFINITIONS
   ───────────────────────────────────────────────────────────── */

export type BillingCycle = "all" | "monthly" | "annual";
export type ModelCategoryType =
  | "all"
  | "frontier"
  | "reasoning"
  | "image"
  | "video"
  | "free";

export interface PricingPlan {
  id: string;
  name: string;
  badge?: string;
  price: string;
  period: string;
  perMonthEquivalent: string;
  billingNote: string;
  description: string;
  isRecommended?: boolean;
  features: string[];
  ctaLabel: string;
  highlightBenefit: string;
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "monthly",
    name: "Monthly Plan",
    price: "$9.99",
    period: "/ month",
    perMonthEquivalent: "$9.99 / mo",
    billingNote: "Billed monthly. Cancel anytime with no penalty.",
    description:
      "Maximum flexibility with zero long-term commitment. Perfect for exploring frontier AI models.",
    isRecommended: false,
    highlightBenefit: "Flexible Monthly Billing",
    features: [
      "Access to all 8+ frontier models (GPT-5, Claude 4, Gemini Advanced)",
      "1,100 high-speed tokens per day + unlimited standard chats",
      "Image Studio 4K generation with Flux Pro & DALL-E 3",
      "Video Studio HD scene synthesis with Sora & Kling",
      "Side-by-side multi-model compare with Focus Mode",
      "Unlimited conversation history & bookmarks",
      "Standard priority email support",
    ],
    ctaLabel: "Subscribe Monthly",
  },
  {
    id: "quarterly",
    name: "Quarterly Plan",
    price: "$29.99",
    period: "/ 3 months",
    perMonthEquivalent: "$9.99 / mo",
    billingNote: "Billed $29.99 every 3 months. Cancel anytime.",
    description:
      "Convenient quarterly billing for sustained productivity across multi-week development sprints.",
    isRecommended: false,
    highlightBenefit: "Billed Every 3 Months",
    features: [
      "Everything included in Monthly Plan",
      "3-month continuous priority queue reservation",
      "1,100 high-speed tokens per day quota",
      "Full access to Midjourney v6 & Runway Gen-3 suites",
      "Up to 4 model parallel comparison cards",
      "Multi-device active session synchronization",
      "Priority customer ticket response",
    ],
    ctaLabel: "Subscribe Quarterly",
  },
  {
    id: "semi-annual",
    name: "Semi-Annual Plan",
    price: "$59.99",
    period: "/ 6 months",
    perMonthEquivalent: "$9.99 / mo",
    billingNote: "Billed $59.99 every 6 months. Cancel anytime.",
    description:
      "Extended semi-annual continuity for power creators, researchers, and professional workflows.",
    isRecommended: false,
    highlightBenefit: "Billed Every 6 Months",
    features: [
      "Everything included in Quarterly Plan",
      "6 months uninterrupted frontier reasoning depth",
      "Higher batch rendering (up to 4 image variations simultaneously)",
      "Lossless 4K PNG and WebP exports in Image Studio",
      "Early preview access to new model additions",
      "Faster low-latency response routing during peak hours",
      "Dedicated account assistance routing",
    ],
    ctaLabel: "Subscribe Semi-Annual",
  },
  {
    id: "annual",
    name: "Annual Plan",
    badge: "Recommended — Best Value",
    price: "$99.99",
    period: "/ year",
    perMonthEquivalent: "$8.33 / mo",
    billingNote:
      "Billed $99.99 annually ($8.33/mo). Single payment with 17% savings.",
    description:
      "Unlocks the full power of EchoGPT with maximum savings. Best value for dedicated creators and engineers.",
    isRecommended: true,
    highlightBenefit: "Save 17% Annually",
    features: [
      "Complete, unlimited access to all frontier AI models",
      "1,100 high-speed tokens per day with peak VIP routing",
      "Image Studio & Video Studio maximum resolution suites",
      "1M token context capacity on Gemini Advanced",
      "Save $19.89/year compared to standard monthly billing",
      "Pro badge & custom persona workflows in Chat",
      "VIP priority technical & billing support",
    ],
    ctaLabel: "Subscribe Annually",
  },
];

/* ── Comparison Features ── */
interface ComparisonCategory {
  name: string;
  items: {
    feature: string;
    free: string | boolean;
    pro: string | boolean;
    description: string;
  }[];
}

const COMPARISON_DATA: ComparisonCategory[] = [
  {
    name: "Core Intelligence & Models",
    items: [
      {
        feature: "Standard AI Models",
        free: "EchoGPT, GPT-4o mini, DeepSeek-V3",
        pro: "All Standard Models Included",
        description:
          "Fast everyday conversational logic and lightweight assistance",
      },
      {
        feature: "Frontier Models Access",
        free: "Limited Previews",
        pro: "GPT-5, Claude 4 Sonnet, Gemini Advanced, Grok 4",
        description:
          "Next-generation reasoning, synthetic logic, and coding precision",
      },
      {
        feature: "Deep Reasoning Engine",
        free: false,
        pro: "DeepSeek R1 with Verified Chain of Thought",
        description: "Autonomous reasoning and math verification",
      },
      {
        feature: "Maximum Context Window",
        free: "Up to 32K tokens",
        pro: "Up to 1M tokens (Gemini Advanced)",
        description: "Massive context window for extensive document analysis",
      },
      {
        feature: "Model Comparison Workspace",
        free: "2 models side-by-side",
        pro: "Up to 4 models + Focus Mode",
        description:
          "Evaluate latency, reasoning depth, and creativity simultaneously",
      },
    ],
  },
  {
    name: "Creative Studios (Image & Video)",
    items: [
      {
        feature: "Image Studio Engines",
        free: "SDXL Turbo (Draft resolution)",
        pro: "Flux Pro, DALL-E 3, Midjourney v6, SDXL",
        description:
          "Frontier photorealistic synthesis and accurate typography",
      },
      {
        feature: "Maximum Image Resolution",
        free: "Standard 720p",
        pro: "4K Master Resolution (Lossless)",
        description:
          "Ultra-high-definition exports suitable for commercial publishing",
      },
      {
        feature: "Video Studio Engines",
        free: "Veo 3.1 fast (720p drafts)",
        pro: "Sora, Kling v1.5, Runway Gen-3, Veo 3.1",
        description:
          "Cinematic camera motions, physics fidelity, and scene generation",
      },
      {
        feature: "Prompt Transformations",
        free: "Basic Enhance",
        pro: "Enhance, Director Rewrite, Architectural Expand",
        description:
          "Neural prompt engineering with contextual lighting and textures",
      },
      {
        feature: "Batch Image Variations",
        free: "1 image per run",
        pro: "Up to 4 parallel variations",
        description: "Render multiple aesthetic directions simultaneously",
      },
    ],
  },
  {
    name: "Usage Quotas & Performance",
    items: [
      {
        feature: "High-Speed Token Quota",
        free: "Standard daily quota",
        pro: "1,100 fast tokens/day + Unlimited standard",
        description:
          "Dedicated ultra-low latency compute for peak productivity",
      },
      {
        feature: "Server Queue Priority",
        free: "Standard Queue",
        pro: "VIP Low-Latency Queue",
        description:
          "Bypass peak-hour server queues with instant response times",
      },
      {
        feature: "Cloud Conversation History",
        free: "30 days retention",
        pro: "Unlimited cloud sync & permanent archive",
        description:
          "Instant access to historical chats, code blocks, and artworks",
      },
      {
        feature: "Simultaneous Devices",
        free: "1 active session",
        pro: "Unlimited devices (Desktop, Tablet, Mobile)",
        description: "Work seamlessly across all your hardware environments",
      },
    ],
  },
  {
    name: "Security, Export & Support",
    items: [
      {
        feature: "Export Capabilities",
        free: "PNG, JPG, MP4 standard",
        pro: "Lossless PNG, WebP, 4K Master, ProRes",
        description:
          "Professional production formats with transparent background support",
      },
      {
        feature: "Commercial Usage Rights",
        free: "Personal non-commercial",
        pro: "Full commercial ownership of generated assets",
        description:
          "Sell, monetize, and publish artworks and video clips freely",
      },
      {
        feature: "Data Privacy & Encryption",
        free: "TLS encryption in transit",
        pro: "Enterprise-grade encryption at rest & in transit",
        description:
          "Zero user prompt data used for public training without consent",
      },
      {
        feature: "Customer Support Tier",
        free: "Community & documentation",
        pro: "Priority support team routing",
        description:
          "Rapid turnaround on technical inquiries and billing questions",
      },
    ],
  },
];

/* ── FAQ Items ── */
interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: "General" | "Plans & Billing" | "AI Models" | "Account & Devices";
}

const FAQ_ITEMS: FAQItem[] = [
  {
    id: "faq-1",
    category: "General",
    question: "What is included in the EchoGPT Pro subscription?",
    answer:
      "EchoGPT Pro unlocks the complete frontier intelligence suite: unlimited access to frontier models (GPT-5, Claude 4 Sonnet, Gemini Advanced, DeepSeek R1), 4K neural rendering in Image Studio, cinematic scene generation in Video Studio, 1,100 high-speed tokens per day, priority queue routing, side-by-side 4-model comparison, and unlimited cloud conversation history.",
  },
  {
    id: "faq-2",
    category: "AI Models",
    question: "Which AI models are available across Free and Pro tiers?",
    answer:
      "EchoGPT hosts a unified frontier catalog. The Free plan includes EchoGPT default engine, GPT-4o mini, and DeepSeek-V3, along with SDXL Turbo and Veo fast for drafting. Pro unlocks premier frontier models from OpenAI (GPT-5, GPT-4o), Anthropic (Claude 4 Sonnet, Claude Opus), Google (Gemini Advanced with 1M context), xAI (Grok 4), DeepSeek (R1 Reasoning), Mistral (Mistral Pro), as well as creative engines like Flux Pro, Midjourney v6, Sora, and Kling.",
  },
  {
    id: "faq-3",
    category: "Plans & Billing",
    question: "What are the differences between the billing cycles?",
    answer:
      "We offer Monthly ($9.99/mo), Quarterly ($29.99 every 3 months), Semi-Annual ($59.99 every 6 months), and Annual ($99.99/year, equivalent to $8.33/mo) billing. All plans provide the exact same complete Pro feature set. The Annual Plan offers the greatest value, saving you $19.89/year compared to standard monthly renewals.",
  },
  {
    id: "faq-4",
    category: "Account & Devices",
    question: "Can I use EchoGPT on multiple devices simultaneously?",
    answer:
      "Yes! Your EchoGPT account synchronizes seamlessly across desktop web browsers, laptops, tablets, and mobile devices. Active workspaces, ongoing chats, and studio galleries update in real time across all authenticated devices.",
  },
  {
    id: "faq-5",
    category: "Plans & Billing",
    question: "How does the daily token quota work?",
    answer:
      "Pro subscribers receive an allotment of 1,100 high-speed tokens every single day for ultra-low latency processing on frontier reasoning models. Even if your daily high-speed allocation is exhausted, you retain unlimited access to standard-speed generation with no hard locks.",
  },
  {
    id: "faq-6",
    category: "Plans & Billing",
    question: "Can I cancel or switch my plan at any time?",
    answer:
      "Yes. You can manage or cancel your subscription at any time directly from the account dashboard. When you cancel, your Pro access remains fully active until the conclusion of your prepaid billing period, with zero cancellation fees or unexpected renewals.",
  },
  {
    id: "faq-7",
    category: "General",
    question: "What platforms is EchoGPT available on?",
    answer:
      "EchoGPT is currently deployed as a high-performance responsive web application engineered for all modern desktop, tablet, and mobile browsers. Dedicated Chrome extensions and companion desktop applications are actively in development.",
  },
  {
    id: "faq-8",
    category: "General",
    question: "Is my personal data safe and secure when using EchoGPT?",
    answer:
      "We adhere to strict data privacy standards. All prompt queries, conversation logs, and generated assets are secured with TLS encryption in transit and AES-256 at rest. Your inputs are private and are never used to train third-party public models without explicit user opt-in.",
  },
  {
    id: "faq-9",
    category: "Account & Devices",
    question: "How can I report a bug or suggest a new feature?",
    answer:
      "You can submit feedback directly by clicking on 'Support' in the sidebar or navigating to /support. Our engineering and design teams review user suggestions and bug reports on a continuous weekly sprint cycle.",
  },
  {
    id: "faq-10",
    category: "Plans & Billing",
    question: "Who do I contact if I have billing or subscription questions?",
    answer:
      "For invoice requests, plan upgrades, or enterprise team billing questions, navigate to our Support center (/support) to connect with our dedicated customer support team.",
  },
];

/* ─────────────────────────────────────────────────────────────
   2. MAIN WORKSPACE COMPONENT
   ───────────────────────────────────────────────────────────── */

export function SubscriptionsWorkspace() {
  /* ── State ── */
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("all");
  const [selectedPlanForModal, setSelectedPlanForModal] =
    useState<PricingPlan | null>(null);
  const [activePlanId, setActivePlanId] = useState<string>("annual"); // simulated current active tier
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isSubscribing, setIsSubscribing] = useState(false);

  // Model catalog browser state
  const [modelCategory, setModelCategory] = useState<
    "all" | "frontier" | "reasoning" | "image" | "video" | "free"
  >("all");
  const [modelSearch, setModelSearch] = useState("");

  // FAQ accordion state
  const [openFaqIds, setOpenFaqIds] = useState<string[]>(["faq-1", "faq-3"]);
  const [faqSearch, setFaqSearch] = useState("");

  /* ── Filtered Plans ── */
  const visiblePlans = useMemo(() => {
    if (billingCycle === "monthly") {
      return PRICING_PLANS.filter((p) => p.id === "monthly");
    }
    if (billingCycle === "annual") {
      return PRICING_PLANS.filter((p) => p.id === "annual");
    }
    return PRICING_PLANS;
  }, [billingCycle]);

  /* ── All Models Unified List ── */
  const allModelsList = useMemo(() => {
    return [
      ...AI_MODELS.map((m) => ({ ...m, domain: "text" })),
      ...IMAGE_MODELS.map((m) => ({ ...m, domain: "image" })),
      ...VIDEO_MODELS.map((m) => ({ ...m, domain: "video" })),
    ];
  }, []);

  /* ── Filtered Models ── */
  const filteredModels = useMemo(() => {
    return allModelsList.filter((m) => {
      // Category filter
      if (modelCategory === "frontier" && m.category !== "Flagship")
        return false;
      if (modelCategory === "reasoning" && m.category !== "Reasoning")
        return false;
      if (modelCategory === "image" && m.domain !== "image") return false;
      if (modelCategory === "video" && m.domain !== "video") return false;
      if (modelCategory === "free" && m.isPro) return false;

      // Search query
      if (modelSearch.trim()) {
        const query = modelSearch.toLowerCase();
        const matchesName = m.name.toLowerCase().includes(query);
        const matchesProvider = m.provider.toLowerCase().includes(query);
        const matchesDesc = m.description.toLowerCase().includes(query);
        return matchesName || matchesProvider || matchesDesc;
      }
      return true;
    });
  }, [allModelsList, modelCategory, modelSearch]);

  /* ── Filtered FAQs ── */
  const filteredFaqs = useMemo(() => {
    if (!faqSearch.trim()) return FAQ_ITEMS;
    const query = faqSearch.toLowerCase();
    return FAQ_ITEMS.filter(
      (faq) =>
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query) ||
        faq.category.toLowerCase().includes(query),
    );
  }, [faqSearch]);

  /* ── Handlers ── */
  const toggleFaq = (id: string) => {
    setOpenFaqIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const handleOpenPlanModal = (plan: PricingPlan) => {
    setSelectedPlanForModal(plan);
    setIsCheckoutModalOpen(true);
  };

  const handleConfirmSubscription = () => {
    if (!selectedPlanForModal) return;
    setIsSubscribing(true);

    setTimeout(() => {
      setIsSubscribing(false);
      setActivePlanId(selectedPlanForModal.id);
      setIsCheckoutModalOpen(false);
      showToast(
        `Subscribed to ${selectedPlanForModal.name} (${selectedPlanForModal.price}${selectedPlanForModal.period})! Pro access activated.`,
        "success",
      );
    }, 800);
  };

  return (
    <div className="flex flex-col flex-1 h-full min-h-0 bg-[#FAFAFC] dark:bg-[#0E0C15] text-zinc-900 dark:text-zinc-100">
      {/* ── 1. WORKSPACE HEADER ── */}
      <WorkspaceHeader
        title="Subscriptions & Plans"
        breadcrumbs={[{ label: "Workspace" }, { label: "Subscriptions" }]}
        badge={{ text: "PRO", variant: "pro" }}
        subtitle="Choose the plan that fits your workflow and unlocks frontier intelligence"
        actions={
          <div className="flex items-center gap-2">
            <Link href="/support">
              <Button
                variant="outline"
                size="xs"
                leftIcon={<LifeBuoy className="size-3.5 text-zinc-500" />}>
                Help & Support
              </Button>
            </Link>
          </div>
        }
      />

      {/* ── 2. SCROLLABLE PAGE BODY ── */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
          {/* ════════════ SECTION 1: HERO & PLAN OVERVIEW ════════════ */}
          <section className="text-center space-y-4 pt-2 sm:pt-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#713CF4]/10 dark:bg-[#713CF4]/20 border border-[#713CF4]/25 text-[#713CF4] dark:text-[#a78bfa] text-xs font-semibold tracking-wide">
              <Sparkles className="size-3.5" />
              <span>Affordable Plans for Every Need</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              Supercharge your creative workflow with EchoGPT Pro
            </h1>

            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl mx-auto">
              Want to get more out of EchoGPT? Unlock frontier reasoning models,
              4K Image Studio synthesis, cinematic video engines, and
              high-throughput server priority.
            </p>

            {/* ── Billing Segmented Control ── */}
            <div className="pt-3 flex items-center justify-center">
              <div
                role="radiogroup"
                aria-label="Billing frequency selection"
                className="inline-flex items-center p-1 rounded-xl bg-zinc-100 dark:bg-[#713CF4]/20 border border-zinc-200/80 dark:border-zinc-800 shadow-2xs">
                <button
                  type="button"
                  role="radio"
                  aria-checked={billingCycle === "all"}
                  onClick={() => setBillingCycle("all")}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                    billingCycle === "all"
                      ? "bg-white dark:bg-[#1b1725] text-zinc-900 dark:text-zinc-100 shadow-xs"
                      : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200"
                  }`}>
                  All Durations
                </button>

                <button
                  type="button"
                  role="radio"
                  aria-checked={billingCycle === "monthly"}
                  onClick={() => setBillingCycle("monthly")}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                    billingCycle === "monthly"
                      ? "bg-white dark:bg-[#1b1725] text-zinc-900 dark:text-zinc-100 shadow-xs"
                      : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200"
                  }`}>
                  Monthly ($9.99/mo)
                </button>

                <button
                  type="button"
                  role="radio"
                  aria-checked={billingCycle === "annual"}
                  onClick={() => setBillingCycle("annual")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                    billingCycle === "annual"
                      ? "bg-white dark:bg-[#1b1725] text-zinc-900 dark:text-zinc-100 shadow-xs"
                      : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200"
                  }`}>
                  <span>Annual ($99.99/yr)</span>
                  <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-[#713CF4] text-white">
                    Save 17%
                  </span>
                </button>
              </div>
            </div>
          </section>

          {/* ════════════ SECTION 2: SUBSCRIPTION PLAN CARDS ════════════ */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100">
                  Select a subscription plan
                </h2>
                <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                  All plans include complete frontier intelligence, image
                  rendering, and video features.
                </p>
              </div>

              {billingCycle !== "all" && (
                <Button
                  variant="ghost"
                  size="xs"
                  onClick={() => setBillingCycle("all")}
                  className="text-xs text-[#713CF4]">
                  Show all 4 durations
                </Button>
              )}
            </div>

            {/* Grid of Plan Cards */}
            <div
              className={`grid gap-4.5 sm:gap-6 ${
                visiblePlans.length === 1
                  ? "max-w-md mx-auto grid-cols-1"
                  : visiblePlans.length === 2
                    ? "max-w-3xl mx-auto grid-cols-1 sm:grid-cols-2"
                    : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
              }`}>
              {visiblePlans.map((plan) => {
                const isSelected = activePlanId === plan.id;
                const isRec = plan.isRecommended;

                return (
                  <div
                    key={plan.id}
                    className={`relative rounded-2xl border transition-all duration-200 flex flex-col justify-between p-5 sm:p-6 ${
                      isRec
                        ? "border-[#713CF4] dark:border-[#713CF4]/80 bg-white dark:bg-[#161224] shadow-lg shadow-[#713CF4]/5 ring-2 ring-[#713CF4]/20"
                        : "border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-[#121319] hover:border-zinc-300 dark:hover:border-zinc-700 shadow-xs"
                    }`}>
                    {/* Top: Recommended Badge */}
                    {isRec && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                        <div className="flex items-center gap-1.5 whitespace-nowrap rounded-full bg-[#713CF4] px-5 py-1.5 text-[11px] font-bold uppercase tracking-wide text-white shadow-[0_4px_16px_rgba(113,60,244,0.4)] ring-1 ring-[#8B5CF6]">
                          <Crown
                            className="size-3.5 shrink-0"
                            strokeWidth={2.5}
                          />
                          <span className="leading-none">
                            {plan.badge || "Recommended"}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Card Header */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100">
                          {plan.name}
                        </h3>
                        {isSelected && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                            Current Plan
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed min-h-[36px]">
                        {plan.description}
                      </p>

                      {/* Pricing block */}
                      <div className="pt-2 pb-1 border-t border-zinc-100 dark:border-zinc-800/80">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
                            {plan.price}
                          </span>
                          <span className="text-xs text-zinc-400 font-medium">
                            {plan.period}
                          </span>
                        </div>

                        <div className="flex items-center justify-between text-[11px] text-zinc-400 mt-0.5">
                          <span>{plan.perMonthEquivalent}</span>
                          <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                            {plan.highlightBenefit}
                          </span>
                        </div>
                      </div>

                      {/* Primary Action Button */}
                      <Button
                        variant={isRec ? "primary" : "outline"}
                        size="md"
                        onClick={() => handleOpenPlanModal(plan)}
                        className={`w-full font-semibold ${
                          isRec
                            ? "bg-[#713CF4] hover:bg-[#602ee0] text-white shadow-xs"
                            : ""
                        }`}
                        leftIcon={
                          isSelected ? (
                            <CheckCircle2 className="size-4 text-emerald-500" />
                          ) : (
                            <CreditCard className="size-4" />
                          )
                        }>
                        {isSelected ? "Renew Subscription" : plan.ctaLabel}
                      </Button>

                      <p className="text-[10px] text-center text-zinc-400">
                        {plan.billingNote}
                      </p>

                      {/* Feature Bullet List */}
                      <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 space-y-2.5">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block">
                          Included Capabilities:
                        </span>
                        <ul className="space-y-2">
                          {plan.features.map((feat, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2 text-xs text-zinc-700 dark:text-zinc-300">
                              <Check className="size-3.5 text-[#713CF4] dark:text-[#a78bfa] shrink-0 mt-0.5" />
                              <span className="leading-snug">{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Card Footer Badge */}
                    <div className="mt-5 pt-3 border-t border-zinc-100 dark:border-zinc-850 flex items-center justify-between text-[10.5px] text-zinc-400">
                      <span className="flex items-center gap-1 font-medium">
                        <ShieldCheck className="size-3 text-emerald-500" />
                        Cancel anytime
                      </span>
                      <span>No setup fees</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ════════════ SECTION 3: AI MODEL AVAILABILITY CATALOG ════════════ */}
          <section className="space-y-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-[#121319] p-5 sm:p-7 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-100 dark:border-zinc-800/80">
              <div>
                <div className="flex items-center gap-2">
                  <Bot className="size-5 text-[#713CF4]" />
                  <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100">
                    Included AI Neural Engines
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
                  Your EchoGPT subscription grants multi-engine access across
                  text, reasoning, image, and video synthesis.
                </p>
              </div>

              {/* Search Bar */}
              <div className="relative min-w-56 sm:min-w-64">
                <Search className="size-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                <input
                  type="text"
                  value={modelSearch}
                  onChange={(e) => setModelSearch(e.target.value)}
                  placeholder="Search model or provider…"
                  className="w-full pl-8.5 pr-3 py-1.5 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#121319] text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 outline-none focus:ring-1 focus:ring-[#713CF4] transition-all"
                />
                {modelSearch && (
                  <button
                    type="button"
                    onClick={() => setModelSearch("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 text-xs">
                    ×
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              {[
                { id: "all", label: `All Models (${allModelsList.length})` },
                { id: "frontier", label: "Frontier Flagship" },
                { id: "reasoning", label: "Deep Reasoning" },
                { id: "image", label: "Image Engines" },
                { id: "video", label: "Video Studios" },
                { id: "free", label: "Free Baseline" },
              ].map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setModelCategory(cat.id as ModelCategoryType)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                    modelCategory === cat.id
                      ? "bg-[#713CF4] text-white shadow-xs"
                      : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200/80 dark:hover:bg-[#713CF4]/20"
                  }`}>
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Models Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 pt-1">
              {filteredModels.map((model) => (
                <div
                  key={model.id}
                  className="rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-[#161720]/80 p-3.5 flex flex-col justify-between hover:border-zinc-300 dark:hover:border-zinc-700 transition-all hover:shadow-xs group">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        {/* Domain Icon */}
                        <div className="size-7 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-700/80 flex items-center justify-center text-[#713CF4] shrink-0 shadow-2xs">
                          {model.domain === "image" ? (
                            <ImageIcon className="size-3.5" />
                          ) : model.domain === "video" ? (
                            <Film className="size-3.5" />
                          ) : model.category === "Reasoning" ? (
                            <Cpu className="size-3.5" />
                          ) : (
                            <Bot className="size-3.5" />
                          )}
                        </div>

                        <div>
                          <h4 className="text-[12.5px] font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-[#713CF4] transition-colors leading-tight">
                            {model.name}
                          </h4>
                          <span className="text-[10px] text-zinc-400 block font-medium">
                            {model.provider}
                          </span>
                        </div>
                      </div>

                      {/* Tier Badge */}
                      {model.isPro ? (
                        <span className="inline-flex items-center gap-1 text-[9.5px] font-bold px-1.5 py-0.5 rounded bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/25 shrink-0">
                          <Lock className="size-2.5" />
                          PRO
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[9.5px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25 shrink-0">
                          <Check className="size-2.5" />
                          Free
                        </span>
                      )}
                    </div>

                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                      {model.description}
                    </p>
                  </div>

                  {/* Footer metadata */}
                  <div className="mt-3 pt-2 border-t border-zinc-200/60 dark:border-zinc-800/60 flex items-center justify-between text-[10px] text-zinc-400">
                    <span className="capitalize">{model.category}</span>
                    {model.contextWindow && (
                      <span className="font-mono bg-zinc-200/60 dark:bg-zinc-800 px-1 py-0.2 rounded text-[9px]">
                        {model.contextWindow}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {filteredModels.length === 0 && (
              <div className="py-8 text-center text-zinc-400 text-xs">
                No AI models found matching &quot;{modelSearch}&quot;.
              </div>
            )}
          </section>

          {/* ════════════ SECTION 4: FEATURE COMPARISON TABLE ════════════ */}
          <section className="space-y-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-[#121319] p-5 sm:p-7 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-zinc-100 dark:border-zinc-800/80">
              <div>
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="size-5 text-[#713CF4]" />
                  <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100">
                    Feature Comparison: Free vs. Pro
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
                  See how an active EchoGPT subscription transforms your
                  everyday capabilities.
                </p>
              </div>

              <span className="text-[11px] text-zinc-400">
                Transparent feature breakdown
              </span>
            </div>

            {/* Comparison Matrix Table */}
            <div className="overflow-x-auto -mx-5 sm:mx-0 px-5 sm:px-0">
              <table className="w-full text-left border-collapse min-w-[580px]">
                <thead>
                  <tr className="border-b border-zinc-200 dark:border-zinc-800 text-[11px] uppercase tracking-wider text-zinc-400">
                    <th className="py-3 px-3 w-1/2">Capability</th>
                    <th className="py-3 px-3 w-1/4">Free Tier</th>
                    <th className="py-3 px-3 w-1/4 text-[#713CF4] dark:text-[#a78bfa] font-bold">
                      EchoGPT Pro
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-850 text-xs">
                  {COMPARISON_DATA.map((cat, catIdx) => (
                    <React.Fragment key={catIdx}>
                      {/* Category Header Row */}
                      <tr className="bg-zinc-50/75 dark:bg-zinc-900/40">
                        <td
                          colSpan={3}
                          className="py-2.5 px-3 font-bold text-[11px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                          {cat.name}
                        </td>
                      </tr>

                      {/* Items */}
                      {cat.items.map((item, itemIdx) => (
                        <tr
                          key={itemIdx}
                          className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 transition-colors">
                          <td className="py-3 px-3">
                            <span className="font-semibold text-zinc-900 dark:text-zinc-100 block">
                              {item.feature}
                            </span>
                            <span className="text-[11px] text-zinc-400 block mt-0.5">
                              {item.description}
                            </span>
                          </td>

                          {/* Free column */}
                          <td className="py-3 px-3 text-zinc-600 dark:text-zinc-400">
                            {typeof item.free === "boolean" ? (
                              item.free ? (
                                <Check className="size-4 text-emerald-500" />
                              ) : (
                                <span className="text-zinc-300 dark:text-zinc-600 font-mono text-sm">
                                  —
                                </span>
                              )
                            ) : (
                              <span>{item.free}</span>
                            )}
                          </td>

                          {/* Pro column */}
                          <td className="py-3 px-3 font-medium text-zinc-900 dark:text-zinc-100 bg-[#713CF4]/5 dark:bg-[#713CF4]/10 rounded-lg">
                            {typeof item.pro === "boolean" ? (
                              item.pro ? (
                                <Check className="size-4 text-[#713CF4] dark:text-[#a78bfa]" />
                              ) : (
                                <span className="text-zinc-300 dark:text-zinc-600 font-mono text-sm">
                                  —
                                </span>
                              )
                            ) : (
                              <span className="text-[#713CF4] dark:text-[#a78bfa] font-semibold">
                                {item.pro}
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* ════════════ SECTION 5: CUSTOMER SUPPORT CTA ════════════ */}
          <section className="relative overflow-hidden rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-gradient-to-r from-zinc-50 via-purple-50/20 to-zinc-50 dark:from-[#13111c] dark:via-[#191428] dark:to-[#13111c] p-6 sm:p-8 shadow-xs">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
              <div className="space-y-2 max-w-xl">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#713CF4]/10 text-[#713CF4] dark:text-[#a78bfa] text-xs font-semibold">
                  <LifeBuoy className="size-3.5" />
                  <span>Customer Support</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                  Need help choosing the right plan?
                </h3>

                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Have questions about model availability, token allocations, or
                  billing invoices? Our customer support specialists are ready
                  to guide your team.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0 flex-wrap">
                <Link href="/support">
                  <Button
                    variant="primary"
                    size="md"
                    rightIcon={<ArrowRight className="size-4" />}
                    className="font-semibold shadow-xs">
                    Contact Support
                  </Button>
                </Link>

                <a href="#faq">
                  <Button variant="outline" size="md">
                    Read FAQ Below
                  </Button>
                </a>
              </div>
            </div>
          </section>

          {/* ════════════ SECTION 6: FREQUENTLY ASKED QUESTIONS ════════════ */}
          <section id="faq" className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-lg sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                  Frequently Asked Questions
                </h2>
                <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
                  Everything you need to know about EchoGPT plans, billing, and
                  frontier model availability.
                </p>
              </div>

              {/* FAQ Search */}
              <div className="relative min-w-56 sm:min-w-64">
                <Search className="size-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                <input
                  type="text"
                  value={faqSearch}
                  onChange={(e) => setFaqSearch(e.target.value)}
                  placeholder="Search questions…"
                  className="w-full pl-8.5 pr-3 py-1.5 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#121319] text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 outline-none focus:ring-1 focus:ring-[#713CF4] transition-all"
                />
              </div>
            </div>

            {/* Accordion List */}
            <div className="space-y-3">
              {filteredFaqs.map((faq) => {
                const isOpen = openFaqIds.includes(faq.id);

                return (
                  <div
                    key={faq.id}
                    className="rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-[#121319] overflow-hidden transition-all shadow-2xs">
                    <button
                      type="button"
                      onClick={() => toggleFaq(faq.id)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${faq.id}`}
                      className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#713CF4]">
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500 shrink-0 hidden sm:inline-block">
                          {faq.category}
                        </span>
                        <h4 className="text-sm sm:text-base font-semibold text-zinc-900 dark:text-zinc-100 leading-snug">
                          {faq.question}
                        </h4>
                      </div>

                      <div
                        className={`size-7 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 transition-transform duration-200 shrink-0 ${
                          isOpen
                            ? "rotate-180 bg-[#713CF4]/10 text-[#713CF4]"
                            : ""
                        }`}>
                        <ChevronDown className="size-4" />
                      </div>
                    </button>

                    {isOpen && (
                      <div
                        id={`faq-answer-${faq.id}`}
                        className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed border-t border-zinc-100 dark:border-zinc-850 animate-in fade-in-50 duration-150">
                        <p className="pt-3">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* ════════════ SECTION 7: FINAL CONVERSION CTA ════════════ */}
          <section className="rounded-2xl border border-[#713CF4]/30 bg-gradient-to-br from-[#713CF4]/10 via-purple-900/10 to-transparent p-6 sm:p-10 text-center space-y-4">
            <h3 className="text-xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
              Ready to unlock frontier AI capability?
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto leading-relaxed">
              Start with the Annual Plan for maximum savings, or choose Monthly
              for complete flexibility. Cancel anytime in one click.
            </p>
            <div className="pt-2 flex items-center justify-center gap-3 flex-wrap">
              <Button
                variant="primary"
                size="lg"
                onClick={() => handleOpenPlanModal(PRICING_PLANS[3])} // Annual Plan
                leftIcon={<Crown className="size-4" />}
                className="font-bold px-6 shadow-xs">
                Upgrade to Pro Annually ($8.33/mo)
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => handleOpenPlanModal(PRICING_PLANS[0])} // Monthly Plan
              >
                Subscribe Monthly ($9.99/mo)
              </Button>
            </div>
          </section>
        </div>
      </div>

      
    </div>
  );
}
