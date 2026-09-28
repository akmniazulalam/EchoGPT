"use client";

import React from "react";
import Link from "next/link";
import {
  MessageSquare,
  Cpu,
  Sparkles,
  Video,
  ListTodo,
  Columns2,
  ArrowRight,
  Briefcase,
  FileText,
} from "lucide-react";
import { McpBranchIcon } from "@/components/dashboard/connectors/ConnectorIcons";

const FEATURES = [
  {
    icon: MessageSquare,
    title: "AI Chat & Reasoning",
    subtitle: "Conversational Core",
    desc: "Bring multiple models into one conversation workspace. Switch models mid-chat while keeping full context.",
    href: "/chat",
    tag: "Core",
    badgeColor: "bg-[#713CF4]/10 text-[#713CF4] dark:text-[#a78bfa] border-[#713CF4]/20",
    featured: true,
  },
  {
    icon: Cpu,
    title: "Frontier Model Freedom",
    subtitle: "Model Agility",
    desc: "Switch between models based on the task — OpenAI GPT-5, Anthropic Claude 3.7, Google Gemini 2.5, xAI Grok 3, and DeepSeek R1.",
    href: "/chat",
    tag: "11+ Models",
    badgeColor: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    featured: false,
  },
  {
    icon: Sparkles,
    title: "Image Studio",
    subtitle: "Visual Generation",
    desc: "Turn ideas into visuals with dedicated creative workflows. FLUX Pro 4K detail, DALL-E 3 scene accuracy, and SDXL Turbo drafts.",
    href: "/image-studio",
    tag: "Studio",
    badgeColor: "bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20",
    featured: false,
  },
  {
    icon: Video,
    title: "Video Studio",
    subtitle: "Motion Synthesis",
    desc: "Create short-form AI video with purpose-built controls — duration, aspect ratio, coherent physics, and temporal consistency.",
    href: "/video-studio",
    tag: "Cinematic",
    badgeColor: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20",
    featured: false,
  },
  {
    icon: ListTodo,
    title: "AI Tasks & Blueprints",
    subtitle: "Guided Productivity",
    desc: "Start from focused workflows for work, ideas, content, and productivity. Overcome the blank prompt with structured form blueprints.",
    href: "/tasks",
    tag: "24 Workflows",
    badgeColor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    featured: true,
  },
  {
    icon: Columns2,
    title: "Model Compare",
    subtitle: "Benchmark Analysis",
    desc: "Explore multiple model responses in one workflow. Send a single prompt simultaneously to compare logic, depth, and coding style.",
    href: "/compare",
    tag: "Side-by-Side",
    badgeColor: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    featured: false,
  },
  {
    icon: McpBranchIcon,
    title: "Live MCP Connectors",
    subtitle: "Extensible Tools",
    desc: "Connect local and remote MCP servers so GitHub, databases, and custom tools are callable straight from the conversation.",
    href: "/connectors",
    tag: "MCP Standard",
    badgeColor: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20",
    featured: false,
  },
  {
    icon: Briefcase,
    title: "AI Job & Resume Studio",
    subtitle: "Career Acceleration",
    desc: "Analyze job postings against your experience. Extract ATS keywords, skill gaps, and custom interview scenarios in seconds.",
    href: "/resume",
    tag: "Career",
    badgeColor: "bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20",
    featured: false,
  },
  {
    icon: FileText,
    title: "AI SOP Builder",
    subtitle: "Operational Process",
    desc: "Transform rough notes into standardized, audit-ready Standard Operating Procedures with role matrices and quality checklists.",
    href: "/sop",
    tag: "Operations",
    badgeColor: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
    featured: false,
  },
];

export function LandingCoreFeatures() {
  return (
    <section id="features" className="py-20 sm:py-28 scroll-mt-16 bg-zinc-50/50 dark:bg-white/[0.015]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#713CF4] dark:text-[#a78bfa]">
            Core Capabilities
          </p>
          <h2 className="text-2xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
            Designed for genuine productivity, not gimmicks
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 font-normal leading-relaxed">
            Every feature connects to solve real problems: research, writing, media
            generation, code architecture, and automated execution.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((feat) => {
            const Icon = feat.icon;
            return (
              <Link
                key={feat.title}
                href={feat.href}
                className="group relative flex flex-col justify-between p-6 rounded-2xl border border-zinc-200/80 dark:border-white/[0.08] bg-white dark:bg-[#12111A] hover:border-[#713CF4]/40 hover:shadow-lg hover:shadow-[#713CF4]/5 hover:-translate-y-0.5 motion-reduce:hover:translate-y-0 transition-all duration-200"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <div className="size-10 rounded-xl bg-[#713CF4]/10 dark:bg-[#713CF4]/15 border border-[#713CF4]/20 flex items-center justify-center text-[#713CF4] dark:text-[#a78bfa] group-hover:scale-105 group-hover:border-[#713CF4]/40 transition-all duration-200 motion-reduce:group-hover:scale-100">
                      <Icon className="size-5" />
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${feat.badgeColor}`}
                    >
                      {feat.tag}
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider block mb-0.5">
                      {feat.subtitle}
                    </span>
                    <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-[#713CF4] dark:group-hover:text-[#a78bfa] transition-colors">
                      {feat.title}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal mt-1.5">
                      {feat.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-zinc-100 dark:border-white/[0.06] flex items-center justify-between text-xs font-semibold text-[#713CF4] dark:text-[#a78bfa]">
                  <span>Explore workspace</span>
                  <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform motion-reduce:group-hover:translate-x-0" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
