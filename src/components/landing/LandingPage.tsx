"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  MessageSquare,
  Image as ImageIcon,
  Video,
  Columns2,
  Briefcase,
  Zap,
  Shield,
  Globe,
  ChevronDown,
  Check,
  Menu,
  X,
  Star,
  Bot,
  Cpu,
  FileText,
  TrendingUp,
  Users,
  Clock,
} from "lucide-react";

// ─────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Models", href: "#models" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

const FEATURES = [
  {
    icon: MessageSquare,
    color: "text-violet-500",
    bg: "bg-violet-500/10",
    title: "AI Chat",
    desc: "Conversational AI across 11+ frontier models. Switch mid-conversation without losing context.",
    href: "/chat",
  },
  {
    icon: ImageIcon,
    color: "text-pink-500",
    bg: "bg-pink-500/10",
    title: "Image Studio",
    desc: "Generate production-quality images with FLUX, DALL-E 3, and Midjourney — in one workspace.",
    href: "/image-studio",
  },
  {
    icon: Video,
    color: "text-sky-500",
    bg: "bg-sky-500/10",
    title: "Video Studio",
    desc: "AI video generation from text prompts. Powered by Sora, Kling, and Runway Gen-3.",
    href: "/video-studio",
  },
  {
    icon: Columns2,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    title: "Model Compare",
    desc: "Run the same prompt across multiple models side-by-side. Find what works — fast.",
    href: "/compare",
  },
  {
    icon: Briefcase,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    title: "AI Job Analysis",
    desc: "Paste any job description. Get skill gap analysis, ATS keywords, and interview prep in seconds.",
    href: "/resume",
  },
  {
    icon: FileText,
    color: "text-rose-500",
    bg: "bg-rose-500/10",
    title: "AI SOP Builder",
    desc: "Transform raw process notes into structured, professional standard operating procedures.",
    href: "/ai-sop-builder",
  },
];

const MODELS = [
  { name: "EchoGPT", provider: "EchoGPT", tag: "Default", tagColor: "bg-violet-500/15 text-violet-500 dark:text-violet-400" },
  { name: "GPT-5", provider: "OpenAI", tag: "Frontier", tagColor: "bg-amber-500/15 text-amber-600 dark:text-amber-400" },
  { name: "Claude 4 Sonnet", provider: "Anthropic", tag: "PRO", tagColor: "bg-[#713CF4]/15 text-[#713CF4] dark:text-[#a78bfa]" },
  { name: "Gemini Advanced", provider: "Google", tag: "1M ctx", tagColor: "bg-sky-500/15 text-sky-600 dark:text-sky-400" },
  { name: "Grok 4", provider: "xAI", tag: "Reasoning", tagColor: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400" },
  { name: "DeepSeek R1", provider: "DeepSeek", tag: "Open", tagColor: "bg-rose-500/15 text-rose-600 dark:text-rose-400" },
  { name: "FLUX Pro", provider: "Image", tag: "4K", tagColor: "bg-pink-500/15 text-pink-600 dark:text-pink-400" },
  { name: "Sora", provider: "Video", tag: "Cinematic", tagColor: "bg-sky-500/15 text-sky-600 dark:text-sky-400" },
];

const PRICING_PLANS = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    period: "",
    desc: "Everything you need to get started with AI.",
    cta: "Start Free",
    ctaHref: "/chat",
    highlight: false,
    features: [
      "EchoGPT & GPT-4o mini",
      "DeepSeek-V3 (Open Source)",
      "SDXL Turbo image generation",
      "Veo 3.1 video generation",
      "AI Job Analysis",
      "Model Compare (2 models)",
      "Community support",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: "$9.99",
    period: "/mo",
    desc: "Full access to every frontier model and workspace.",
    cta: "Start Pro Trial",
    ctaHref: "/subscriptions",
    highlight: true,
    badge: "Most Popular",
    features: [
      "Every model: GPT-5, Claude 4, Gemini Advanced, Grok 4…",
      "FLUX Pro + DALL-E 3 + Midjourney v6",
      "Sora + Kling + Runway Gen-3 video",
      "Unlimited model comparisons",
      "AI SOP Builder & AI Tasks",
      "Priority generation queue",
      "Email support (1-day response)",
    ],
  },
];

const STATS = [
  { icon: Users, value: "50K+", label: "Active users" },
  { icon: Bot, value: "11+", label: "AI models" },
  { icon: Cpu, value: "4", label: "Creative studios" },
  { icon: TrendingUp, value: "99.9%", label: "Uptime SLA" },
];

const TESTIMONIALS = [
  {
    name: "Sarah Chen",
    role: "Product Designer",
    avatar: "SC",
    avatarBg: "bg-violet-500",
    quote: "EchoGPT's Image Studio replaced three separate tools for me. The model-switching mid-prompt is genuinely magic.",
    stars: 5,
  },
  {
    name: "Marcus Okoye",
    role: "Engineering Lead",
    avatar: "MO",
    avatarBg: "bg-sky-500",
    quote: "The Model Compare feature alone is worth the subscription. I use it to pick the right model for every task.",
    stars: 5,
  },
  {
    name: "Priya Sharma",
    role: "Content Strategist",
    avatar: "PS",
    avatarBg: "bg-emerald-500",
    quote: "AI Job Analysis saved me hours when switching roles. The ATS keyword extraction is incredibly accurate.",
    stars: 5,
  },
];

const FAQS = [
  {
    q: "Is EchoGPT free to use?",
    a: "Yes — the Free plan includes EchoGPT, GPT-4o mini, DeepSeek-V3, SDXL Turbo image generation, and Veo video generation with no credit card required.",
  },
  {
    q: "What does Pro include?",
    a: "Pro unlocks every frontier model (GPT-5, Claude 4 Sonnet, Gemini Advanced, Grok 4, DeepSeek R1), FLUX Pro + DALL-E 3 + Midjourney v6 image generation, Sora + Kling + Runway Gen-3 video, unlimited model compare, AI SOP Builder, and priority queue access.",
  },
  {
    q: "Can I cancel my subscription anytime?",
    a: "Absolutely. All plans are cancel-anytime with no lock-in penalties. Monthly billing means you're never committed past a month.",
  },
  {
    q: "How is EchoGPT different from ChatGPT?",
    a: "EchoGPT aggregates multiple AI providers in one interface. You get ChatGPT, Claude, Gemini, Grok, and more — side-by-side — plus dedicated studios for image and video creation.",
  },
  {
    q: "Do you offer an API?",
    a: "Yes, the EchoGPT API Platform is available at platform.echogpt.live. REST-compatible with full model routing support.",
  },
];

// ─────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setOpen(false);
    if (href.startsWith("#")) {
      const el = document.getElementById(href.slice(1));
      el?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 dark:bg-[#0E0C15]/90 backdrop-blur-md border-b border-zinc-200/60 dark:border-zinc-800/60 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <div className="size-8 rounded-xl bg-[#713CF4] flex items-center justify-center shadow-sm">
            <Sparkles className="size-4 text-white" />
          </div>
          <span className="text-base font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
            EchoGPT
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <button
              key={link.label}
              type="button"
              onClick={() => handleNavClick(link.href)}
              className="px-3 py-1.5 text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 rounded-lg transition-colors cursor-pointer"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* CTA buttons */}
        <div className="hidden md:flex items-center gap-2">
          <Link
            href="/chat"
            className="px-3.5 py-1.5 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-colors"
          >
            Sign in
          </Link>
          <Link
            href="/chat"
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-[#713CF4] hover:bg-[#602ee0] active:bg-[#5223c7] text-white text-sm font-medium transition-colors shadow-sm"
          >
            <span>Start free</span>
            <ArrowRight className="size-3.5" />
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden p-2 rounded-lg text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
          aria-label="Toggle navigation"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-zinc-200/60 dark:border-zinc-800/60 bg-white/95 dark:bg-[#0E0C15]/95 backdrop-blur-md">
          <div className="max-w-6xl mx-auto px-4 py-3 space-y-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                type="button"
                onClick={() => handleNavClick(link.href)}
                className="block w-full text-left px-3 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            ))}
            <div className="pt-2 pb-1 flex flex-col gap-2">
              <Link
                href="/chat"
                onClick={() => setOpen(false)}
                className="block text-center px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
              >
                Sign in
              </Link>
              <Link
                href="/chat"
                onClick={() => setOpen(false)}
                className="block text-center px-4 py-2 text-sm font-medium bg-[#713CF4] hover:bg-[#602ee0] text-white rounded-xl transition-colors"
              >
                Start free →
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
      {/* Background gradient blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-[#713CF4]/20 blur-[120px] opacity-60 dark:opacity-40" />
        <div className="absolute top-1/2 -left-32 w-[400px] h-[400px] rounded-full bg-violet-400/15 blur-[80px]" />
        <div className="absolute top-1/3 -right-20 w-[300px] h-[300px] rounded-full bg-pink-400/15 blur-[80px]" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-8">
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#713CF4]/30 bg-[#713CF4]/10 text-sm font-medium text-[#713CF4] dark:text-[#a78bfa]">
          <Sparkles className="size-3.5" />
          <span>11+ frontier AI models in one place</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight leading-[1.1]">
          Your complete{" "}
          <span className="text-[#713CF4] dark:text-[#a78bfa]">AI productivity</span>
          <br />
          ecosystem
        </h1>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto font-normal leading-relaxed">
          Chat with GPT-5, Claude, and Gemini. Generate images and videos.
          Compare models side-by-side. Automate workflows — all in one clean interface.
        </p>

        {/* CTA row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/chat"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-[#713CF4] hover:bg-[#602ee0] active:bg-[#5223c7] text-white font-semibold text-base transition-all shadow-lg shadow-[#713CF4]/30 hover:shadow-[#713CF4]/50 hover:-translate-y-0.5"
          >
            <Sparkles className="size-4" />
            Start for free
          </Link>
          <Link
            href="/subscriptions"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 font-medium text-base hover:border-[#713CF4]/40 hover:text-[#713CF4] dark:hover:text-[#a78bfa] transition-all"
          >
            View pricing
            <ArrowRight className="size-4" />
          </Link>
        </div>

        {/* Trust line */}
        <p className="text-sm text-zinc-400 dark:text-zinc-500">
          No credit card required · Cancel anytime · Free tier always available
        </p>
      </div>

      {/* App preview mockup */}
      <div className="relative mt-14 max-w-5xl mx-auto px-4 sm:px-6">
        <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-[#111217] shadow-2xl overflow-hidden">
          {/* Fake browser chrome */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-[#0E0C15]">
            <span className="size-3 rounded-full bg-red-400/70" />
            <span className="size-3 rounded-full bg-amber-400/70" />
            <span className="size-3 rounded-full bg-emerald-400/70" />
            <div className="mx-auto flex items-center gap-2 px-3 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 text-xs text-zinc-400">
              <Globe className="size-3" />
              <span>app.echogpt.live</span>
            </div>
          </div>
          {/* Mockup content */}
          <div className="p-6 space-y-4">
            {/* Model selector strip */}
            <div className="flex flex-wrap gap-2">
              {["EchoGPT", "GPT-5", "Claude 4 Sonnet", "Gemini Advanced"].map((m, i) => (
                <span
                  key={m}
                  className={`px-3 py-1 rounded-lg text-xs font-medium border ${
                    i === 0
                      ? "bg-[#713CF4] text-white border-transparent"
                      : "border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-900"
                  }`}
                >
                  {m}
                </span>
              ))}
              <span className="px-2 py-1 rounded-lg text-xs font-medium border border-dashed border-zinc-200 dark:border-zinc-700 text-zinc-400">
                +7 more
              </span>
            </div>

            {/* Simulated chat bubbles */}
            <div className="space-y-3 py-2">
              <div className="flex justify-end">
                <div className="max-w-xs sm:max-w-sm px-4 py-2.5 rounded-2xl rounded-tr-sm bg-[#713CF4] text-white text-sm">
                  Explain the trade-offs between transformer and state-space models for long-context tasks.
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="size-7 rounded-lg bg-[#713CF4]/10 border border-[#713CF4]/20 flex items-center justify-center shrink-0">
                  <Sparkles className="size-3.5 text-[#713CF4]" />
                </div>
                <div className="max-w-xs sm:max-w-md px-4 py-2.5 rounded-2xl rounded-tl-sm bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-sm leading-relaxed">
                  Transformers use full-quadratic attention — powerful but O(n²) in memory. State-space models like Mamba use selective recurrence — linear scaling, near-perfect recall at 100K+ tokens…
                </div>
              </div>
            </div>

            {/* Input bar */}
            <div className="flex items-center gap-2 p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900">
              <span className="flex-1 text-sm text-zinc-400">Ask anything…</span>
              <div className="size-7 rounded-lg bg-[#713CF4] flex items-center justify-center">
                <ArrowRight className="size-3.5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  return (
    <section className="py-14 border-y border-zinc-100 dark:border-zinc-800/60">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <dl className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          {STATS.map(({ icon: Icon, value, label }) => (
            <div key={label} className="text-center space-y-1">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Icon className="size-4 text-[#713CF4]" />
              </div>
              <dt className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-50 tabular-nums">
                {value}
              </dt>
              <dd className="text-sm text-zinc-500 dark:text-zinc-400">{label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section id="features" className="py-20 sm:py-28 scroll-mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-14">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#713CF4] dark:text-[#a78bfa]">
            Everything in one place
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
            One platform, every creative superpower
          </h2>
          <p className="text-base text-zinc-500 dark:text-zinc-400 font-normal leading-relaxed">
            Stop juggling five different AI tools. EchoGPT brings every capability — chat,
            image, video, research, automation — into a single, elegant workspace.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <Link
                key={feature.title}
                href={feature.href}
                className="group relative flex flex-col gap-4 p-6 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-[#111217] hover:border-[#713CF4]/40 hover:shadow-lg hover:shadow-[#713CF4]/5 hover:-translate-y-0.5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#713CF4]"
              >
                <div
                  className={`size-11 rounded-xl ${feature.bg} border border-current/10 flex items-center justify-center ${feature.color} group-hover:scale-105 transition-transform duration-200`}
                >
                  <Icon className="size-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-normal">
                    {feature.desc}
                  </p>
                </div>
                <span className={`flex items-center gap-1 text-xs font-medium ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity`}>
                  Open workspace <ArrowRight className="size-3" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ModelsSection() {
  return (
    <section
      id="models"
      className="py-20 sm:py-28 scroll-mt-16 bg-zinc-50/60 dark:bg-[#090A0F]/60"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-14">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#713CF4] dark:text-[#a78bfa]">
            The full model roster
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
            Every frontier model, unified
          </h2>
          <p className="text-base text-zinc-500 dark:text-zinc-400 font-normal leading-relaxed">
            EchoGPT aggregates the world{"'"}s best language, image, and video models. One
            subscription unlocks them all — no separate accounts, no API keys.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {MODELS.map((model) => (
            <div
              key={model.name}
              className="flex items-center gap-3 p-4 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-[#111217] hover:border-[#713CF4]/30 hover:shadow-sm transition-all"
            >
              <div className="size-9 rounded-xl bg-[#713CF4]/10 border border-[#713CF4]/15 flex items-center justify-center shrink-0">
                <Bot className="size-4 text-[#713CF4]" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                  {model.name}
                </p>
                <p className="text-[11px] text-zinc-400 dark:text-zinc-500 truncate">
                  {model.provider}
                </p>
              </div>
              <span
                className={`ml-auto shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full ${model.tagColor}`}
              >
                {model.tag}
              </span>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/chat"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:border-[#713CF4]/40 hover:text-[#713CF4] dark:hover:text-[#a78bfa] transition-colors"
          >
            Explore all models in the app
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function WhySection() {
  const PILLARS = [
    {
      icon: Zap,
      title: "One subscription, everything unlocked",
      desc: "No juggling 5 separate AI subscriptions. Pro gives you every model, every studio, every tool.",
    },
    {
      icon: Shield,
      title: "No prompt data training",
      desc: "Your conversations and creations are yours. We never use your content to train AI models.",
    },
    {
      icon: Columns2,
      title: "Model comparison built-in",
      desc: "Run the same prompt across GPT-5, Claude, and Gemini simultaneously. Pick the best answer.",
    },
    {
      icon: Clock,
      title: "Always up-to-date",
      desc: "As new frontier models release, EchoGPT integrates them — your subscription stays current.",
    },
  ];

  return (
    <section className="py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-14">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#713CF4] dark:text-[#a78bfa]">
            Why EchoGPT
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
            Built for serious AI users
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {PILLARS.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="flex items-start gap-4 p-6 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-[#111217]"
              >
                <div className="size-10 rounded-xl bg-[#713CF4]/10 border border-[#713CF4]/15 flex items-center justify-center shrink-0">
                  <Icon className="size-4.5 text-[#713CF4]" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
                    {p.title}
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-normal">
                    {p.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="py-20 sm:py-28 bg-zinc-50/60 dark:bg-[#090A0F]/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        <div className="text-center space-y-3 max-w-xl mx-auto">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#713CF4] dark:text-[#a78bfa]">
            Loved by creators
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
            What our users say
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="flex flex-col gap-4 p-6 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-[#111217] shadow-sm"
            >
              <div className="flex gap-0.5">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <Star key={i} className="size-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                <div
                  className={`size-8 rounded-full ${t.avatarBg} flex items-center justify-center text-white text-xs font-bold shrink-0`}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                    {t.name}
                  </p>
                  <p className="text-[11px] text-zinc-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  return (
    <section id="pricing" className="py-20 sm:py-28 scroll-mt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-12">
        <div className="text-center space-y-3 max-w-xl mx-auto">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#713CF4] dark:text-[#a78bfa]">
            Simple pricing
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
            Start free, upgrade when ready
          </h2>
          <p className="text-base text-zinc-500 dark:text-zinc-400 font-normal">
            No hidden fees. No lock-in. Cancel anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-stretch">
          {PRICING_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`relative flex flex-col gap-6 p-7 rounded-2xl border transition-all ${
                plan.highlight
                  ? "border-[#713CF4] bg-white dark:bg-[#111217] shadow-lg shadow-[#713CF4]/10 ring-1 ring-[#713CF4]/20"
                  : "border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-[#111217]"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-3 py-1 rounded-full bg-[#713CF4] text-white text-[11px] font-bold shadow-sm">
                    {plan.badge}
                  </span>
                </div>
              )}

              <div>
                <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
                  {plan.name}
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 font-normal">
                  {plan.desc}
                </p>
              </div>

              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-zinc-900 dark:text-zinc-50">
                  {plan.price}
                </span>
                {plan.period && (
                  <span className="text-sm text-zinc-400">{plan.period}</span>
                )}
              </div>

              <ul className="space-y-2.5 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-zinc-600 dark:text-zinc-300">
                    <Check className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="font-normal leading-snug">{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={plan.ctaHref}
                className={`block text-center py-3 rounded-xl text-sm font-semibold transition-all ${
                  plan.highlight
                    ? "bg-[#713CF4] hover:bg-[#602ee0] text-white shadow-sm hover:shadow-[#713CF4]/30"
                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-zinc-400 dark:text-zinc-500">
          Annual billing available at{" "}
          <Link href="/subscriptions" className="text-[#713CF4] dark:text-[#a78bfa] hover:underline">
            /subscriptions
          </Link>{" "}
          · Up to 30% off vs monthly
        </p>
      </div>
    </section>
  );
}

function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section
      id="faq"
      className="py-20 sm:py-28 scroll-mt-16 bg-zinc-50/60 dark:bg-[#090A0F]/60"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-10">
        <div className="text-center space-y-3">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#713CF4] dark:text-[#a78bfa]">
            FAQ
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
            Common questions
          </h2>
        </div>

        <div className="space-y-2">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-[#111217] overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#713CF4]"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`size-4 text-zinc-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {/* CSS grid-rows transition — no ref reads during render */}
                <div
                  className="grid transition-all duration-200 ease-in-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-normal">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


function CtaSection() {
  return (
    <section className="py-20 sm:py-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-[#713CF4] px-8 py-16 sm:px-14 sm:py-20 text-center space-y-6">
          {/* Decorative blobs inside the banner */}
          <div className="absolute inset-0 -z-0 overflow-hidden">
            <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
          </div>

          <div className="relative z-10 space-y-6">
            <div className="inline-flex items-center justify-center size-14 rounded-2xl bg-white/10 border border-white/20 mx-auto">
              <Sparkles className="size-7 text-white" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Ready to work smarter with AI?
            </h2>
            <p className="text-base text-violet-200 max-w-lg mx-auto font-normal leading-relaxed">
              Join thousands of professionals using EchoGPT every day. Free to start —
              no credit card, no commitments.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/chat"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-white text-[#713CF4] font-bold text-base hover:bg-violet-50 transition-colors shadow-lg"
              >
                <Sparkles className="size-4" />
                Start for free
              </Link>
              <Link
                href="/subscriptions"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl border border-white/30 text-white font-medium text-base hover:bg-white/10 transition-colors"
              >
                See Pro plans
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-zinc-100 dark:border-zinc-800/60 py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="size-7 rounded-lg bg-[#713CF4] flex items-center justify-center">
              <Sparkles className="size-3.5 text-white" />
            </div>
            <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">EchoGPT</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-xs text-zinc-400 dark:text-zinc-500">
            <Link href="/chat" className="hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors">App</Link>
            <Link href="/subscriptions" className="hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors">Pricing</Link>
            <Link href="/support" className="hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors">Support</Link>
            <Link href="/newsletter" className="hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors">Newsletter</Link>
            <a href="https://www.facebook.com/echogptlive/" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors">Facebook</a>
            <a href="https://www.instagram.com/echogptlive/" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors">Instagram</a>
            <a href="https://www.linkedin.com/company/echogpt/" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors">LinkedIn</a>
          </div>
          <p className="text-xs text-zinc-400 dark:text-zinc-500">
            © {new Date().getFullYear()} EchoGPT
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────
// Main page export
// ─────────────────────────────────────────────

export function LandingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0A090F] text-zinc-900 dark:text-zinc-100 font-lexend">
      <Navbar />
      <main>
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <ModelsSection />
        <WhySection />
        <TestimonialsSection />
        <PricingSection />
        <FaqSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
