"use client";

import React from "react";
import {
  Cpu,
  Sparkles,
  Video,
  ListTodo,
  Columns2,
} from "lucide-react";
import { McpBranchIcon } from "@/components/dashboard/connectors/ConnectorIcons";

const CAPABILITIES = [
  {
    icon: Cpu,
    title: "11+ Frontier Models",
    detail: "OpenAI, Anthropic, Google, xAI & Meta",
  },
  {
    icon: Sparkles,
    title: "Dual Creative Studios",
    detail: "4K FLUX Pro, DALL-E 3 & Midjourney",
  },
  {
    icon: Video,
    title: "AI Video Generation",
    detail: "Sora, Kling & Runway Gen-3 engine",
  },
  {
    icon: ListTodo,
    title: "24+ Curated AI Tasks",
    detail: "Work, Ideas, Fun & Content workflows",
  },
  {
    icon: McpBranchIcon,
    title: "Extensible MCP Connectors",
    detail: "Live tool calling directly inside chat",
  },
  {
    icon: Columns2,
    title: "Side-by-Side Compare",
    detail: "Cross-benchmark multi-model responses",
  },
];

export function LandingCapabilityStrip() {
  return (
    <section className="py-8 sm:py-10 border-y border-zinc-200/80 dark:border-white/8 bg-zinc-50/50 dark:bg-white/[0.02]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8">
          {CAPABILITIES.map((cap) => {
            const Icon = cap.icon;
            return (
              <div
                key={cap.title}
                className="flex flex-col items-center text-center space-y-1.5 group p-2 rounded-xl transition-all duration-200 hover:-translate-y-0.5 motion-reduce:hover:translate-y-0 cursor-default"
              >
                <div className="size-9 rounded-xl bg-[#713CF4]/10 dark:bg-[#713CF4]/15 border border-[#713CF4]/20 flex items-center justify-center text-[#713CF4] dark:text-[#a78bfa] shadow-2xs group-hover:scale-105 group-hover:border-[#713CF4]/40 group-hover:shadow-xs transition-all duration-200 motion-reduce:group-hover:scale-100">
                  <Icon className="size-4" />
                </div>
                <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 leading-tight group-hover:text-[#713CF4] dark:group-hover:text-[#a78bfa] transition-colors">
                  {cap.title}
                </h4>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-normal leading-snug">
                  {cap.detail}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
