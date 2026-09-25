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

      
    </div>
  );
}
