"use client";

import React from "react";
import {
  Layers,
  Cpu,
  Sparkles,
  ListTodo,
  ShieldCheck,
} from "lucide-react";
import { McpBranchIcon } from "@/components/dashboard/connectors/ConnectorIcons";

const PILLARS = [
  {
    icon: Layers,
    title: "One Unified Workspace",
    desc: "Keep different AI workflows together instead of jumping across 5 separate accounts, tools, and browser tabs.",
  },
  {
    icon: Cpu,
    title: "Flexible Frontier Models",
    desc: "Choose from multiple frontier models depending on the task — analytical logic, high-throughput chat, or deep STEM reasoning.",
  },
  {
    icon: Sparkles,
    title: "Built for Native Creation",
    desc: "Move effortlessly from text research to 4K image and cinematic video synthesis in one cohesive interface.",
  },
  {
    icon: ListTodo,
    title: "Structured Workflows",
    desc: "Overcome blank-prompt syndrome with 24 purpose-built AI Tasks, ATS resume scoring, and SOP generation engines.",
  },
  {
    icon: McpBranchIcon,
    title: "Connected Tool Ecosystem",
    desc: "Extend conversations with live database queries, GitHub operations, and custom APIs using the open MCP standard.",
  },
  {
    icon: ShieldCheck,
    title: "Privacy by Design",
    desc: "Your conversations, generation prompts, and connected tools are completely sandboxed. We never retrain models on your data.",
  },
];

export function LandingWhySection() {
  return (
    <section className="py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#713CF4] dark:text-[#a78bfa]">
            Why EchoGPT
          </p>
          <h2 className="text-2xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
            Engineered for professionals who do real work
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 font-normal leading-relaxed">
            A single, polished environment designed to eliminate subscription fatigue
            and context switching.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PILLARS.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="p-6 rounded-2xl border border-zinc-200/80 dark:border-white/[0.08] bg-white dark:bg-[#12111A] space-y-3 hover:border-zinc-300 dark:hover:border-white/[0.14] transition-colors cursor-pointer group"
              >
                <div className="size-10 rounded-xl bg-[#713CF4]/10 dark:bg-[#713CF4]/15 border border-[#713CF4]/20 flex items-center justify-center text-[#713CF4] dark:text-[#a78bfa]">
                  <Icon className="size-5" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-primary dark:group-hover:text-primary transition-colors duration-300 ease-in-out">
                  {p.title}
                </h3>
                <p className="text-xs sm:text-[13px] text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
                  {p.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
